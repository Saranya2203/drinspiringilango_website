const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Simple upload folder
const { uploadContent } = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, upload.single('file'), uploadContent);

module.exports = router;
