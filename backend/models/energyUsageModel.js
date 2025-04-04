const mongoose = require('mongoose');

// Define the schema for energy usage
const energyUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true, // Ensure userId is always provided
    },
    email: {
      type: String,
      required: true, // Ensure email is always provided
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Validate email format
    },
    wattsPerDay: {
      type: Number,
      required: true, // Ensure wattsPerDay is always provided
      min: [0, 'Watts per day must be a positive number'], // Ensure positive values
    },
    hoursPerDay: {
      type: Number,
      required: true, // Ensure hoursPerDay is always provided
      min: [0, 'Hours per day must be a positive number'], // Ensure positive values
      max: [24, 'Hours per day cannot exceed 24'], // Ensure hours do not exceed 24
    },
    daysPerMonth: {
      type: Number,
      required: true, // Ensure daysPerMonth is always provided
      min: [1, 'Days per month must be at least 1'], // Ensure at least 1 day
      max: [31, 'Days per month cannot exceed 31'], // Ensure days do not exceed 31
    },
    costPerKWh: {
      type: Number,
      required: true, // Ensure costPerKWh is always provided
      min: [0, 'Cost per kWh must be a positive number'], // Ensure positive values
    },
    energyUsage: {
      perDay: { type: Number, required: true, min: [0, 'Energy usage per day must be positive'] },
      perMonth: { type: Number, required: true, min: [0, 'Energy usage per month must be positive'] },
      perYear: { type: Number, required: true, min: [0, 'Energy usage per year must be positive'] },
    },
    cost: {
      perDay: { type: Number, required: true, min: [0, 'Cost per day must be positive'] },
      perMonth: { type: Number, required: true, min: [0, 'Cost per month must be positive'] },
      perYear: { type: Number, required: true, min: [0, 'Cost per year must be positive'] },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
    },
  },
  { collection: 'energyUsage' } // Explicitly use the existing collection
);

// Create the model for energy usage
const EnergyUsage = mongoose.model('EnergyUsage', energyUsageSchema);

// Export the model
module.exports = EnergyUsage;