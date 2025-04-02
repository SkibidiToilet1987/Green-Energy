const express = require('express');
const { createConsultation, getConsultations } = require('../../controllers/consultationController'); // Ensure this path is correct
const authenticateToken = require('../../middleware/authenticateToken'); // Middleware for authentication

const router = express.Router();

// POST route to create a new consultation (protected route)
router.post('/', authenticateToken, createConsultation);

// GET route to retrieve all consultations (protected route)
router.get('/', authenticateToken, getConsultations);

module.exports = router;