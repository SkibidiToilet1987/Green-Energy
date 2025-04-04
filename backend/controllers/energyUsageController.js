const EnergyUsage = require('../models/energyUsageModel');

// Save energy usage data
const saveEnergyUsage = async (req, res) => {
  try {
    console.log('Request body received:', req.body); // Debugging log

    // Destructure the request body
    const { userId, email, wattsPerDay, hoursPerDay, daysPerMonth, costPerKWh } = req.body;

    // Validate required fields
    if (!userId || !email || !wattsPerDay || !hoursPerDay || !daysPerMonth || !costPerKWh) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields in the request body' });
    }

    // Calculate energy usage and costs
    const energyUsagePerDay = (wattsPerDay * hoursPerDay) / 1000; // Convert watts to kWh
    const energyUsagePerMonth = energyUsagePerDay * daysPerMonth;
    const energyUsagePerYear = energyUsagePerMonth * 12;

    const costPerDay = energyUsagePerDay * costPerKWh;
    const costPerMonth = energyUsagePerMonth * costPerKWh;
    const costPerYear = energyUsagePerYear * costPerKWh;

    // Create a new energy usage document
    const newEnergyUsage = new EnergyUsage({
      userId,
      email, // Include email in the document
      wattsPerDay,
      hoursPerDay,
      daysPerMonth,
      costPerKWh,
      energyUsage: {
        perDay: energyUsagePerDay,
        perMonth: energyUsagePerMonth,
        perYear: energyUsagePerYear,
      },
      cost: {
        perDay: costPerDay,
        perMonth: costPerMonth,
        perYear: costPerYear,
      },
    });

    // Save the document to the database
    await newEnergyUsage.save();
    console.log('Energy usage data saved successfully');
    res.status(201).json({ message: 'Energy usage data saved successfully.', data: newEnergyUsage });
  } catch (error) {
    console.error('Error saving energy usage data:', error.message);
    res.status(500).json({ error: 'Failed to save energy usage data.' });
  }
};

// Get energy usage data for a user
const getEnergyUsage = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      console.error('Validation failed: Missing userId');
      return res.status(400).json({ error: 'Missing userId in the request parameters' });
    }

    // Retrieve energy usage data for the user
    const energyUsageData = await EnergyUsage.find({ userId }).sort({ createdAt: -1 });

    if (!energyUsageData || energyUsageData.length === 0) {
      console.log('No energy usage data found for the user');
      return res.status(404).json({ message: 'No energy usage data found for the user' });
    }

    console.log('Energy usage data retrieved successfully');
    res.status(200).json(energyUsageData);
  } catch (error) {
    console.error('Error retrieving energy usage data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve energy usage data.' });
  }
};

module.exports = {
  saveEnergyUsage,
  getEnergyUsage,
};