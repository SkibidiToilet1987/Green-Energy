import React from 'react';
import { useCookies } from 'react-cookie';

const CookieStatus = () => {
  const [cookies] = useCookies(['userConsent']);

  React.useEffect(() => {
    if (cookies.userConsent === 'true') {
      console.log('User accepted cookies');
    } else if (cookies.userConsent === 'false') {
      console.log('User declined cookies');
    } else {
      console.log('No cookie consent status found');
    }
  }, [cookies]);

  return (
    <div>
      <h3>Cookie Consent Status</h3>
      <p>
        {cookies.userConsent === 'true' && 'User has accepted cookies.'}
        {cookies.userConsent === 'false' && 'User has declined cookies.'}
        {!cookies.userConsent && 'No cookie consent status found.'}
      </p>
    </div>
  );
};

export default CookieStatus;