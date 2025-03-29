const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  updateSettings
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Profile and Settings routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/settings', protect, updateSettings);

// Get all users and create user
router
  .route('/')
  .get(
    protect,
    authorize('super-admin', 'state-admin', 'district-admin', 'hospital-admin'),
    getUsers
  )
  .post(
    protect,
    authorize('super-admin', 'state-admin', 'district-admin', 'hospital-admin'),
    createUser
  );

// Get, update and delete user by ID
router
  .route('/:id')
  .get(
    protect,
    authorize('super-admin', 'state-admin', 'district-admin', 'hospital-admin'),
    getUser
  )
  .put(
    protect,
    authorize('super-admin', 'state-admin', 'district-admin', 'hospital-admin'),
    updateUser
  )
  .delete(
    protect,
    authorize('super-admin', 'state-admin', 'district-admin', 'hospital-admin'),
    deleteUser
  );

module.exports = router; 