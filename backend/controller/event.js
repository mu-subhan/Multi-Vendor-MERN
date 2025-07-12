const express = require('express');
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer")
const Event = require ("../model/event")
const {isSeller, isAuthenticated} = require("../middleware/auth")
const fs = require("fs")
const router = express.Router();

// create event
router.post("/create-event", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        
        if (!shopId) {
            return next(new ErrorHandler("Shop ID is required", 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new ErrorHandler("At least one event image is required", 400));
        }

        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop not found", 404));
        }

        const { name, description, category, start_Date, end_Date, originalPrice, discountPrice, stock } = req.body;

        // Validate required fields
        if (!name || !description || !category || !start_Date || !end_Date || !discountPrice || !stock) {
            return next(new ErrorHandler("Please fill all required fields", 400));
        }

        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
            
        const eventData = {
            name,
            description,
            category,
            start_Date,
            end_Date,
            originalPrice,
            discountPrice,
            stock,
            images: imageUrls,
            shop,
            shopId
        };
            
        const event = await Event.create(eventData);

        res.status(201).json({
            success: true,
            event,
        });

    } catch (error) {
        console.error("Event creation error:", error);
        return next(new ErrorHandler(error.message || "Error creating event", 400));
    }
}));

// get all events
router.get("/get-all-events", catchAsyncError(async (req, res, next) => {
    try {
        const events = await Event.find().populate("shop");
        res.status(200).json({
            success: true,
            events,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// get all events of a shop
router.get("/get-all-events/:id", catchAsyncError(async (req, res, next) => {
    try {
        const events = await Event.find({ shopId: req.params.id });
        res.status(200).json({
            success: true,
            events,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// delete event of a shop
router.delete("/delete-shop-event/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return next(new ErrorHandler("Event not found with this id", 404));
        }    

        // Delete images
        for (let i = 0; i < event.images.length; i++) {
            const result = event.images[i];
            const filePath = `uploads/${result}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: "Event Deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

module.exports = router;
