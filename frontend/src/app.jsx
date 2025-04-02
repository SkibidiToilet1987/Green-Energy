import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsentBanner from './components/cookieConsentBanner'; // Import the banner
import Home from './routes/home/Home';
import About from './routes/about/about';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Add the Cookie Consent Banner */}
        <CookieConsentBanner />
      </div>
    </Router>
  );
};

export default App;