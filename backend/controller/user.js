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
    // const filePath = path.join(__dirname, '../../uploads', 
    const filePath = `uploads/${filename}`;
    
    // filename); // Ensure the correct path
    console.log('Attempting to delete file:', filePath); // Debug log

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).json({ message: "Error deleting file" });
         } 
    });

    return next(new ErrorHandler("User already exists",400)); 
}

        
        const filename = req.file.filename;
        // const fileUrl = path.join('uploads', filename); 
        const fileUrl = path.join(filename)

        // Create a new user object
        const user = {
            name,
            email,
            password,
            avatar:  fileUrl    
              //{
               // public_id: filename, // or use a unique ID generator if needed
              //  url: `http://localhost:8000/uploads/${filename}`, // URL of the uploaded file
            };
             // URL of the uploaded file
        // };

        // Save the user to the database
        // const newUser = await User.create(user);

        // Create activation token
        const activationToken = createActivationToken(user);

        // Construct the activation URL
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;

        // Send activation email
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, Please click on the link to activate your account: ${activationUrl}`,
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
        return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn: "5m", 
    })
};

// Activate user
router.post("/activation",catchAsyncError(async(req,res,next) =>{
    try {
        const {activation_token} = req.body;

        const newUser = jwt.verify(activation_token,process.env.ACTIVATION_SECRET);

        if(!newUser){
            return next(new ErrorHandler("Invalid token",400));
        }
            
        const {name,email,password,avatar} = newUser;

        let user = await User.findOne({email});

        if(user){
            return next(new ErrorHandler("User already exists",400))
        }
         user = await User.create({
            name,
            email,
            avatar,
            password,
           });

           sendToken(user, 201,res);        
        
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
}))

module.exports = router;
