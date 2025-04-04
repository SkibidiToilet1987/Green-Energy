import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../assets/cookie.css'; // Import the CSS file for styling

const CookieConsentBanner = () => {
  const [cookies, setCookie] = useCookies(['userConsent']);
  const [showBanner, setShowBanner] = useState(false);

  const userId = '12345'; // Replace with actual user ID if available
  const userEmail = 'user@example.com'; // Replace with actual user email if available

  useEffect(() => {
    if (!cookies.userConsent) {
      setShowBanner(true);
    }
  }, [cookies]);

  const handleAccept = () => {
    console.log("Cookies accepted!");

    // Save consent data to MongoDB via backend
    axios.post('http://localhost:3000/api/cookies/save-consent', {
      userId,
      userEmail,
      consentStatus: true,
    }).then(() => {
      console.log("Consent status saved successfully.");
    }).catch((error) => {
      console.error("Error saving consent status:", error.response || error.message);
    });

    // Save cookie data locally
    setCookie('userConsent', 'true', { path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
    setShowBanner(false);
  };

  const handleDecline = () => {
    console.log("Cookies declined!");

    // Save decline data to MongoDB via backend
    axios.post('http://localhost:3000/api/cookies/save-consent', {
      userId,
      userEmail,
      consentStatus: false,
    }).then(() => {
      console.log("Decline status saved successfully.");
    }).catch((error) => {
      console.error("Error saving decline status:", error.response || error.message);
    });

    // Save cookie data locally
    setCookie('userConsent', 'false', { path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null; // Do not render the banner if consent is already given or declined
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
      expires={365} // Cookie expires in 365 days
      onAccept={handleAccept}
      onDecline={handleDecline}
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