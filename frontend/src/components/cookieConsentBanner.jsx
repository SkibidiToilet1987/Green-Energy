import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent'; // Library for cookie consent UI
import { useCookies } from 'react-cookie'; // Library for handling cookies
import axios from 'axios'; // For making HTTP requests
import '../assets/cookie.css'; // Importing custom CSS for styling

const CookieConsentBanner = () => {
  // State to manage cookies and whether to show the banner
  const [cookies, setCookie] = useCookies(['userConsent']);
  const [showBanner, setShowBanner] = useState(true); // Default to true so the banner shows initially

  // Dummy user data (replace with actual user data if available)
  const userId = '12345'; // Example user ID
  const userEmail = 'user@example.com'; // Example user email

  // Check if the cookie already exists when the component loads
  useEffect(() => {
    console.log('Checking cookies:', cookies);

    // If the cookie is already set, hide the banner
    if (cookies.userConsent === 'true' || cookies.userConsent === 'false') {
      console.log('Cookie consent already set:', cookies.userConsent);
      setShowBanner(false);
    } else {
      console.log('No valid consent cookie found, showing banner');
      setShowBanner(true);
    }
  }, [cookies]);

  // Function to handle when the user accepts cookies
  const handleAccept = () => {
    console.log('Cookies accepted!');

    // Save the user's consent to the backend
    axios
      .post('http://localhost:3000/api/cookies/save-consent', {
        userId,
        userEmail,
        consentStatus: true, // User accepted cookies
      })
      .then(() => {
        console.log('Consent status saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving consent status:', error.response || error.message);
      });

    // Save the consent status in a cookie
    setCookie('userConsent', 'true', {
      path: '/', // Cookie is accessible across the entire site
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      sameSite: 'lax', // Prevents CSRF attacks
      secure: process.env.NODE_ENV === 'production', // Only secure in production
    });

    // Hide the banner
    setShowBanner(false);
  };

  // Function to handle when the user declines cookies
  const handleDecline = () => {
    console.log('Cookies declined!');

    // Save the user's decline status to the backend
    axios
      .post('http://localhost:3000/api/cookies/save-consent', {
        userId,
        userEmail,
        consentStatus: false, // User declined cookies
      })
      .then(() => {
        console.log('Decline status saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving decline status:', error.response || error.message);
      });

    // Save the decline status in a cookie
    setCookie('userConsent', 'false', {
      path: '/', // Cookie is accessible across the entire site
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      sameSite: 'lax', // Prevents CSRF attacks
      secure: process.env.NODE_ENV === 'production', // Only secure in production
    });

    // Hide the banner
    setShowBanner(false);
  };

  // If the banner shouldn't be shown, return nothing
  if (!showBanner) {
    return null;
  }

  // Render the cookie consent banner
  return (
    <CookieConsent
      location="bottom" // Banner appears at the bottom of the page
      buttonText="Allow All" // Text for the accept button
      declineButtonText="Reject All" // Text for the decline button
      enableDeclineButton // Enables the decline button
      cookieName="userConsent" // Name of the cookie to store consent
      containerClasses="cookie-container" // Custom CSS class for the container
      contentClasses="cookie-content" // Custom CSS class for the content
      buttonClasses="cookie-button accept-button" // Custom CSS class for the accept button
      declineButtonClasses="cookie-button decline-button" // Custom CSS class for the decline button
      expires={365} // Cookie expires in 365 days
      onAccept={handleAccept} // Function to call when the user accepts
      onDecline={handleDecline} // Function to call when the user declines
      overlay // Adds a semi-transparent overlay behind the banner
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