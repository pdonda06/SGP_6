const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/', getDashboardData);

module.exports = router; 