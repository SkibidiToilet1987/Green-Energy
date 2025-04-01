const mongoose = require('mongoose');

// Define the schema for energy usage
const energyUsageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Ensure userId is always provided
  },
  email: {
    type: String,
    required: true, // Ensure email is always provided
  },
  wattsPerDay: {
    type: Number,
    required: true, // Ensure wattsPerDay is always provided
  },
  hoursPerDay: {
    type: Number,
    required: true, // Ensure hoursPerDay is always provided
  },
  daysPerMonth: {
    type: Number,
    required: true, // Ensure daysPerMonth is always provided
  },
  costPerKWh: {
    type: Number,
    required: true, // Ensure costPerKWh is always provided
  },
  energyUsage: {
    perDay: { type: Number, required: true }, // Ensure perDay is always provided
    perMonth: { type: Number, required: true }, // Ensure perMonth is always provided
    perYear: { type: Number, required: true }, // Ensure perYear is always provided
  },
  cost: {
    perDay: { type: Number, required: true }, // Ensure perDay cost is always provided
    perMonth: { type: Number, required: true }, // Ensure perMonth cost is always provided
    perYear: { type: Number, required: true }, // Ensure perYear cost is always provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
}, { collection: 'energyUsage' }); // Explicitly use the existing collection

// Create the model for energy usage
const EnergyUsage = mongoose.model('EnergyUsage', energyUsageSchema);

// Export the model
module.exports = EnergyUsage;