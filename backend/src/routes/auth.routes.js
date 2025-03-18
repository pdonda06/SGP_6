const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.middleware'); // ✅ Ensure this is properly imported

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 */
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// 🔥 Make sure protect is properly imported and defined
if (typeof protect !== 'function') {
  console.error("🚨 ERROR: 'protect' middleware is undefined in auth.routes.js!");
}

// Protect all routes after this middleware
router.use(protect); // 🔥 Ensure `protect` is correctly defined

router.patch('/updateMyPassword', updatePassword);

module.exports = router;
