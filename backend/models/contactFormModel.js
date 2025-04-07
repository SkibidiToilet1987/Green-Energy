const mongoose = require('mongoose'); // Import mongoose

// Define the schema for the contact form
const contactFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        // Validate email format
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Invalid email format.',
    },
  },
  name: {
    type: String,
    required: true,
    trim: true, // Remove extra spaces
    validate: {
      validator: function (name) {
        // Ensure name contains only letters and spaces
        return /^[a-zA-Z\s]+$/.test(name);
      },
      message: 'Name must contain only letters and spaces.',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (phoneNumber) {
        // Ensure phone number contains only digits
        return /^\d+$/.test(phoneNumber);
      },
      message: 'Phone number must contain only digits.',
    },
  },
  message: {
    type: String,
    required: true,
    trim: true, // Remove extra spaces
    minlength: [10, 'Message must be at least 10 characters long.'],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Export the model
module.exports = mongoose.model('ContactForm', contactFormSchema, 'contactForm');