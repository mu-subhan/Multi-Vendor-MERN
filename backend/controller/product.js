const express = require('express');
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError")
const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler")
const { upload } = require("../multer")
const Product = require("../model/product")


// create product
router.post("/create-product", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 400))
        } else {
            const files = req.files;
            console.log(files)
            const imageUrls = files.map((file) => `${file.filename}`);
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;
            
            const product = await Product.create(productData)

            res.status(201).json({
                success: true,
                product,
            })
        }

    } catch (error) {
        console.log("here is error",error)
        return next(new ErrorHandler(error, 400))
    }
}))

module.exports = router;