// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const uploadDir = path.join(__dirname, '..', '/uploads'); // Moves up to the root directory
// console.log('Resolved upload directory:', uploadDir);

// // Ensure the 'uploads' directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const originalName = file.originalname.split(".")[0];  // Extract original file name
//     const extname = path.extname(file.originalname); // Get the file's extension

//     // Ensure we keep the original file extension
//     cb(null, originalName + '-' + uniqueSuffix + extname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = { upload };




const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    const extname = path.extname(file.originalname);
    cb(null, filename + "-" + uniqueSuffix + extname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});