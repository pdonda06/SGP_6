const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['performance', 'health_scheme', 'inventory', 'staff', 'financial', 'other'],
    required: true
  },
  period: {
    startDate: Date,
    endDate: Date,
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annually', 'custom']
    }
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scope: {
    level: {
      type: String,
      enum: ['facility', 'sub_district', 'district', 'state', 'national'],
      required: true
    },
    region: {
      state: String,
      district: String,
      subDistrict: String,
      hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
      }
    }
  },
  data: {
    metrics: [{
      name: String,
      value: Number,
      unit: String,
      target: Number,
      previousValue: Number
    }],
    charts: [{
      type: String,
      data: Object
    }],
    tables: [{
      title: String,
      data: Object
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    timestamp: Date
  }],
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadDate: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reportSchema.index({ title: 1 });
reportSchema.index({ type: 1 });
reportSchema.index({ 'period.startDate': 1, 'period.endDate': 1 });
reportSchema.index({ 'scope.level': 1 });
reportSchema.index({ status: 1 });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report; 