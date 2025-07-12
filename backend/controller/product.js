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
        
        if (!shopId) {
            return next(new ErrorHandler("Shop ID is required", 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new ErrorHandler("At least one product image is required", 400));
        }

        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop not found", 404));
        }

        const { name, description, category, originalPrice, discountPrice, stock } = req.body;

        // Validate required fields
        if (!name || !description || !category || !discountPrice || !stock) {
            return next(new ErrorHandler("Please fill all required fields", 400));
        }

        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
            
        const productData = {
            name,
            description,
            category,
            originalPrice,
            discountPrice,
            stock,
            images: imageUrls,
            shop,
            shopId
        };
            
        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product,
        });

    } catch (error) {
        console.error("Product creation error:", error);
        return next(new ErrorHandler(error.message || "Error creating product", 400));
    }
}));

// get all products
router.get("/get-all-products", catchAsyncError(async (req, res, next) => {
    try {
        const products = await Product.find().populate("shop");
        
        // Add full URLs to images
        const productsWithUrls = products.map(product => {
            const productObj = product.toObject();
            productObj.images = productObj.images.map(img => {
                // If the image is already a full URL, return as is
                if (typeof img === 'string' && img.startsWith('http')) {
                    return img;
                }
                // Otherwise, construct the full URL
                return `${process.env.BACKEND_URL || 'http://localhost:8000'}/uploads/${img}`;
            });
            return productObj;
        });
        
        res.status(200).json({
            success: true,
            products: productsWithUrls,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

// get all products of shop
router.get("/get-all-products-shop/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log("Fetching products for shop ID:", req.params.id);
        const products = await Product.find({ shopId: req.params.id });
        
        // Add full URLs to images
        const productsWithUrls = products.map(product => {
            const productObj = product.toObject();
            productObj.images = productObj.images.map(img => ({
                url: img.url || `${process.env.BACKEND_URL}/uploads/${img}`
            }));
            return productObj;
        });
        
        console.log("Found products:", productsWithUrls);
        
        res.status(200).json({
            success: true,
            products: productsWithUrls,
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
            const filename = result.url ? result.url.split('/').pop() : result;
            const filePath = `uploads/${filename}`;
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