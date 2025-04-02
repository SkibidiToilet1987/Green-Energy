const ContactForm = require('../models/contactFormModel');

exports.saveContactForm = async (req, res) => {
  try {
    const { name, phoneNumber, message } = req.body;

    // Ensure the user is authenticated
    const userID = req.user._id; // Assuming `req.user` is populated by authentication middleware
    const userEmail = req.user.email;

    // Create a new contact form entry
    const contactForm = new ContactForm({
      userID,
      userEmail,
      name,
      phoneNumber,
      message,
    });

    // Save to MongoDB
    await contactForm.save();

    res.status(201).json({ message: 'Contact form submitted successfully.' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ error: 'An error occurred while saving the contact form.' });
  }
};