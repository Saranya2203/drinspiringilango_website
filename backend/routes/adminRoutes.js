const express = require('express');
const router = express.Router();
const { getUsers, getBookings, getInquiries } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protect all routes below

router.get('/users', getUsers);
router.get('/bookings', getBookings);
router.get('/inquiries', getInquiries);

module.exports = router;
