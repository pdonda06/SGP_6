const mongoose = require('mongoose');

const healthSchemeSchema = new mongoose.Schema({
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
  description: String,
  type: {
    type: String,
    enum: ['national', 'state', 'district', 'local'],
    required: true
  },
  category: {
    type: String,
    enum: ['maternal', 'child', 'family_welfare', 'disease_control', 'general_health', 'other'],
    required: true
  },
  targetPopulation: {
    type: String,
    required: true
  },
  objectives: [String],
  implementationGuidelines: String,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed', 'suspended'],
    default: 'active'
  },
  funding: {
    source: String,
    allocated: Number,
    utilized: Number
  },
  performanceIndicators: [{
    name: String,
    target: Number,
    achieved: Number,
    unit: String
  }],
  beneficiaries: {
    total: Number,
    male: Number,
    female: Number,
    children: Number
  },
  reportingRequirements: [{
    type: String,
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annually']
    }
  }],
  documents: [{
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
healthSchemeSchema.index({ name: 1 });
healthSchemeSchema.index({ code: 1 });
healthSchemeSchema.index({ type: 1, category: 1 });
healthSchemeSchema.index({ status: 1 });

const HealthScheme = mongoose.model('HealthScheme', healthSchemeSchema);

module.exports = HealthScheme; 