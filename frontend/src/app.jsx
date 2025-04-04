import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsentBanner from './components/cookieConsentBanner';
import CookieStatus from './components/cookieStatus';
import Login from './routes/login/login';
import Register from './routes/register/register';
// ...other imports

function App() {
  return (
    <Router>
      <div>
        {/* Render the cookie consent banner */}
        <CookieConsentBanner />
        {/* Render the cookie status */}
        <CookieStatus />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ...other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;