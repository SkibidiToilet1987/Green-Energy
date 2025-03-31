const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
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
  createdAt: { type: Date, default: Date.now },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema, 'shoppingCart');

module.exports = ShoppingCart;