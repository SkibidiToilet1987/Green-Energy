const mongoose = require('mongoose');

// Define the schema for the shopping cart collection
const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Ensure one cart per user
  },
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      quantity: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
});

// Explicitly set the collection name to "shoppingcart"
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema, 'shoppingcart');

module.exports = ShoppingCart;