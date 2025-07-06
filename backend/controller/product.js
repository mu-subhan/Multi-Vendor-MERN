const express = require('express');
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError")
const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler")
const { upload } = require("../multer")
const Product = require("../model/product");
const {isSeller} = require("../middleware/auth")
const fs = require('fs');

// create product
router.post("/create-product", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 400))
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;
            productData.shopId = shopId;
            
            const product = await Product.create(productData)

            res.status(201).json({
                success: true,
                product,
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// get all products of shop
router.get("/get-all-products-shop/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log("Fetching products for shop ID:", req.params.id);
        const products = await Product.find({ shopId: req.params.id });
        console.log("Found products:", products);
        
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        console.error("Error fetching products:", error);
        return next(new ErrorHandler(error, 400))   
    }
}))

// delete product of a shop
router.delete("/delete-shop-product/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product is not found with this id", 404));
        }    

        // Delete product images from storage
        for (let i = 0; i < product.images.length; i++) {
            const result = product.images[i];
            const filePath = `uploads/${result}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        await product.deleteOne();

        res.status(201).json({
            success: true,
            message: "Product Deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

module.exports = router;