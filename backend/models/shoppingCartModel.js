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
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
});

// Explicitly set the collection name to "shoppingCart"
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema, 'shoppingCart');

module.exports = ShoppingCart;