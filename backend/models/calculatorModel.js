const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  transportation: {
    carMiles: { type: Number, required: true },
    flightHours: { type: Number, required: true },
  },
  home: {
    electricityKwh: { type: Number, required: true },
    gasTherm: { type: Number, required: true },
  },
  transportationEmissions: { type: Number, required: true },
  homeEmissions: { type: Number, required: true },
  totalEmissions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}, { collection: 'carbonCalculator' }); // Explicitly set the collection name

module.exports = mongoose.model('CarbonCalculator', calculatorSchema);