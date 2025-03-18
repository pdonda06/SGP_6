const Hospital = require('../models/Hospital');
const Department = require('../models/Department');
const HealthScheme = require('../models/HealthScheme');
const Activity = require('../models/Activity');
const catchAsync = require('../utils/catchAsync');

exports.getDashboardData = catchAsync(async (req, res) => {
  const { role, region } = req.query;

  if (role === 'super_admin') {
    // Fetch data for super admin dashboard
    const [
      totalHospitals,
      totalDepartments,
      activeSchemes,
      recentActivities,
      performanceData
    ] = await Promise.all([
      Hospital.countDocuments(),
      Department.countDocuments(),
      HealthScheme.countDocuments({ status: 'active' }),
      Activity.find().sort('-createdAt').limit(5),
      Hospital.aggregate([
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } }
      ])
    ]);

    // Format performance data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedPerformanceData = {
      labels: performanceData.map(item => months[item._id - 1]),
      datasets: [{
        data: performanceData.map(item => item.count)
      }]
    };

    return res.status(200).json({
      status: 'success',
      data: {
        totalHospitals,
        totalDepartments,
        activeSchemes,
        recentActivities: recentActivities.map(activity => ({
          title: activity.title,
          description: activity.description,
          icon: activity.type === 'hospital' ? 'hospital-building' : 
                activity.type === 'department' ? 'doctor' : 'heart-pulse'
        })),
        performanceData: formattedPerformanceData
      }
    });
  } else if (role === 'hospital_admin') {
    // Fetch data for hospital admin dashboard
    const hospital = await Hospital.findOne({ admin: req.user._id });
    
    if (!hospital) {
      return res.status(404).json({
        status: 'error',
        message: 'Hospital not found'
      });
    }

    const [
      totalPatients,
      departments,
      schemes,
      staffCount
    ] = await Promise.all([
      hospital.getPatientCount(),
      Department.find({ hospital: hospital._id }),
      HealthScheme.find({ hospitals: hospital._id, status: 'active' }),
      hospital.getStaffCount()
    ]);

    // Calculate occupancy rate
    const occupancyRate = Math.round((totalPatients / hospital.capacity) * 100);

    // Format department data for the chart
    const departmentData = {
      labels: departments.map(dept => dept.name.substring(0, 3)),
      datasets: [{
        data: await Promise.all(departments.map(dept => dept.getPatientCount()))
      }]
    };

    return res.status(200).json({
      status: 'success',
      data: {
        totalPatients,
        occupancyRate,
        activeStaff: staffCount,
        departmentData,
        activeSchemes: schemes.map(scheme => ({
          name: scheme.name,
          beneficiaries: scheme.beneficiaryCount,
          status: scheme.status
        }))
      }
    });
  }

  return res.status(400).json({
    status: 'error',
    message: 'Invalid role specified'
  });
}); 