const express = require('express');
const path = require("path");
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const router = express.Router();
const User = require("../model/user");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists by email
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            // If user already exists, delete the uploaded file and respond with an error
            const filename = req.file.filename;
            const filePath = path.join(__dirname, '../uploads', filename); // Ensure correct path

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return res.status(500).json({ message: "Error deleting file" });
                } else {
                    return res.status(400).json({ message: "User already exists, file deleted" });
                }
            });

            return; // Stop further execution if the user already exists
        }

        // Construct URL for locally stored image
        const filename = req.file.filename;
        const fileUrl = path.join('uploads', filename); // Assuming the file is stored in the 'uploads' folder

        // Create a new user object
        const user = {
            name,
            email,
            password,
            avatar: `http://localhost:8000/uploads/${filename}`, // URL of the uploaded file
        };

        // Save the user to the database
        const newUser = await User.create(user);

        // Create activation token
        const activationToken = createActivationToken(newUser);

        // Construct the activation URL
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;

        // Send activation email
        try {
            await sendMail({
                email: newUser.email,
                subject: "Activate your account",
                message: `Hello ${newUser.name}, Please click on the link to activate your account: ${activationUrl}`,
            });

            // Respond to the client with success
            res.status(201).json({
                success: true,
                message: 'User created successfully. Please check your email to activate your account.',
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

    } catch (error) {
        console.error("Error creating user:", error);
        return next(new ErrorHandler(error.message, 400));
    }
});

// Create activation token
const createActivationToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m", // The token expires in 5 minutes
    });
};

module.exports = router;
