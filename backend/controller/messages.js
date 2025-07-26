const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const { upload } = require("../multer");
const Messages = require("../model/messages");
const router = express.Router();

// Create new message route
router.post("/create-new-message", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const { conversationId, sender, text } = req.body;

        // Validate required fields
        if (!conversationId || !sender || !text) {
            return next(new ErrorHandler('Missing required fields: conversationId, sender, or text', 400));
        }

        const messageData = {
            conversationId,
            sender,
            text,
            images: []
        };

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `${file.fileName}`);
            messageData.images = imageUrls;
        }

        // Create message
        const message = new Messages({
            conversationId: messageData.conversationId,
            sender: messageData.sender,
            text: messageData.text,
            images: messageData.images.length > 0 ? messageData.images : null,
        });

        await message.save();

        res.status(201).json({
            success: true,
            message,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// Get all messages with conversation id
router.get("/get-all-messages/:id", catchAsyncError(async (req, res, next) => {
    try {
        const messages = await Messages.find({
            conversationId: req.params.id,
        });

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router;
