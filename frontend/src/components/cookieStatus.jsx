import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const CookieStatus = () => {
  // This hook is used to read cookies
  const [cookies] = useCookies(['userConsent']);
  
  // This state is used to store the message that will be displayed
  const [statusMessage, setStatusMessage] = useState('');

  // This effect runs whenever the cookies change
  useEffect(() => {
    // Check the value of the 'userConsent' cookie and update the message
    if (cookies.userConsent === 'true') {
      setStatusMessage('User has accepted cookies.');
      console.log('User accepted cookies');
    } else if (cookies.userConsent === 'false') {
      setStatusMessage('User has declined cookies.');
      console.log('User declined cookies');
    } else {
      setStatusMessage('No cookie consent status found.');
      console.log('No cookie consent status found');
    }
  }, [cookies]); // Runs whenever the 'cookies' object changes

  return (
    <div>
      {/* Display the cookie consent status */}
      <h3>Cookie Consent Status</h3>
      <p>{statusMessage}</p>
    </div>
  );
};

export default CookieStatus;