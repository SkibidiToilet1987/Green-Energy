const ContactForm = require('../models/contactFormModel'); // Import the model

exports.saveContactForm = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body

    const { userId, name, email, phoneNumber, message } = req.body;

    // Validate required fields
    if (!userId || !name || !email || !phoneNumber || !message) {
      console.error('Validation error: Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save the contact form data to the database
    const contactForm = new ContactForm({
      userId,
      userEmail: email, // Map the email to the userEmail field
      name,
      email, // Optional: Keep this if your schema includes `email` separately
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