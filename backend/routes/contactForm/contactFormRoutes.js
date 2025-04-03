// filepath: c:\Users\Mohda\OneDrive\Desktop\Github Projects\Green-Energy\backend\routes\contactForm\contactFormRoutes.js
const express = require('express');
const { saveContactForm } = require('../../controllers/contactFormController');
const authenticateToken = require('../../middleware/authenticateToken'); // Middleware for authentication

const router = express.Router();

// POST route to save contact form data
router.post('/', authenticateToken, saveContactForm);

module.exports = router;