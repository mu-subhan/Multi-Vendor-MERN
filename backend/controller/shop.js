const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const fs = require("fs");
const Shop = require("../model/shop");
const { isAuthenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require('../multer');
const catchAsyncError = require('../middleware/catchAsyncError')




router.post("/create-shop",upload.single("file"),async (req,res,next)=>{
    try {
        const {email} = req.body;
        const sellerEmail=await Shop.findOne({email});
        if(sellerEmail){
            const filename =req.file.filename;
            const filePath = `uploads/${filename}`;
            console.log("File path:", filePath);
            
            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message:"Error deleting file"})
                    
                }
            });
            return next(new ErrorHandler("User already exists",400))
        }
                const filename = req.file.filename;
                const fileUrl = path.join('uploads', filename); 
            //    const fileUrl = path.join(filename);

               const seller = {
                name:req.body.name,
                email:email,
                password:req.body.password,
                avatar:fileUrl,
                address:req.body.address,
                phoneNumber:req.body.phoneNumber,
                zipCode:req.body.zipCode, 
               }

        // Create activation token
        const activationToken = createActivationToken(seller);

        // activcation email
        const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;



          try {
            await sendMail({
                email: seller.email,
                subject: "Activate your shop",
                message: `Hello ${seller.name}, Please click on the link to activate your shop: ${activationUrl}`,
            });

            // Respond to the client with success
            res.status(201).json({
                success: true,
                message: `User created successfully. Please check your email ${seller.email} to activate your shop.`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

    
            } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }

    // Create activation token
    const createActivationToken = (seller) => {
            return jwt.sign(seller,process.env.ACTIVATION_SECRET,{
            expiresIn: "10m", 
        })
    };


    // Activate user
    router.post("/activation", catchAsyncError(async (req, res, next) => {
        try {
            const { activation_token } = req.body;
    
            // Verify the activation token using the secret
            const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    
            // If the token is invalid, return an error
            if (!newSeller) {
                return next(new ErrorHandler("Invalid token", 400));
            }
    
            const { name, email, password, avatar,address,phoneNumber,zipCode } = newSeller;
    
            // Check if the user already exists in the database
            let seller = await Shop.findOne({ email });
    
            // If the user already exists, return an error
            if (seller) {
                return next(new ErrorHandler("this seller already exists", 400));
            }
    
            // Create a new user with the provided information
            seller = await Shop.create({
                name,
                email,
                password,
                avatar,
                address,
                phoneNumber,
                zipCode,
            });
    
            // Send a token for the new user and respond with status 201
            sendToken(seller, 201, res);
    
        } catch (error) {
            // Catch any other errors and respond with a 500 status
            return next(new ErrorHandler(error.message, 500));
        }
    }));
}
)
module.exports = router