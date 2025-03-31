const express = require('express');
const router = express.Router();
const Checkout = require('../../models/checkoutModel'); // Adjust the path if necessary

// POST /checkout - Save or update checkout data
router.post('/', async (req, res) => {
  try {
    const { userId, name, email, address, cardNumber, accountNumber, ccv, phoneNumber, cartItems } = req.body;

    // Validate required fields
    if (!userId || !name || !email || !address || !cardNumber || !accountNumber || !ccv || !phoneNumber || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'All fields are required, and cart items cannot be empty.' });
    }

    // Check if a checkout document already exists for the user
    let checkout = await Checkout.findOne({ userId });

    if (checkout) {
      // Update the existing checkout document
      checkout.name = name;
      checkout.email = email;
      checkout.address = address;
      checkout.cardNumber = cardNumber;
      checkout.accountNumber = accountNumber;
      checkout.ccv = ccv;
      checkout.phoneNumber = phoneNumber;
      checkout.cartItems = cartItems;
      await checkout.save();
      return res.status(200).json({ message: 'Checkout updated successfully', checkout });
    }

    // Create a new checkout document if none exists
    checkout = new Checkout({
      userId,
      name,
      email,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
      cartItems,
    });

    await checkout.save();
    res.status(201).json({ message: 'Checkout created successfully', checkout });
  } catch (error) {
    console.error('Error saving checkout data:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to save checkout data' });
  }
});

module.exports = router;