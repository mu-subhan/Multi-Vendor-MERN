const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your event product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  start_Date:{
 type: Date,
 required:true,
  },
  end_Date:{
  type: Date,
  required:true,
  },
  status:{
    type:String,
    default:"Running",
  },
  images: [
    {
      // public_id: {
      //   type: String,
      //   required: true,
      // },
      // url: {
      //   type: String,
      //   required: true,
      // },
      type: String,
    },
  ],

  // reviews: [
  //   {
  //     user: {
  //       type: Object,
  //     },
  //     rating: {
  //       type: Number,
  //     },
  //     comment: {
  //       type: String,
  //     },
  //     productId: {
  //       type: String,
  //     },
  //     createdAt:{
  //       type: Date,
  //       default: Date.now(),
  //     }
  //   },
  // ],
  // ratings: {
  //   type: Number,
  // },

  shopId: {
    type: String,
    required: true,
  },
  
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);