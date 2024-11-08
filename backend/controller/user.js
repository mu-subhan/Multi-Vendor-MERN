const express = require('express');
const path = require("path");
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const router = express.Router();
const User = require("../model/user");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const catchAsyncError = require('../middleware/catchAsyncError')
const sendToken = require("../utils/jwtToken")



router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists by email
        const userEmail = await User.findOne({ email });

        if (userEmail) {
    const filename = req.file.filename;
    const filePath = path.join(__dirname, '../../uploads', filename); // Ensure the correct path
    console.log('Attempting to delete file:', filePath); // Debug log

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
            avatar: {
                public_id: filename, // or use a unique ID generator if needed
                url: `http://localhost:8000/uploads/${filename}`, // URL of the uploaded file
            },
             // URL of the uploaded file
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
                message: `User created successfully. Please check your email ${user.email} to activate your account.`,
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

// Activate user
router.post("/activation",catchAsyncError(async(req,res,next) =>{
    try {
        const {activation_Token} = rwq.body;

        const newUser = jwt.verify(activation_Token,process.env.ACTIVATION_SECRET);

        if(!newUser){
            return next(new ErrorHandler("Invalid token",400));
        }
            
        const {name,email,password,avatar} = newUser;
           User.create({
            name,email,avatar,
            password,
           });

           sendToken(newUser, 201,res);        
        
    } catch (error) {
        
    }
}))

module.exports = router;
