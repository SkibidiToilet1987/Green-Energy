const express = require('express');
const router = express.Router();
const ShoppingCart = require('../../models/shoppingCartModel'); // Import the ShoppingCart model

// POST /shoppingcart - Save cart data to MongoDB
router.post('/', async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    // Create a new shopping cart entry
    const shoppingCart = new ShoppingCart({
      cartItems,
    });

    // Save to database
    await shoppingCart.save();
    res.status(201).json({ message: 'Shopping cart data saved successfully' });
  } catch (error) {
    console.error('Error saving shopping cart data:', error.message);
    res.status(500).json({ error: 'Failed to save shopping cart data' });
  }
});

// GET /shoppingcart - Retrieve cart data from MongoDB
router.get('/', async (req, res) => {
  try {
    const cartData = await ShoppingCart.find();
    res.status(200).json(cartData);
  } catch (error) {
    console.error('Error retrieving shopping cart data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve shopping cart data' });
  }
});

module.exports = router;