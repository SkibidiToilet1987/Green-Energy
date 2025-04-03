import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLightbulb, 
  FaChartLine, 
  FaCogs, 
  FaCalendarAlt, 
  FaHome, 
  FaBuilding, 
  FaTools,
  FaClipboardCheck,
  FaShieldAlt
} from 'react-icons/fa';
import { MdOutlineEnergySavingsLeaf, MdAutoGraph } from 'react-icons/md';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/energyUsage.css';

const EnergyUsage = () => {
  return (
    <div className="carbon-footprint-container">
      <MainNavigation />
      
      <main className="carbon-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="display-3 fw-bold mb-3">Energy Usage</h1>
                <h1 className="display-3 fw-bold mb-3">Optimization</h1>
              </div>
              <div className="col-lg-6 text-center">
                <MdAutoGraph className="display-1 pulse-animation"/>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="content-container">
          {/* Content Card 1 - Introduction */}
          <section className="content-card card-zig">
            <div className="card-left">
              <FaChartLine className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Understanding Your Energy Usage</h2>
              <p className="section-text">
                The first step to reducing your energy consumption is understanding how and where you use energy.
                Our energy usage analysis helps identify patterns, inefficiencies, and opportunities for savings
                in your home or business, creating a foundation for meaningful energy optimization.
              </p>
            </div>
          </section>

          {/* Content Card 2 - Benefits */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <MdOutlineEnergySavingsLeaf className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Benefits of Optimizing Energy Usage</h2>
              <p className="section-text">
                Optimizing your energy consumption offers substantial advantages beyond just saving money.
                It reduces environmental impact, increases property value, improves comfort, extends the
                lifespan of appliances, and provides greater energy independence. Most households can
                reduce their energy usage by 20-30% with proper optimization.
              </p>
            </div>
          </section>

          {/* Content Card 3 - Assessment Services */}
          <section className="content-card card-zig">
            <div className="card-left">
              <FaClipboardCheck className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Energy Assessment Services</h2>
              <p className="section-text">
                Our comprehensive energy assessments provide deep insights into your energy consumption patterns.
                Using advanced monitoring tools and expert analysis, we examine your electrical systems,
                appliance efficiency, insulation quality, and usage patterns to identify specific opportunities
                for improvement and savings.
              </p>
            </div>
          </section>

          {/* Content Card 4 - Optimization Solutions */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <FaCogs className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Energy Optimization Solutions</h2>
              <p className="section-text">
                We offer a range of solutions to optimize your energy usage:
                <ul className="installation-list">
                  <li><FaLightbulb className="icon" /> Smart lighting systems</li>
                  <li><FaShieldAlt className="icon" /> Improved insulation solutions</li>
                  <li><FaTools className="icon" /> Appliance upgrades and maintenance</li>
                  <li><FaCalendarAlt className="icon" /> Automated energy scheduling</li>
                </ul>
                <div className="cta-container d-flex justify-content-start" style={{ marginBottom: '1rem' }}>
                  <button className="btn btn-dark">
                    <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>
                      Browse our Products
                    </Link>
                  </button>
                </div>
                <p className="section-text">
                  Our solutions are tailored to your specific needs and can be implemented in phases to
                  fit your budget and timeline.
                </p>
              </p>
            </div>
          </section>

          {/* Content Card 5 - Monitoring & Results */}
          <section className="content-card card-zig">
            <div className="card-left">
              <FaChartLine className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Ongoing Monitoring & Results</h2>
              <p className="section-text">
                Energy optimization is an ongoing process, not a one-time event. We provide:
                <ul>
                  <li>Continuous monitoring systems</li>
                  <li>Quarterly performance reports</li>
                  <li>Adjustment recommendations</li>
                  <li>ROI tracking on implemented solutions</li>
                </ul>
                Clients typically see 15-25% reduction in energy costs within the first year of implementing
                our recommendations, with ongoing improvements year after year.
              </p>
            </div>
          </section>

          {/* Content Card 6 - Calculator CTA */}
          <section className="content-card reverse card-zag">
            <div className="card-left">
              <FaHome className="section-icon" size={60} />
            </div>
            <div className="card-right">
              <h2 className="section-title">Calculate Your Potential Savings</h2>
              <p className="section-text">
                Wondering how much you could save by optimizing your energy usage? Use our free energy
                savings calculator to get a personalized estimate based on your current usage patterns.
              </p>
              <div className="dual-button-container d-flex justify-content-start" style={{ gap: '15px' }}>
                <button className="btn btn-dark">
                  <Link to="/energy-usage/calculator" style={{ color: 'white', textDecoration: 'none' }}>
                    Energy Savings Calculator
                  </Link>
                </button>
                <button className="btn btn-dark">
                  <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>
                    Schedule Assessment
                  </Link>
                </button>
              </div>
              <p className="section-text" style={{marginTop: '2rem'}}>
                Have questions about optimizing your energy usage? Contact us through our <Link to="/contact" style={{ color: '#212529', fontWeight: 'bold', textDecoration: 'none' }}>contact form</Link> or call 
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

export default EnergyUsage;