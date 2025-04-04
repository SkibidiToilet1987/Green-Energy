import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsentBanner from './components/cookieConsentBanner';
import Login from './routes/login/login';
import Register from './routes/register/register';

function App() {
  return (
    <Router>
      <div>
        {/* Render the cookie consent banner */}
        <CookieConsentBanner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;