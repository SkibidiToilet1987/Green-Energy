const express = require('express');
const { createConsultation, getConsultations } = require('../../controllers/consultationController');
const authenticateToken = require('../../middleware/authenticateToken');

const router = express.Router();

// Route to create a new consultation (requires authentication)
router.post('/', authenticateToken, createConsultation);

// Route to get all consultations (requires authentication)
router.get('/', authenticateToken, getConsultations);

module.exports = router;