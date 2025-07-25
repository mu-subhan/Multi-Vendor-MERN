const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const fs = require("fs");
const Shop = require("../model/shop");
const {  isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require('../multer');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendShopToken = require("../utils/ShopToken");
const Order = require("../model/order");


// Create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "7d",
    })
};

// create shop
router.post("/create-shop", upload.single("avatar"), async (req, res, next) => {
    try {
        const { email } = req.body;
        // console.log("Request body:", req);
        if (!req.file) {
            return next(new ErrorHandler("Please upload an avatar image", 400));
        }

        const sellerEmail = await Shop.findOne({ email });
        if (sellerEmail) {
            // Delete uploaded file if user already exists
            if (req.file) {
                const filePath = `uploads/${req.file.filename}`;
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            }
            return next(new ErrorHandler("User already exists", 400));
        }

        const fileUrl = path.join(req.file.filename);

        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: fileUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
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
        return next(new ErrorHandler(error.message, 400))
    }




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

            const { name, email, password, avatar, address, phoneNumber, zipCode } = newSeller;

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
                avatar: {
                    public_id: "temp_id",
                    url: avatar
                },
                address,
                phoneNumber,
                zipCode,
            });

            // Send a token for the new user and respond with status 201
            sendShopToken(seller, 201, res);

        } catch (error) {
            // Catch any other errors and respond with a 500 status
            return next(new ErrorHandler(error.message, 500));
        }
    }));
}
)

// login shop
router.post("/login-shop", catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please provide both email and password", 400));
        }

        // Log the attempt
        console.log(`Login attempt for shop with email: ${email}`);

        // Find shop with email and include password in the result
        const shop = await Shop.findOne({ email }).select("+password");
        
        if (!shop) {
            console.log(`No shop found with email: ${email}`);
            return next(new ErrorHandler("Shop not found with this email", 401));
        }

        console.log(`Shop found, verifying password for: ${email}`);
        
        // Verify password
        let isPasswordValid;
        try {
            isPasswordValid = await shop.comparePassword(password);
        } catch (error) {
            console.error(`Password comparison error for shop ${email}:`, error);
            return next(new ErrorHandler("Error verifying password", 500));
        }

        if (!isPasswordValid) {
            console.log(`Invalid password for shop: ${email}`);
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        console.log(`Login successful for shop: ${email}`);
        
        // Send token
        try {
            await sendShopToken(shop, 200, res);
        } catch (error) {
            console.error(`Token generation error for shop ${email}:`, error);
            return next(new ErrorHandler("Error generating authentication token", 500));
        }

    } catch (error) {
        console.error("Shop login error:", error);
        return next(new ErrorHandler(error.message || "Internal server error during login", 500));
    }
}));


// load shop

router.get("/getSeller", isSeller, catchAsyncError(async (req, res, next) => {
    try {
        // console.log("seller info ",req.seller)
        const seller = await Shop.findById(req.seller._id);
        // console.log("seller info0", req.seller)

        if (!seller) {
            return next(new ErrorHandler("seller doen't exists", 400));
        }
        res.status(200).json({
            success: true,
            seller,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// log out from  shop 
router.get("/logout",catchAsyncError(async(req,res,next) =>{
    try{
        res.cookie("seller_token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        }); 
        res.status(201).json({
            success:true,
            message:"Logout successfull"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500))        
       }
}))

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      if (!req.file) {
        return next(new ErrorHandler("Please upload an image", 400));
      }

      const existsSeller = await Shop.findById(req.seller._id);
      
      if (!existsSeller) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      // Delete old avatar if exists
      if (existsSeller.avatar && existsSeller.avatar.url) {
        const oldFilename = existsSeller.avatar.url.split("/").pop();
        const existAvatarPath = path.join(__dirname, "../uploads", oldFilename);
        if (fs.existsSync(existAvatarPath)) {
          fs.unlinkSync(existAvatarPath);
        }
      }
      
      // Save new avatar
      const filename = req.file.filename;
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
      const avatar = {
        public_id: filename,
        url: fileUrl,
      };
      
      existsSeller.avatar = avatar;
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(200).json({
        success: true,
        seller: shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get seller earnings
router.get("/get-seller-earnings", isSeller, catchAsyncError(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    // Get all orders for this seller that are delivered
    const orders = await Order.find({
      "cart.shopId": seller._id,
      status: "Delivered"
    });

    // Calculate total earnings
    let totalEarnings = 0;
    orders.forEach((order) => {
      const serviceCharge = order.totalPrice * 0.10;
      totalEarnings += (order.totalPrice - serviceCharge);
    });

    // Get recent transactions
    const recentTransactions = seller.transactions ? 
      seller.transactions.sort((a, b) => b.createdAt - a.createdAt).slice(0, 10) 
      : [];

    res.status(200).json({
      success: true,
      availableBalance: seller.availableBalance || 0,
      totalEarnings,
      recentTransactions
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router