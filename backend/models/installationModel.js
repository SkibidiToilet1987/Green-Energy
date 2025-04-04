const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
    minlength: [2, 'Name must be at least 2 characters long'], // Ensures name has a minimum length
  },
  email: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Validates email format
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{9}$/, 'Phone number must be exactly 9 digits'], // Validates phone number format
  },
  address: {
    type: String,
    required: true,
    minlength: [5, 'Address must be at least 5 characters long'], // Ensures address has a minimum length
  },
  installationDate: {
    type: Date,
    required: true, // Ensures an installation date is provided
  },
  additionalNotes: {
    type: String,
    trim: true, // Removes extra spaces
    maxlength: [500, 'Additional notes cannot exceed 500 characters'], // Ensures notes are not too long
    default: '', // Default to an empty string if no notes are provided
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], // Restricts status to specific values
    default: 'pending', // Default status is 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

module.exports = mongoose.model('Installation', installationSchema);