import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaWind, 
  FaTint, 
  FaChargingStation, 
  FaHome, 
  FaBuilding, 
  FaHandshake,
  FaLeaf,
  FaUserFriends
} from 'react-icons/fa';
import { MdOutlineEnergySavingsLeaf, MdAttachMoney } from 'react-icons/md';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/carbonFootprint.css';

const Bookings = () => {
  return (
    <div className="carbon-footprint-container">
      <MainNavigation />
      
      <main className="carbon-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="display-3 fw-bold mb-3">Green Energy</h1>
                <h1 className="display-3 fw-bold mb-3">Consultations</h1>
              </div>
              <div className="col-lg-6 text-center">
                <MdOutlineEnergySavingsLeaf className="display-1 pulse-animation"/>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="content-container">
          {/* Content Card 1 - Introduction */}
          <section className="content-card card-zig">
            <div className="card-left">
              <FaHandshake className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Our Green Energy Services</h2>
              <p className="section-text">
                We offer expert consultations and professional installations for renewable energy solutions. 
                With years of experience in sustainable technology, we're committed to helping you transition 
                to cleaner, more efficient energy sources while reducing your environmental impact.
              </p>
            </div>
          </section>

          {/* Content Card 2 - Why Choose Green Energy */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <FaLeaf className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Why Choose Green Energy?</h2>
              <p className="section-text">
                Renewable energy offers significant cost savings over time, reduces your carbon footprint, 
                and provides energy independence. Switching to green energy can cut your household emissions 
                by up to 1.5 tonnes annually while protecting you from rising energy prices.
              </p>
            </div>
          </section>

          {/* Content Card 3 - Consultation Services */}
          <section className="content-card card-zig">
            <div className="card-left">
              <FaUserFriends className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Our Consultation Services</h2>
              <p className="section-text">
                Our consultations provide personalized recommendations and cost-benefit analysis tailored 
                to your specific needs. Whether you're a homeowner, business owner, or landlord, we'll 
                assess your property and energy usage to recommend the most effective solutions.
              </p>
            </div>
          </section>

          {/* Content Card 4 - Installation Services */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <FaSolarPanel className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Installation Services</h2>
              <p className="section-text">
                We specialize in complete installations of:
                <ul className="installation-list">
                  <li><FaSolarPanel className="icon" /> Solar panel systems</li>
                  <li><FaWind className="icon" /> Small wind turbines</li>
                  <li><FaTint className="icon" /> Smart water heating systems</li>
                  <li><FaChargingStation className="icon" /> EV charging stations</li>
                </ul>
                <div className="cta-container">
                  <Link to="/products" className="btn-dark">
                    Browse our Products
                  </Link>
                </div>
                <p className="section-text">
                  Our process includes site assessment, customized planning, professional installation, 
                  and ongoing maintenance support.
                </p>
              </p>
            </div>
          </section>

          {/* Content Card 5 - Cost & Financing */}
          <section className="content-card card-zig">
            <div className="card-left">
              <MdAttachMoney className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Cost & Financing Options</h2>
              <p className="section-text">
                While upfront costs vary, most customers see a return on investment within 3-7 years 
                through energy savings. We offer various financing options including:
                <ul>
                  <li>Lease-to-own programs</li>
                  <li>Government incentive guidance</li>
                  <li>Low-interest green energy loans</li>
                </ul>
                Many of our customers save 30-50% on their energy bills after installation.
              </p>
            </div>
          </section>

          {/* Content Card 6 - How to Book */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <FaHome className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Get Started Today</h2>
              <p className="section-text">
                Ready to explore green energy solutions for your home or business? We offer quick and easy scheduling for both consultations and installations.
              </p>
              <div className="dual-button-container">
                <Link to="/bookings/consultations" className="btn-dark">
                  Schedule consultation in under 2 minutes
                </Link>
                <Link to="/bookings/installations" className="btn-dark">
                  Schedule installation in under 2 minutes
                </Link>
              </div>
              <p className="section-text" style={{marginTop: '2rem'}}>
                Have questions? Contact us through our <Link to="/contact">contact form</Link> or call 
                us at (555) 123-4567.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default Bookings;