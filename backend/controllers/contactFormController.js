const ContactForm = require('../models/contactFormModel'); // Ensure this path is correct

exports.saveContactForm = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    console.log('Authenticated user:', req.user); // Log the authenticated user

    const { name, phoneNumber, message } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !message) {
      console.error('Validation error: Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save the contact form data to the existing "contactForm" collection
    const contactForm = new ContactForm({
      userId: req.user.id, // User ID from the token
      userEmail: req.user.email, // User email from the token
      name,
      phoneNumber,
      message,
    });

    console.log('Saving contact form data:', contactForm); // Log the data being saved

    await contactForm.save();

    console.log('Contact form saved successfully');
    res.status(201).json({ message: 'Contact form submitted successfully.' });
  } catch (error) {
    console.error('Error saving contact form:', error); // Log the error
    res.status(500).json({ error: 'Failed to save contact form.' });
  }
};