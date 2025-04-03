import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaLeaf, 
  FaChartLine, 
  FaTools, 
  FaCalendarCheck, 
  FaHome,
  FaLightbulb,
  FaRecycle,
  FaWater,
  FaWind,
  FaCheck,
  FaStar,
  FaThermometerHalf,
  FaChargingStation,
  FaPumpSoap,
  FaArrowRight,
  FaCertificate,
  FaMedal,
  FaHandshake,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import MainNavigation from '../components/mainnavigation';
import MainFooter from '../components/MainFooter';
import '.././/assets/HomePage.css';

const HomePage = () => {
  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Review data
  const reviews = [
    {
      text: "After installing the solar panels recommended by the team, my energy bills have decreased by over 60%. The consultation process was informative and the installation was completed professionally and on time.",
      author: "Sarah",
      date: "March 15, 2025",
      rating: 5
    },
    {
      text: "The energy usage optimization recommendations helped our business reduce our carbon footprint by 40% while saving us thousands in operating costs. Their 2-minute survey was surprisingly accurate in identifying our needs.",
      author: "Michael",
      date: "February 28, 2025",
      rating: 5
    },
    {
      text: "We've been absolutely thrilled with our home solar system. The team walked us through every step of the process and the installation was flawless. Our electricity bills are practically non-existent now!",
      author: "David",
      date: "March 10, 2025",
      rating: 5
    },
    {
      text: "The installation team was punctual, professional and extremely knowledgeable. They took the time to explain everything and even helped set up our monitoring app. We're seeing immediate energy savings!",
      author: "Jennifer",
      date: "March 20, 2025",
      rating: 5
    }
  ];

  // Product data
  const products = [
    {
      title: "Solar Panels",
      icon: <FaSolarPanel className="product-icon" />,
      description: "High-efficiency solar panels that can reduce your electricity bills by up to 70% and increase your home's energy independence."
    },
    {
      title: "Smart Thermostat",
      icon: <FaThermometerHalf className="product-icon" />,
      description: "Intelligent climate control that learns your patterns and optimizes heating and cooling to save energy and reduce costs."
    },
    {
      title: "EV Charging Station",
      icon: <FaChargingStation className="product-icon" />,
      description: "Home charging solutions for electric vehicles that integrate with your solar system for truly green transportation."
    },
    {
      title: "Heat Pump",
      icon: <FaPumpSoap className="product-icon" />,
      description: "Efficient heating and cooling systems that extract renewable heat from the air, reducing both your carbon footprint and energy bills."
    }
  ];

  // Expert companies
  const expertCompanies = [
    "B Corporation", "Tesla Powerwall", "Trustpilot", "EthicalConsumer", 
    "uSwitch", "Which?", "Which? Trusted Trader",
    "B Corporation", "Tesla Powerwall", "Trustpilot", "EthicalConsumer",  // Duplicated for continuous scrolling
    "uSwitch", "Which?", "Which? Trusted Trader"
  ];

  // Green energy features data
  const greenFeatures = [
    {
      title: "100% True Green Power",
      icon: <FaLeaf className="feature-icon" />,
      description: "All our electricity comes directly from renewable sources, with no greenwashing or certificate trading schemes."
    },
    {
      title: "40% New Green Energy",
      icon: <FaRecycle className="feature-icon" />,
      description: "We support new renewable generators connecting to the grid for the first time, helping expand clean energy infrastructure."
    },
    {
      title: "90% Time-Matched Green",
      icon: <FaChartLine className="feature-icon" />,
      description: "Our green energy is produced when our customers actually use it, creating real-time balance in the grid."
    }
  ];

  // Solution data with icons
  const solutions = [
    {
      title: "Bespoke System Design",
      icon: <FaTools className="solution-icon" />,
      description: "Whether you need just solar panels, a battery system, or a complete package with a heat pump, we'll design the perfect solution tailored to your home. We'll also help you select smart tariffs that maximize your energy savings and efficiency."
    },
    {
      title: "Quality You Can Trust",
      icon: <FaCertificate className="solution-icon" />,
      description: "We partner with industry-leading brands like Tesla Powerwall and SolarEdge to provide premium hardware backed by comprehensive warranties. You'll receive ongoing support from our 5-star rated customer service team throughout your green energy journey."
    },
    {
      title: "25 Years of Expertise",
      icon: <FaMedal className="solution-icon" />,
      description: "From initial consultation to installation and tariff setup, we provide comprehensive support every step of the way. With over 25 years of renewable energy experience and B Corp certification for our environmental commitment, you're in capable hands."
    }
  ];

  return (
    <div className={`home-page-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <MainNavigation />
      
      {/* Theme Toggle Button */}
      <div className="theme-toggle-container">
        <Button 
          variant={isDarkMode ? "light" : "dark"} 
          className="theme-toggle-button" 
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
      
      {/* Hero Section - directly connected to products section */}
      <section className="hero-section" style={{ minHeight: '500px', marginBottom: 0, paddingBottom: '100px' }}>
        <Container className="h-100">
          <Row className="align-items-center h-100">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-3">Make your home</h1>
              <h1 className="display-3 fw-bold mb-4">a powerhouse.</h1>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <FaHome className="hero-icon" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="products-section" style={{ marginTop: 0, paddingTop: '80px' }}>
        <Container>
          <h2 className="section-title text-center mb-4" style={{ fontSize: '3rem' }}>Make Your Home a Powerhouse</h2>
          
          <Row style={{ marginTop: '50px' }}>  
            {products.map((product, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="product-card h-100">
                  <Card.Body className="text-center p-4">
                    <div className="product-icon-container mb-3">
                      {product.icon}
                    </div>
                    <Card.Title className="mb-3">{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pb-4 text-start ps-4">
                    <Button 
                      variant="dark" 
                      className="rounded-circle arrow-button"
                      as={Link} 
                      to="/products"
                      aria-label={`Explore ${product.title}`}
                    >
                      <FaArrowRight />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Keeping Greener Energy Simple Section */}
      <section className="solutions-section">
        <Container>
          <h2 className="section-title text-center mb-5" style={{ fontSize: '3rem' }}>
            Keeping Greener Energy Simple
            <br />
            That's Rolsa Technologies
          </h2>
          <Row className="align-items-start">
            {solutions.map((solution, index) => (
              <Col lg={4} className="mb-5" key={index}>
                <Card className="h-100 solution-card">
                  <Card.Body className="p-4">
                    <div className="solution-icon-container text-center mb-4">
                      <div style={{ fontSize: '3rem', color: 'var(--dark-color)' }}>
                        {solution.icon}
                      </div>
                    </div>
                    <h3 className="mb-3 text-center">{solution.title}</h3>
                    <Card.Text>
                      {solution.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* MODIFIED: Looking for the power to make a difference section */}
      <section className="cart-section">
        <Container>
          <Card className="cart-card power-difference-card">
            <Card.Body className="p-0">
              <Row className="m-0">
                <Col md={6} className="p-4 p-md-5 text-start">
                  <h2 className="section-title mb-4" style={{ fontSize: '2.5rem' }}>Looking for the power to make a difference?</h2>
                  <p>
                    Switch to the UK's only home energy supplier that's a Certified B Corp. With 100% renewable 
                    electricity and greener gas tariffs*, plus customer service that's rated Excellent on Trustpilot.
                  </p>
                  <p>
                    Take our quick 2-minute survey to help us understand your needs and provide 
                    personalized recommendations for your green energy journey.
                  </p>
                  <div className="mt-4 mb-3">
                    <Button 
                      variant="dark" 
                      size="lg" 
                      as={Link} 
                      to="/energy-usage/calculator"
                      className="primary-button switch-button"
                    >
                      Switch in 2 minutes <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </Col>
                <Col md={6} className="p-0 d-flex align-items-center justify-content-center power-difference-image">
                  <div className="image-placeholder">
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* How Green is Your Electricity Section */}
      <section className="why-choose-section">
        <Container>
          <h2 className="section-title text-center mb-5" style={{ fontSize: '3rem' }}>How Green is Your Electricity?</h2>
          
          <p className="section-subtitle text-center mb-4">
            Many '100% renewable' electricity tariffs aren't as green as they claim. Our Good Green Supply 
            transparency standard reveals what really matters in renewable energy.
          </p>
          
          <Row className="mt-5">
            {greenFeatures.map((feature, index) => (
              <Col md={4} className="mb-4" key={index}>
                <Card className="h-100 solution-card">
                  <Card.Body className="p-4">
                    <div className="text-center mb-4">
                      <div style={{ fontSize: '3rem', color: 'var(--dark-color)' }}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="mb-3 text-center">{feature.title}</h3>
                    <Card.Text>
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Recommended by Experts Section */}
      <section className="experts-section">
        <Container className="text-center">
          <h2 className="section-title mb-5" style={{ fontSize: '3rem' }}>Recommended by the Experts</h2>
          
          <div className="expert-carousel-container">
            <div className="expert-carousel">
              {expertCompanies.map((company, index) => (
                <div className="expert-logo" key={index}>
                  <div className="logo-placeholder">
                    {company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <Container>
          <h2 className="section-title text-center mb-5" style={{ fontSize: '3rem' }}>Our Latest Reviews</h2>
          
          <Row>
            {reviews.slice(0, 2).map((review, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Card className="h-100 review-card">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <div className="trustpilot-stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                    </div>
                    <Card.Text className="mb-4">"{review.text}"</Card.Text>
                    <div className="review-footer">
                      <p className="review-author mb-0"><strong>{review.author} | {review.date}</strong></p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            {reviews.slice(2, 4).map((review, index) => (
              <Col md={6} className="mb-4" key={index + 2}>
                <Card className="h-100 review-card">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <div className="trustpilot-stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                    </div>
                    <Card.Text className="mb-4">"{review.text}"</Card.Text>
                    <div className="review-footer">
                      <p className="review-author mb-0"><strong>{review.author} | {review.date}</strong></p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container className="text-center">
          <h2 className="section-title" style={{ fontSize: '3rem' }}>Start Your Green Energy Journey Today</h2>
          <p className="section-subtitle">
            Our consultations and installations are designed to make the transition to green energy 
            simple and effective. The survey takes less than 2 minutes, and our expert team will 
            handle the rest.
          </p>
          <div className="button-group">
            <Button 
              variant="dark" 
              size="lg" 
              className="consultation-button"
              as={Link} 
              to="/consultation"
            >
              Book a Consultation
            </Button>
            <Button 
              variant="outline-dark" 
              size="lg" 
              as={Link} 
              to="/bookings/installations"
              className="outline-button"
            >
              Schedule Installation
            </Button>
          </div>
        </Container>
      </section>

      <MainFooter />
    </div>
  );
};

export default HomePage;