const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{9}$/, 'Phone number must be exactly 9 digits'],
  },
  address: {
    type: String,
    required: true,
    minlength: [5, 'Address must be at least 5 characters long'],
  },
  installationDate: {
    type: Date,
    required: true,
  },
  additionalNotes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Installation', installationSchema);