const express = require('express');
const { createInstallation, getInstallations } = require('../../controllers/installationController');
const authenticateToken = require('../../middleware/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, createInstallation);

router.get('/', authenticateToken, getInstallations);

module.exports = router;