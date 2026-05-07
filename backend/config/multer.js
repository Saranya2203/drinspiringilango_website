const multer = require("multer");

const storage = multer.memoryStorage(); // we upload buffer to Cloudinary

module.exports = multer({ storage });
