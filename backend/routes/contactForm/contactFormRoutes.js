const express = require('express');
const { saveContactForm } = require('../../controllers/contactFormController'); // Controller for handling contact form logic
const { authenticateToken } = require('../../middleware/authenticateToken'); // Your existing authentication middleware

const router = express.Router();

// POST route to save contact form data (protected route)
router.post('/', authenticateToken, saveContactForm);

module.exports = router;