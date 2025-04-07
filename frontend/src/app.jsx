import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsentBanner from './components/cookieConsentBanner'; // Component for showing the cookie consent banner
import CookieStatus from './components/cookieStatus'; // Component to display the current cookie consent status
import Login from './routes/login/login'; // Login page
import Register from './routes/register/register'; // Register page
// more space for future imports
function App() {
  return (
    <Router>
      <div>
        {/* Render the cookie consent banner */}
        <CookieConsentBanner />

        {/* Render the cookie status */}
        <CookieStatus />

        {/* Define the routes for the application */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Index />} />

          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the register page */}
          <Route path="/register" element={<Register />} />

          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;