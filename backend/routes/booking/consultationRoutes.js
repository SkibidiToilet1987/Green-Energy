const express = require('express');
const {
  createConsultation,
  getConsultations,
  getConsultationById,
  updateConsultation,
  updateConsultationDate,
  deleteConsultation,
} = require('../../controllers/consultationController'); // Ensure this path is correct
const authenticateToken = require('../../middleware/authenticateToken'); // Middleware for authentication

const router = express.Router();

// POST route to create a new consultation (protected route)
router.post('/', authenticateToken, createConsultation);

// GET route to retrieve all consultations (protected route)
router.get('/', authenticateToken, getConsultations);

// GET route to retrieve a single consultation by ID (protected route)
router.get('/:id', authenticateToken, getConsultationById);

// PUT route to update a consultation by ID (protected route)
router.put('/:id', authenticateToken, updateConsultation);

// PUT route to update the consultation date (protected route)
router.put('/:id/date', authenticateToken, updateConsultationDate);

// DELETE route to delete a consultation by ID (protected route)
router.delete('/:id', authenticateToken, deleteConsultation);

module.exports = router;