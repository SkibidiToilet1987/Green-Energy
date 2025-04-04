const express = require('express');
const router = express.Router();
const { saveEnergyUsage, getEnergyUsage } = require('../../controllers/energyUsageController');

// POST /energy-usage - Save energy usage data
// This route is used to save energy usage data for a user
router.post('/', saveEnergyUsage);

// GET /energy-usage/:userId - Get energy usage data for a specific user
// This route retrieves energy usage data for a given userId
router.get('/:userId', getEnergyUsage);

module.exports = router;