const express = require('express');
const router = express.Router();
const Checkout = require('../../models/checkoutModel'); // Ensure this path is correct

// POST /checkout - Save checkout information
router.post('/', async (req, res) => {
  try {
    const { name, email, address, cardNumber, accountNumber, ccv, phoneNumber, cartItems } = req.body;

    // Create a new checkout entry
    const checkout = new Checkout({
      name,
      email,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
      cartItems, // Save the cart items
    });

    // Save to database
    await checkout.save();
    res.status(201).json({ message: 'Checkout information saved successfully' });
  } catch (error) {
    console.error('Error saving checkout information:', error);
    res.status(500).json({ error: 'Failed to save checkout information' });
  }
});

module.exports = router;