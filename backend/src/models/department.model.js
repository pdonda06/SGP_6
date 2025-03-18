const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  type: {
    type: String,
    enum: ['clinical', 'diagnostic', 'support', 'administrative'],
    required: true
  },
  description: String,
  headOfDepartment: {
    name: String,
    designation: String,
    contact: String
  },
  staff: {
    doctors: Number,
    nurses: Number,
    technicians: Number,
    administrative: Number
  },
  facilities: [{
    name: String,
    capacity: Number,
    status: {
      type: String,
      enum: ['operational', 'maintenance', 'non_operational']
    }
  }],
  performance: {
    outpatientVisits: Number,
    inpatientAdmissions: Number,
    procedures: Number,
    surgeries: Number
  },
  healthSchemes: [{
    name: String,
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending']
    },
    implementationDate: Date,
    beneficiaries: Number
  }],
  equipment: [{
    name: String,
    quantity: Number,
    status: {
      type: String,
      enum: ['operational', 'maintenance', 'non_operational']
    },
    lastMaintenance: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
departmentSchema.index({ name: 1 });
departmentSchema.index({ code: 1 });
departmentSchema.index({ hospital: 1 });

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department; 