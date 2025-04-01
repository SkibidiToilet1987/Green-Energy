const express = require('express');
const { createInstallation, getInstallations } = require('../../controllers/installationController');
const authenticateToken = require('../../middleware/authenticateToken'); // Ensure this middleware exists

const router = express.Router();

// Route to create a new installation (requires authentication)
router.post('/', authenticateToken, createInstallation);

// Route to get all installations (optional, for admin or debugging purposes)
router.get('/', authenticateToken, getInstallations);

module.exports = router;