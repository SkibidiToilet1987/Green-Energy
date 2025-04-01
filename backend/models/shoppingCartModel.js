const mongoose = require('mongoose');

// Define the schema for the shopping cart
const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Ensure userId is always provided
  },
  email: {
    type: String,
    required: true, // Ensure email is always provided
  },
  cartItems: [
    {
      productId: { type: String, required: true }, // Product ID
      name: { type: String, required: true }, // Product name
      price: { type: Number, required: true }, // Product price
      image: { type: String }, // Product image URL
      quantity: { type: Number, required: true }, // Quantity of the product
      description: { type: String }, // Product description
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
}, { collection: 'shoppingCart' }); // Explicitly use the existing collection

// Create the model for the shopping cart
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

// Export the model
module.exports = ShoppingCart;