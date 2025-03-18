const Hospital = require('../models/hospital.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllHospitals = catchAsync(async (req, res, next) => {
  const hospitals = await Hospital.find();

  res.status(200).json({
    status: 'success',
    results: hospitals.length,
    data: {
      hospitals,
    },
  });
});

const getHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(new AppError('No hospital found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      hospital,
    },
  });
});

const createHospital = catchAsync(async (req, res, next) => {
  const newHospital = await Hospital.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hospital: newHospital,
    },
  });
});

const updateHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hospital) {
    return next(new AppError('No hospital found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      hospital,
    },
  });
});

const deleteHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);

  if (!hospital) {
    return next(new AppError('No hospital found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}); 

module.exports = {
  getAllHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};