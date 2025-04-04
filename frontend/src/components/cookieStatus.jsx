import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const CookieStatus = () => {
  const [cookies] = useCookies(['userConsent']);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Update the status message based on the cookie value
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
  }, [cookies]);

  return (
    <div>
      <h3>Cookie Consent Status</h3>
      <p>{statusMessage}</p>
    </div>
  );
};

export default CookieStatus;