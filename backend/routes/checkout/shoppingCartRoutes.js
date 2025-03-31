const express = require('express');
const router = express.Router();
const ShoppingCart = require('../../models/shoppingCartModel');

router.post('/', async (req, res) => {
  try {
    const { userId, email, cartItems } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    let shoppingCart = await ShoppingCart.findOne({ userId });

    if (shoppingCart) {
      shoppingCart.cartItems = cartItems;
      shoppingCart.email = email;
      await shoppingCart.save();
      return res.status(200).json({ message: 'Shopping cart updated successfully', shoppingCart });
    }

    shoppingCart = new ShoppingCart({
      userId,
      email,
      cartItems,
    });

    await shoppingCart.save();
    res.status(201).json({ message: 'Shopping cart created successfully', shoppingCart });
  } catch (error) {
    console.error('Error saving shopping cart data:', error.message);
    res.status(500).json({ error: 'Failed to save shopping cart data' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cartData = await ShoppingCart.find();
    res.status(200).json(cartData);
  } catch (error) {
    console.error('Error retrieving shopping cart data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve shopping cart data' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
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

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

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