const express = require('express');
const router = express.Router();
const Checkout = require('../../models/checkoutModel');

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
      cartItems,
      createdAt,
    } = req.body;

    if (
      !userId ||
      !name ||
      !email ||
      !address ||
      !cardNumber ||
      !accountNumber ||
      !ccv ||
      !phoneNumber ||
      !cartItems ||
      cartItems.length === 0
    ) {
      return res.status(400).json({ error: 'All fields are required, and cart items cannot be empty.' });
    }

    let checkout = await Checkout.findOne({ userId });

    if (checkout) {
      checkout.name = name;
      checkout.email = email;
      checkout.address = address;
      checkout.cardNumber = cardNumber;
      checkout.accountNumber = accountNumber;
      checkout.ccv = ccv;
      checkout.phoneNumber = phoneNumber;
      checkout.cartItems = cartItems;
      checkout.createdAt = createdAt || new Date();

      await checkout.save();
      return res.status(200).json({ message: 'Checkout updated successfully', checkout });
    }

    checkout = new Checkout({
      userId,
      email,
      name,
      address,
      cardNumber,
      accountNumber,
      ccv,
      phoneNumber,
      cartItems,
      createdAt: createdAt || new Date(),
    });

    await checkout.save();
    res.status(201).json({ message: 'Checkout created successfully', checkout });
  } catch (error) {
    console.error('Error saving checkout data:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to save checkout data' });
  }
});

module.exports = router;