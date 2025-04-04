import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../assets/cookie.css';

const CookieConsentBanner = () => {
  const [cookies, setCookie] = useCookies(['userConsent']);
  const [showBanner, setShowBanner] = useState(true); // Default to true to ensure banner shows initially

  const userId = '12345'; // Replace with actual user ID if available
  const userEmail = 'user@example.com'; // Replace with actual user email if available

  useEffect(() => {
    console.log('Checking cookies:', cookies);
    
    // Check if cookie exists and has a valid value
    if (cookies.userConsent === 'true' || cookies.userConsent === 'false') {
      console.log('Cookie consent already set:', cookies.userConsent);
      setShowBanner(false);
    } else {
      console.log('No valid consent cookie found, showing banner');
      setShowBanner(true);
    }
  }, [cookies]);

  const handleAccept = () => {
    console.log('Cookies accepted!');

    // Save consent data to MongoDB via backend
    axios.post('http://localhost:3000/api/cookies/save-consent', {
      userId,
      userEmail,
      consentStatus: true,
    })
    .then(() => {
      console.log('Consent status saved successfully.');
    })
    .catch((error) => {
      console.error('Error saving consent status:', error.response || error.message);
    });

    // Save cookie data locally
    setCookie('userConsent', 'true', { 
      path: '/', 
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    setShowBanner(false);
  };

  const handleDecline = () => {
    console.log('Cookies declined!');

    // Save decline data to MongoDB via backend
    axios.post('http://localhost:3000/api/cookies/save-consent', {
      userId,
      userEmail,
      consentStatus: false,
    })
    .then(() => {
      console.log('Decline status saved successfully.');
    })
    .catch((error) => {
      console.error('Error saving decline status:', error.response || error.message);
    });

    // Save cookie data locally
    setCookie('userConsent', 'false', { 
      path: '/', 
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Allow All"
      declineButtonText="Reject All"
      enableDeclineButton
      cookieName="userConsent"
      containerClasses="cookie-container"
      contentClasses="cookie-content"
      buttonClasses="cookie-button accept-button"
      declineButtonClasses="cookie-button decline-button"
      expires={365}
      onAccept={handleAccept}
      onDecline={handleDecline}
      overlay
    >
      <h3 className="cookie-header">Cookies from Rolsa Technologies</h3>
      <p className="cookie-text">
        To make our website work, we save some essential small files (cookies) on your computer. 
        With your permission, we would also like to save some extra cookies that help us improve 
        how people find out about Rolsa Technologies.
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;