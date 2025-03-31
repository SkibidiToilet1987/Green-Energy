const mongoose = require('mongoose');

// Define the schema for the checkout collection
const checkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Ensure one checkout document per user
  },
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true }, // User's email
  address: { type: String, required: true }, // Shipping address
  cardNumber: { type: String, required: true }, // Credit card number
  accountNumber: { type: String, required: true }, // Bank account number
  ccv: { type: String, required: true }, // Credit card CCV
  phoneNumber: { type: String, required: true }, // User's phone number
  cartItems: [
    {
      productId: { type: String, required: true }, // Product ID
      name: { type: String, required: true }, // Product name
      price: { type: Number, required: true }, // Product price
      quantity: { type: Number, required: true }, // Quantity of the product
      description: { type: String, required: true }, // Product description
    },
  ],
});

// Explicitly set the collection name to "checkout"
const Checkout = mongoose.model('Checkout', checkoutSchema, 'checkout');

// Export the model for use in other parts of the application
module.exports = Checkout;