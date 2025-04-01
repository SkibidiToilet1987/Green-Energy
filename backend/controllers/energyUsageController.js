const EnergyUsage = require('../models/energyUsageModel');

// Save energy usage data
const saveEnergyUsage = async (req, res) => {
  try {
    console.log('Request body received:', req.body); // Debugging log

    // Destructure the request body
    const {
      userId,
      email,
      wattsPerDay,
      hoursPerDay,
      daysPerMonth,
      costPerKWh,
      energyUsage,
      cost,
      createdAt,
    } = req.body;

    // Validate required fields
    if (!userId || !email || !wattsPerDay || !hoursPerDay || !daysPerMonth || !costPerKWh || !energyUsage || !cost) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields in the request body' });
    }

    // Create a new energy usage document
    const newEnergyUsage = new EnergyUsage({
      userId,
      email,
      wattsPerDay,
      hoursPerDay,
      daysPerMonth,
      costPerKWh,
      energyUsage,
      cost,
      createdAt: createdAt || new Date(), // Use provided createdAt or default to now
    });

    // Save the document to the database
    await newEnergyUsage.save();
    console.log('Energy usage data saved successfully');
    res.status(201).json({ message: 'Energy usage data saved successfully.' });
  } catch (error) {
    console.error('Error saving energy usage data:', error.message);
    res.status(500).json({ error: 'Failed to save energy usage data.' });
  }
};

module.exports = {
  saveEnergyUsage,
};