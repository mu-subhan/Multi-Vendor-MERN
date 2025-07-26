const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthentication = catchAsyncError(async(req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("Please login to continue", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decoded || !decoded.id) {
            return next(new ErrorHandler("Invalid token", 401));
        }

        const user = await User.findById(decoded.id);
        
        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new ErrorHandler("Invalid token", 401));
        }
        if (error.name === "TokenExpiredError") {
            return next(new ErrorHandler("Token expired", 401));
        }
        return next(new ErrorHandler("Authentication error", 401));
    }
});

exports.isSeller = catchAsyncError(async(req,res,next) => {
    const {seller_token} = req.cookies;

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue",401));
    }
    const decoded = jwt.verify(seller_token,process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});