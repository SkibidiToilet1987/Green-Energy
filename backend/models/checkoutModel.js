const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Buyer's name
  email: { type: String, required: true }, // Buyer's email
  address: { type: String, required: true }, // Buyer's address
  cardNumber: { type: String, required: true }, // Buyer's card number
  accountNumber: { type: String, required: true }, // Buyer's account number
  ccv: { type: String, required: true }, // Buyer's CCV
  phoneNumber: { type: String, required: true }, // Buyer's phone number
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Export the model for the "checkout" collection
module.exports = mongoose.models.Checkout || mongoose.model('Checkout', checkoutSchema, 'checkout');