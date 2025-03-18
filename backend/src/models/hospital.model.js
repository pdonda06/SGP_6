const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hospital must have a name'],
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: [true, 'Hospital must have a street address'],
      },
      city: {
        type: String,
        required: [true, 'Hospital must have a city'],
      },
      state: {
        type: String,
        required: [true, 'Hospital must have a state'],
      },
      zipCode: {
        type: String,
        required: [true, 'Hospital must have a zip code'],
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, 'Hospital must have a phone number'],
      },
      email: {
        type: String,
        required: [true, 'Hospital must have an email'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
    },
    specialties: [{
      type: String,
      trim: true,
    }],
    facilities: [{
      type: String,
      trim: true,
    }],
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    emergencyServices: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      default: 3.0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
hospitalSchema.index({ name: 1 });
hospitalSchema.index({ 'address.city': 1 });
hospitalSchema.index({ 'address.state': 1 });
hospitalSchema.index({ specialties: 1 });

// Virtual populate with doctors
hospitalSchema.virtual('doctors', {
  ref: 'Doctor',
  foreignField: 'hospital',
  localField: '_id',
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital; 