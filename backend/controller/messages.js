const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const { upload } = require("../multer");
const Messages = require("../model/messages");
const router = express.Router();

// 
router.post("/create-new-message",upload.array("images"),catchAsyncError(async(req,res,next)=>{
    try {
        const messageData = req.body;
        if(req.body){
            const files = req.files;
            const imageUrls = files.map((file) =>`${file.fileName}`);
            messageData.images = imageUrls;
        }
        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;      
        messageData.text = req.body.text;
        


        const message = new Messages({
            conversationId:messageData.conversationId,
            sender:messageData.sender,
            text:messageData.text,
            images:messageData.images ? messageData.images :"undefined",
        })
        await message.save();

        res.status(201).json({
            success:true,
            message,
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.response.message),500)
    }
}))

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

module.exports = router;