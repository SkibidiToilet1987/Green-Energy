const express = require('express');
const router = express.Router();
const CarbonCalculator = require('../../models/calculatorModel');

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      email,
      transportation,
      home,
      transportationEmissions,
      homeEmissions,
      totalEmissions,
    } = req.body;

    if (!userId || !email || !transportation || !home) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const calculatorEntry = new CarbonCalculator({
      userId,
      email,
      transportation,
      home,
      transportationEmissions,
      homeEmissions,
      totalEmissions,
      createdAt: new Date(),
    });

    await calculatorEntry.save();
    res.status(201).json({ message: 'Calculator data saved successfully', calculatorEntry });
  } catch (error) {
    console.error('Error saving calculator data:', error.message);
    res.status(500).json({ error: 'Failed to save calculator data' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await CarbonCalculator.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving calculator data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve calculator data' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await CarbonCalculator.find({ userId });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No calculator data found for this user' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving calculator data for user:', error.message);
    res.status(500).json({ error: 'Failed to retrieve calculator data for user' });
  }
});

module.exports = router;