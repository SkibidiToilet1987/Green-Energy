const mongoose = require('mongoose');

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

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;