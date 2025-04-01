const express = require('express');
const { createConsultation, getConsultations } = require('../../controllers/consultationController');
const authenticateToken = require('../../middleware/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, createConsultation);

router.get('/', authenticateToken, getConsultations);

module.exports = router;