const express = require('express');
const router = express.Router();
const ShoppingCart = require('../../models/shoppingCartModel'); // Import the ShoppingCart model

// POST /shoppingcart - Save or update cart data in MongoDB
router.post('/', async (req, res) => {
  try {
    const { userId, email, cartItems } = req.body; // Extract email from the request body

    // Validate email and cart items
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    // Check if a shopping cart already exists for the user
    let shoppingCart = await ShoppingCart.findOne({ userId });

    if (shoppingCart) {
      // Update the existing shopping cart
      shoppingCart.cartItems = cartItems;
      shoppingCart.email = email; // Update the email address
      await shoppingCart.save();
      return res.status(200).json({ message: 'Shopping cart updated successfully', shoppingCart });
    }

    // Create a new shopping cart if none exists
    shoppingCart = new ShoppingCart({
      userId,
      email, // Include the email address
      cartItems,
    });

    // Save to database
    await shoppingCart.save();
    res.status(201).json({ message: 'Shopping cart created successfully', shoppingCart });
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

// GET /shoppingcart/:userId - Retrieve cart data for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the shopping cart for the specified user
    const shoppingCart = await ShoppingCart.findOne({ userId });

    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found for this user' });
    }

    res.status(200).json(shoppingCart);
  } catch (error) {
    console.error('Error retrieving shopping cart data for user:', error.message);
    res.status(500).json({ error: 'Failed to retrieve shopping cart data for user' });
  }
});

// DELETE /shoppingcart/:userId - Delete cart data for a specific user
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the shopping cart for the specified user
    const result = await ShoppingCart.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json({ error: 'Shopping cart not found for this user' });
    }

    res.status(200).json({ message: 'Shopping cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting shopping cart data:', error.message);
    res.status(500).json({ error: 'Failed to delete shopping cart data' });
  }
});

module.exports = router;