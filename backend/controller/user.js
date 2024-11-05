const express = require('express');
const path = require("path");
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const router = express.Router();
const User = require("../model/user")



router.post("/create-user",upload.single("file"),async (req,res,next) =>{
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email});

    if(userEmail){
        return next(new ErrorHandler("User already exits",400))
    }

    const filename = req.file.filename;
    const fileUrl =path.join(filename);
    const user = {
        name:name,
        email:email,
        password:password,
        avater:fileUrl,
    };
    console.log(user);
    
})

module.exports = router;