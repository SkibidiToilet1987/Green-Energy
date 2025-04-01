const ShoppingCart = require('../models/shoppingCartModel');

// Create or update a shopping cart
exports.createOrUpdateCart = async (req, res) => {
  try {
    const { userId, email, cartItems } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
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
      shoppingCart.email = email;
      await shoppingCart.save();
      return res.status(200).json({ message: 'Shopping cart updated successfully', shoppingCart });
    }

    // Create a new shopping cart
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
};

// Retrieve all shopping carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await ShoppingCart.find();
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error retrieving shopping carts:', error.message);
    res.status(500).json({ error: 'Failed to retrieve shopping carts' });
  }
};

// Retrieve a shopping cart by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const shoppingCart = await ShoppingCart.findOne({ userId });

    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found for this user' });
    }

    res.status(200).json(shoppingCart);
  } catch (error) {
    console.error('Error retrieving shopping cart:', error.message);
    res.status(500).json({ error: 'Failed to retrieve shopping cart' });
  }
};

// Delete a shopping cart by user ID
exports.deleteCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await ShoppingCart.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json({ error: 'Shopping cart not found for this user' });
    }

    res.status(200).json({ message: 'Shopping cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting shopping cart:', error.message);
    res.status(500).json({ error: 'Failed to delete shopping cart' });
  }
};