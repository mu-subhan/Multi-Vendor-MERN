const express = require('express');
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer")
const Event = require ("../model/event")
const {isSeller} = require("../middleware/auth")
const fs = require("fs")

// create event
router.post("/create-event", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 400))
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;
            eventData.shopId = shopId;
            
            const event = await Event.create(eventData)

            res.status(201).json({
                success: true,
                event,
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// get all products of shop
router.get("/get-all-events/:id", catchAsyncError(async (req, res, next) => {
    try {
        // console.log("Fetching products for shop ID:", req.params.id);
        const events = await Event.find({ shopId: req.params.id });
        // console.log("Found products:", products);
        
        res.status(200).json({
            success: true,
            events,
        })
    } catch (error) {
        console.error("Error fetching products:", error);
        return next(new ErrorHandler(error, 400))   
    }
}))

// delete product of a shop
router.delete("/delete-shop-event/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found with this id",
            });
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
        console.log("Delete event error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Delete failed",
        });
    }
}));

module.exports = router;
