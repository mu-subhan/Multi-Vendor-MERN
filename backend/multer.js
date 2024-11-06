const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, '..', 'uploads'); // Moves up to the root directory

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.split(".")[0];  // Extract original file name
    const extname = path.extname(file.originalname); // Get the file's extension

    // Ensure we keep the original file extension
    cb(null, originalName + '-' + uniqueSuffix + extname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
