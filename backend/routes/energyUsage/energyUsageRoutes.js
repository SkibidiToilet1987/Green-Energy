const express = require('express');
const router = express.Router();
const { saveEnergyUsage } = require('../../controllers/energyUsageController');

// POST /energy-usage - Save energy usage data
router.post('/', saveEnergyUsage);

module.exports = router;