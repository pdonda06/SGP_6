const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/user.controller');

// Protect all routes after this middleware
router.use(protect);

// Routes for currently logged in user
router.get('/me', getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// Routes restricted to admin only
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router; 