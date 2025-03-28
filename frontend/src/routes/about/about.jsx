import React from 'react'
import MainNavigation from '../../components/MainNavigation'
import MainFooter from '../../components/MainFooter'
import "../../assets/about.css"

const About = () => {
  const teamFaqs = [
    {
      question: "What is our mission?",
      answer: "We are committed to driving sustainable energy solutions that reduce carbon emissions and create a cleaner, more sustainable future for our planet."
    },
    {
      question: "How do we make a difference?",
      answer: "Through innovative renewable energy technologies and strategic partnerships, we develop cutting-edge solutions that transform how communities access and use green energy."
    }
  ];

  return (
    <div className="about-page">
      <MainNavigation />
      <main className="about-content">
        <section className="hero-section">
          <div className="container">
            <div className="hero-wrapper">
              <div className="hero-text">
                <h1 className="main-heading">Meet Our Creative Team</h1>
                <p className="hero-description">
                  Green energy is vital for a sustainable future. We are dedicated to reducing greenhouse gas emissions, conserving natural resources, and leading the fight against climate change.
                </p>
              </div>
              <div className="hero-images">
                <div className="image-grid">
                  <img 
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Customer supports.png" 
                    alt="Team collaboration" 
                    className="team-image team-image-1" 
                  />
                  <img 
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/d51.png" 
                    alt="Team member" 
                    className="team-image team-image-2" 
                  />
                  <img 
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/d12.png" 
                    alt="Team strategy" 
                    className="team-image team-image-3" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
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
    </div>
  )
}

export default About