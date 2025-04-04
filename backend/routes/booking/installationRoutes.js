const express = require('express');
const {
  createInstallation,
  getInstallations,
  getInstallationById,
  updateInstallation,
  updateInstallationDate,
  deleteInstallation,
} = require('../../controllers/installationController');
const authenticateToken = require('../../middleware/authenticateToken');

const router = express.Router();

// POST route to create a new installation request (protected route)
router.post('/', authenticateToken, createInstallation);

// GET route to retrieve all installation requests (protected route)
router.get('/', authenticateToken, getInstallations);

// GET route to retrieve a single installation request by ID (protected route)
router.get('/:id', authenticateToken, getInstallationById);

// PUT route to update an installation request by ID (protected route)
router.put('/:id', authenticateToken, updateInstallation);

// PUT route to update the installation date (protected route)
router.put('/:id/date', authenticateToken, updateInstallationDate);

// DELETE route to delete an installation request by ID (protected route)
router.delete('/:id', authenticateToken, deleteInstallation);

module.exports = router;