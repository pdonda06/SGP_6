const express = require('express');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const {
  getDashboardStats,
  getHospitalStats,
} = require('../controllers/dashboard.controller');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Dashboard statistics routes
router.get('/stats', getDashboardStats);

// Hospital-specific statistics
router.get('/hospital/:id/stats', getHospitalStats);

module.exports = router; 