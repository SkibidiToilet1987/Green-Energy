import React from 'react';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { FaUsers, FaStar, FaGlobeAmericas, FaLeaf, FaClock } from 'react-icons/fa';
import '../../assets/about.css';

const About = () => {
  const teamFaqs = [
    {
      question: 'What is our mission?',
      answer:
        'We are committed to driving sustainable energy solutions that reduce carbon emissions and create a cleaner, more sustainable future for our planet.',
    },
    {
      question: 'How do we make a difference?',
      answer:
        'Through innovative renewable energy technologies and strategic partnerships, we develop cutting-edge solutions that transform how communities access and use green energy.',
    },
    {
      question: 'How long has Rolsa Technologies been in business?',
      answer:
        'Rolsa Technologies has been at the forefront of renewable energy solutions for over 25 years. Our extensive experience allows us to provide the most efficient and reliable green energy systems on the market.',
    },
    {
      question: 'Do you offer ongoing support after installation?',
      answer:
        'Absolutely! We provide comprehensive support throughout your entire green energy journey. Our 5-star rated customer service team is always ready to assist with any questions or concerns you may have after installation.',
    },
    {
      question: 'What types of renewable energy solutions do you offer?',
      answer:
        'We offer a comprehensive range of renewable energy solutions including solar panel installations, battery storage systems, heat pumps, energy efficiency audits, and smart home energy management systems. All our solutions can be customized to fit your specific needs and property requirements.',
    },
    {
      question: 'Are there any government incentives available for renewable energy installations?',
      answer:
        'Yes, there are several government incentives, tax credits, and rebates available for renewable energy installations. Our team stays up-to-date with the latest programs and will help you navigate the application process to maximize your savings and benefits when installing our green energy solutions.',
    }
  ];

  const greenEnergyMissions = [
    {
      title: 'Why Green Energy Matters',
      description:
        "Climate change is no longer a distant threat—it's a present reality. Rising global temperatures, extreme weather events, and ecological disruption are direct consequences of our continued reliance on fossil fuels. Green energy offers a critical pathway to mitigate these challenges, reduce carbon emissions, and preserve our planet's delicate ecosystems.",
      icon: <FaGlobeAmericas />,
    },
    {
      title: 'How We Can Make a Difference',
      description:
        'By transitioning to renewable energy sources like solar, wind, and hydro, we can dramatically reduce greenhouse gas emissions. Each megawatt of green energy prevents tons of carbon dioxide from entering our atmosphere. Our technologies and strategies empower communities, businesses, and individuals to be active participants in the global sustainability movement.',
      icon: <FaLeaf />,
    },
    {
      title: 'Why Now is the Time',
      description:
        'The window for meaningful climate action is narrowing. Scientists warn that we must significantly reduce emissions by 2030 to prevent irreversible damage. Green energy technologies are now more efficient and cost-effective than ever before. By investing in renewable energy now, we can create jobs, stimulate economic growth, and secure a livable future for generations to come.',
      icon: <FaClock />,
    },
  ];

  // Added solution data with icons
  const solutions = [
    {
      title: "Bespoke System Design",
      description: "Whether you need just solar panels, a battery system, or a complete package with a heat pump, we'll design the perfect solution tailored to your home. We'll also help you select smart tariffs that maximize your energy savings and efficiency."
    },
    {
      title: "Quality You Can Trust",
      description: "We partner with industry-leading brands like Tesla Powerwall and SolarEdge to provide premium hardware backed by comprehensive warranties. You'll receive ongoing support from our 5-star rated customer service team throughout your green energy journey."
    },
    {
      title: "25 Years of Expertise",
      description: "From initial consultation to installation and tariff setup, we provide comprehensive support every step of the way. With over 25 years of renewable energy experience and B Corp certification for our environmental commitment, you're in capable hands."
    }
  ]; 

  // Added expert companies
  const expertCompanies = [
    "B Corporation", "Tesla Powerwall", "Trustpilot", "EthicalConsumer",
    "uSwitch", "Which?", "Which? Trusted Trader",
    "B Corporation", "Tesla Powerwall", "Trustpilot", "EthicalConsumer",
    "uSwitch", "Which?", "Which? Trusted Trader"
  ];

  // Added reviews data
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

  return (
    <div className="about-page">
      <MainNavigation />

      <main className="about-content" style={{ backgroundColor: 'white' }}>
        <section className="hero-section">
          <div className="container">
            <div className="hero-wrapper">
              <div className="hero-text">
                <h1 className="main-heading" style={{ color: 'white' }}>
                  About Rolsa
                </h1>
                <h1 className="main-heading" style={{ color: 'white' }}>
                  Technologies
                </h1>
              </div>
              {/* Team-focused icon for "about us" */}
              <div className="hero-icon-container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaUsers style={{ fontSize: '10rem', color: 'white', animation: 'pulse 2s infinite' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Added Keeping Greener Energy Simple Section */}
        <section className="solutions-section" style={{ backgroundColor: 'white', padding: '80px 0' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>
              Keeping Greener Energy Simple
              <br />
              That's Rolsa Technologies
            </h2>
            <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              {solutions.map((solution, index) => (
                <div key={index} className="solution-card" style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <h3 className="solution-title" style={{ fontSize: '1.5rem', marginBottom: '15px', textAlign: 'center' }}>
                    {solution.title}
                  </h3>
                  <p className="solution-description" style={{ color: '#666', lineHeight: '1.6' }}>
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mission-section" style={{ backgroundColor: 'white' }}>
          <div className="container">
            <h2 className="section-title">Our Green Energy Mission</h2>
            <div className="mission-grid">
              {greenEnergyMissions.map((mission, index) => (
                <div key={index} className="mission-card">
                  <div className="mission-icon" style={{ fontSize: '3rem', color: '#212529' }}>
                    {mission.icon}
                  </div>
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-description">{mission.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-width Recommended by Experts Section */}
        <section className="experts-section" style={{
          padding: '60px 0',
          backgroundColor: 'white',
          overflow: 'hidden',
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw'
        }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Recommended by the Experts</h2>

            <div className="expert-carousel-container" style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
              <div className="expert-carousel" style={{ display: 'flex', animation: 'scrollLogos 30s linear infinite' }}>
                {expertCompanies.map((company, index) => (
                  <div className="expert-logo" key={index} style={{ padding: '10px', transition: 'transform 0.3s' }}>
                    <div className="logo-placeholder" style={{
                      width: '120px',
                      height: '60px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      color: '#666',
                      borderRadius: '5px',
                      border: '1px dashed #ccc'
                    }}>
                      {company}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Added Reviews Section */}
        <section className="reviews-section" style={{ padding: '60px 0', backgroundColor: 'white' }}>
          <div className="container">
            <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Our Latest Reviews</h2>

            <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              {reviews.map((review, index) => (
                <div key={index} className="review-card" style={{
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '30px',
                  backgroundColor: 'white',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <div className="trustpilot-stars" style={{ display: 'flex', marginBottom: '15px' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} style={{ color: '#00b67a', fontSize: '1.25rem', marginRight: '2px' }} />
                    ))}
                  </div>
                  <p className="review-text" style={{ marginBottom: '20px' }}>"{review.text}"</p>
                  <p className="review-author" style={{ fontSize: '0.95rem' }}><strong>{review.author} | {review.date}</strong></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section at bottom with all 6 FAQs */}
        <section className="faq-section" style={{
          padding: '60px 0',
          backgroundColor: '#f4f4f4',
          margin: 0,
          marginBottom: '0'
        }}>
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="accordion">
              {teamFaqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <input
                    type="checkbox"
                    id={`accordion-${index}`}
                    className="accordion-checkbox"
                  />
                  <label htmlFor={`accordion-${index}`} className="accordion-label">
                    {faq.question}
                  </label>
                  <div className="accordion-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MainFooter />

      {/* Add keyframe animation for logo scrolling */}
      <style>
        {`
    @keyframes scrollLogos {
      0% { transform: translateX(0); }
      100% { transform: translateX(-10%); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .faq-section {
      margin-bottom: 0 !important; /* Ensure no extra margin at the bottom */
    }

    .about-page main {
      margin-bottom: 0; /* Ensure no extra margin at the bottom of the main content */
    }

    .main-footer {
      margin-top: 0 !important; /* Ensure no extra margin at the top of the footer */
    }
  `}
      </style>
    </div>
  );
};

export default About;