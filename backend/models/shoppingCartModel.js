const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
  cartItems: [
    {
      productId: { type: String, required: true }, // Product ID
      name: { type: String, required: true }, // Product name
      description: { type: String, required: true }, // Product description
      price: { type: Number, required: true }, // Product price
      image: { type: String, required: true }, // Product image URL
      quantity: { type: Number, required: true }, // Quantity purchased
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Export the model for the "shoppingcart" collection
module.exports = mongoose.models.ShoppingCart || mongoose.model('ShoppingCart', shoppingCartSchema, 'shoppingcart');