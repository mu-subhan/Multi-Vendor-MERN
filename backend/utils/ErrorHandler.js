class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.message = message || "Internal Server Error";
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ErrorHandler;
  