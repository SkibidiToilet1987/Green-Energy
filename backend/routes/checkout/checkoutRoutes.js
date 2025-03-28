const express = require('express');
const router = express.Router();
const Checkout = require('../../models/checkoutModel'); // Import the Checkout model

// POST /checkout - Save checkout form data to MongoDB
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
    } = req.body;

    // Validate required fields
    if (!name || !email || !address || !cardNumber || !accountNumber || !ccv || !phoneNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new checkout entry
    const checkout = new Checkout({
      name,
      email,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
    });

    // Save to database
    await checkout.save();
    res.status(201).json({ message: 'Checkout data saved successfully' });
  } catch (error) {
    console.error('Error saving checkout data:', error.message);
    res.status(500).json({ error: 'Failed to save checkout data' });
  }
});

module.exports = router;