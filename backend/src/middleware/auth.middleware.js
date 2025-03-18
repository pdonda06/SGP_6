const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'hospital_admin']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

const checkRegionAccess = (req, res, next) => {
  const userRegion = req.user.region;
  const requestRegion = req.body.region || req.query.region;

  if (!requestRegion) {
    return next();
  }

  // Super admin has access to all regions
  if (req.user.role === 'super_admin') {
    return next();
  }

  // Check if user has access to the requested region
  if (userRegion.state && requestRegion.state && userRegion.state !== requestRegion.state) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have access to this region.'
    });
  }

  if (userRegion.district && requestRegion.district && userRegion.district !== requestRegion.district) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have access to this district.'
    });
  }

  if (userRegion.subDistrict && requestRegion.subDistrict && userRegion.subDistrict !== requestRegion.subDistrict) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have access to this sub-district.'
    });
  }

  if (userRegion.hospital && requestRegion.hospital && userRegion.hospital.toString() !== requestRegion.hospital.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have access to this hospital.'
    });
  }

  if (userRegion.department && requestRegion.department && userRegion.department.toString() !== requestRegion.department.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have access to this department.'
    });
  }

  next();
};

module.exports = {
  protect,
  restrictTo,
  checkRegionAccess
}; 