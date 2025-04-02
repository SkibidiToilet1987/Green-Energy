const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Use the existing "cookieConsent" collection
const CookieConsent = mongoose.connection.collection('cookieConsent');

// Save cookie consent status
router.post('/save-consent', async (req, res) => {
  const { userId, userEmail, consentStatus } = req.body;

  // Validate request data
  if (!userId || !userEmail || consentStatus === undefined) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    // Save the consent data to the existing collection
    const consentData = {
      userId,
      userEmail,
      consentStatus,
      timestamp: new Date(),
    };

    await CookieConsent.insertOne(consentData); // Use insertOne to save the document
    console.log(`Consent data saved: ${JSON.stringify(consentData)}`);
    res.status(200).json({ message: 'Consent status saved successfully' });
  } catch (error) {
    console.error('Error saving consent data:', error);
    res.status(500).json({ message: 'Error saving consent data' });
  }
});

module.exports = router;