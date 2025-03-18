const express = require('express');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const {
  getAllHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospital.controller');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/')
  .get(getAllHospitals)
  .post(restrictTo('admin'), createHospital);

router
  .route('/:id')
  .get(getHospital)
  .patch(restrictTo('admin'), updateHospital)
  .delete(restrictTo('admin'), deleteHospital);

module.exports = router; 