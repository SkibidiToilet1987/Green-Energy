const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  cardNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ccv: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Checkout', checkoutSchema);