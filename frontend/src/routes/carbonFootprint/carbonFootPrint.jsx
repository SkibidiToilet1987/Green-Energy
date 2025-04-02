import React from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/carbonFootprint.css';

const CarbonFootprint = () => {
  return (
    <div className="carbon-footprint-container">
      <MainNavigation />
      
      <main className="carbon-main">
        {/* Hero Section with blob shape image */}
        <section className="hero-section">
          <div className="hero-blob">
            <img 
              src="https://media.canadianunderwriter.ca/uploads/2021/03/Carbon-Footprint.jpg" 
              alt="Earth climate" 
              className="hero-image"
            />
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">What Is</h1>
            <h1 className="hero-title">Carbon Footprint?</h1>
          </div>
        </section>

        {/* Content Sections */}
        <div className="content-container">
          {/* What does carbon footprint mean? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/120/120" 
              alt="Carbon footprint illustration" 
              className="section-image image-circular right-aligned-image"
            />
            
            <h2 className="section-title">What does carbon footprint mean?</h2>
            <p className="section-text">
              Your carbon footprint represents the total greenhouse gases released from your everyday activities. Think of it as your personal climate impact scorecard, typically measured in carbon dioxide equivalent units, that accounts for various emissions from your lifestyle choices.
            </p>
          </section>

          {/* Where did the idea of carbon footprint come from? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/100/100" 
              alt="BP logo and history" 
              className="section-image image-rounded left-aligned-image"
            />
            
            <h2 className="section-title">Where did the idea of carbon footprint come from?</h2>
            <p className="section-text">
              Surprisingly, the carbon footprint concept emerged from a BP marketing campaign - yes, the oil company. Critics view it as a clever deflection strategy, shifting climate responsibility from corporate polluters to individuals. This classic example of greenwashing encouraged people to focus on their personal emissions while diverting attention from the bigger issue: how energy is produced in the first place.
            </p>
          </section>

          {/* Does that mean your own personal carbon footprint isn't important? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/110/110" 
              alt="Personal vs corporate responsibility" 
              className="section-image image-tilted-right right-aligned-image"
            />
            
            <h2 className="section-title">Does that mean your own personal carbon footprint isn't important?</h2>
            <p className="section-text">
              While major polluters like fossil fuel corporations bear the greatest responsibility for emissions reduction, your individual green choices still create meaningful change. It's worth noting that wealth correlates strongly with carbon impact - the richest 10% globally generate about half of all emissions. This disparity stems from carbon-heavy lifestyle choices including frequent travel and high energy usage in developed nations.
            </p>
          </section>

          {/* What do the climate scientists say? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/130/90" 
              alt="Climate scientists research" 
              className="section-image image-tilted-left left-aligned-image"
            />
            
            <h2 className="section-title">What do the climate scientists say?</h2>
            <p className="section-text">
              The latest IPCC report makes it clear: we must act now to combat climate change, primarily by slashing carbon emissions to limit global warming to 1.5°C. Scientists emphasize that major corporations, especially those in the fossil fuel industry, must lead this transition - with research showing 40% of coal plants need to shut down by 2030 to meet global targets. Yet personal responsibility remains crucial too. The IPCC specifically highlights how individual lifestyle changes significantly reduce the amount of carbon we'll need to artificially remove from our atmosphere later.
            </p>
          </section>

          {/* What is the average carbon footprint in the UK? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/120/80" 
              alt="UK carbon statistics" 
              className="section-image image-tilted-right right-aligned-image"
            />
            
            <h2 className="section-title">What is the average carbon footprint in the UK?</h2>
            <p className="section-text">
              The typical UK resident generates 10-13 tonnes of CO₂ annually - roughly double the global average. To help curb climate change, experts suggest we need to reduce this dramatically to about 2.3 tonnes per person yearly. There's hope though - IPCC research indicates that smart lifestyle changes could slash up to 9 tonnes from an individual's carbon footprint.
            </p>
          </section>

          {/* How can we measure and reduce our carbon footprint? */}
          <section className="content-section">
            <img 
              src="/api/placeholder/90/90" 
              alt="Carbon reduction strategies" 
              className="section-image image-circular left-aligned-image"
            />
            
            <img 
              src="/api/placeholder/70/70" 
              alt="Electric car" 
              className="section-image small-image image-circular right-aligned-image"
            />
            
            <h2 className="section-title">How can we measure and reduce our carbon footprint?</h2>
            <p className="section-text">
              Ditching fossil fuels for renewable energy offers one of the biggest carbon savings - potentially over 600kg of CO₂ yearly. Other significant reductions come from embracing electric vehicles, cutting back on air travel, and choosing climate-friendly transportation options for your daily commute.
            </p>
            
            <p className="section-text">
              Wondering where you stand? Our super-quick energy usage calculator reveals your personal carbon footprint and suggests tailored reduction strategies that fit your lifestyle. Just two minutes gives you a clear picture of your environmental impact and practical steps to shrink it effectively.
            </p>
            
            <div className="cta-container">
              <Link to="/energy-usage/calculator" className="calculator-button">
                Calculate in 2 minutes!
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default CarbonFootprint;