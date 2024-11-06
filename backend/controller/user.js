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
            }

            return res.status(400).json({ message: "User already exists, file deleted" });
        });

        return; // End the request since user already exists
    }

    // Construct URL for locally stored image
    const filename = req.file.filename;
    const fileUrl = path.join('uploads', filename); // Assuming the file is stored in the 'uploads' folder

    // Create a new user object
    const user = {
        name,
        email,
        password,
        avatar:fileUrl,
        // avatar: {
        //     url: `http://localhost:8000/${fileUrl}`, // URL of the uploaded file
        //     public_id: filename, // You can use the filename as the public_id
        // },
    };

    // Add logic to save the user to the database
    // try {
    //     const newUser = await User.create(user);
    //     res.status(201).json({
    //         success: true,
    //         newUser,
    //     });
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    
  try{
    await sendMail({
        email:user.email,
        subject:"Activate your account",
        message:`Hello ${user.name}, Please click on the link activate your account: ${activationUrl}`,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  }
});

 catch (error){
    return next(new ErrorHandler(error.message,400))
    
}

// create activation taoken 
const createActivationToken = (user) =>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn:"5m",
    })
}

//  ACTIVATE USER 


module.exports = router;




