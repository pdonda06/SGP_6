const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Get total counts
  const totalHospitals = await Hospital.countDocuments();
  const totalUsers = await User.countDocuments();
  
  // Get hospitals by state
  const hospitalsByState = await Hospital.aggregate([
    {
      $group: {
        _id: '$address.state',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  // Get hospitals with emergency services
  const emergencyHospitals = await Hospital.countDocuments({ emergencyServices: true });

  // Get average hospital rating
  const avgRating = await Hospital.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        totalHospitals,
        totalUsers,
        emergencyHospitals,
        averageRating: avgRating[0]?.averageRating || 0
      },
      hospitalsByState
    }
  });
});

exports.getHospitalStats = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(new AppError('No hospital found with that ID', 404));
  }

  // Get hospital-specific statistics
  const stats = {
    name: hospital.name,
    specialties: hospital.specialties.length,
    facilities: hospital.facilities.length,
    hasEmergencyServices: hospital.emergencyServices,
    rating: hospital.rating,
    operatingHours: hospital.operatingHours
  };

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
}); 