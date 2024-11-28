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
const sendToken = require("../utils/jwtToken");
const { isAuthentication } = require('../middleware/auth');



router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;

        // Check if the user already exists by email
        const userEmail = await User.findOne({ email });

        if (userEmail) {
    const filename = req.file.filename;
    // const filePath = path.join(__dirname, '../../uploads',filename)
    const filePath = `uploads/${filename}`;
    
    // filename); // Ensure the correct path
    console.log('Attempting to delete file:', filePath); // Debug log

    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //         console.error("Error deleting file:", err);
    //         return res.status(500).json({ message: "Error deleting file" });
    //      } 
    // });

    return next(new ErrorHandler("User already exists",400)); 
}

        
        const filename = req.file.filename;
        const fileUrl = path.join('uploads', filename); 
        // const fileUrl = path.join(filename)

        // Create a new user object
        const user = {
            name,
            email,
            password,
            avatar:  
              {
               public_id: filename, // or use a unique ID generator if needed
               url: `http://localhost:8000/uploads/${filename}`, // URL of the uploaded file
            }
        }
            

       
    
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
router.post("/activation", catchAsyncError(async (req, res, next) => {
    try {
        const { activation_token } = req.body;

        // Verify the activation token using the secret
        const decodedUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        // If the token is invalid, return an error
        if (!decodedUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const { name, email, password, avatar } = decodedUser;

        // Check if the user already exists in the database
        let user = await User.findOne({ email });

        // If the user already exists, return an error
        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }

        // Create a new user with the provided information
        user = await User.create({
            name,
            email,
            password,
            avatar,
        });

        // Send a token for the new user and respond with status 201
        sendToken(user, 201, res);

    } catch (error) {
        // Catch any other errors and respond with a 500 status
        return next(new ErrorHandler(error.message, 500));
    }
}));


// login user

router.post("/login-user",catchAsyncError(async (req,res,next) =>{
    try {
        const {email,password} = req.body;
        
        if(!email || !password){
            return next(new ErrorHandler("Please provide all fields",400));
        }
        const user = await User.findOne({email}).select("+password");
        console.log(user);
        
        if(!user){
            return next(new ErrorHandler("User doest not exits!",400));
        }
        const isPasswordValid = await user.comparePassword(password);
        
        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide correct information",400));
        }
        sendToken(user,201,res);
    
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
}))

// load user

router.get("/getuser",isAuthentication,catchAsyncError(async(req,res,next) =>{
    try {
        const user = await User.findById(req.user.id);
  
        if(!user){
            return next(new ErrorHandler("User doen't exists",400));
        }
        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
     return next(new ErrorHandler(error.message,500))        
    }
}))

module.exports = router;
