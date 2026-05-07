const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

// GET dashboard
router.get("/", dashboardController.getDashboard);

// PUT update dashboard
router.put("/", dashboardController.updateDashboard);

// Upload file (Cloudinary)
router.post("/upload", dashboardController.uploadToCloudinary);

module.exports = router;
