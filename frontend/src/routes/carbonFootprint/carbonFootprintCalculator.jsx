import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarbonFootprintCalculator = () => {
  const [transportation, setTransportation] = useState({
    carMiles: '',
    flightHours: '',
  });

  const [home, setHome] = useState({
    electricityKwh: '',
    gasTherm: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    carMiles: '',
    flightHours: '',
    electricityKwh: '',
    gasTherm: '',
  });

  const [results, setResults] = useState({
    transportationEmissions: 0,
    homeEmissions: 0,
    totalEmissions: 0,
    calculated: false,
  });

  const navigate = useNavigate();

  const validateInput = (name, value) => {
    if (value.trim() === '') {
      return 'This field is required';
    }
    
    // Check for any non-digit characters except decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      return 'Only numbers and decimal point allowed';
    }
    
    // Check for negative numbers
    if (parseFloat(value) < 0) {
      return 'Must be a positive number';
    }
    
    // Check for empty spaces in the middle
    if (value.includes(' ')) {
      return 'Spaces are not allowed';
    }
    
    return '';
  };

  const handleTransportationChange = (e) => {
    const { name, value } = e.target;
    
    // Remove any spaces from the input
    const sanitizedValue = value.replace(/\s/g, '');
    
    // Only allow numbers and decimal point
    if (sanitizedValue === '' || /^\d*\.?\d*$/.test(sanitizedValue)) {
      setTransportation(prev => ({ ...prev, [name]: sanitizedValue }));
    }

    const errorMessage = validateInput(name, sanitizedValue);
    setValidationErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleHomeChange = (e) => {
    const { name, value } = e.target;
    
    // Remove any spaces from the input
    const sanitizedValue = value.replace(/\s/g, '');
    
    // Only allow numbers and decimal point
    if (sanitizedValue === '' || /^\d*\.?\d*$/.test(sanitizedValue)) {
      setHome(prev => ({ ...prev, [name]: sanitizedValue }));
    }

    const errorMessage = validateInput(name, sanitizedValue);
    setValidationErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/calculator' } });
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Token verified. User:', response.data);
      } catch (error) {
        console.error('Token verification failed. Redirecting to login...', error);
        navigate('/login', { state: { from: '/calculator' } });
      }
    };

    verifyToken();
  }, [navigate]);

  const calculateFootprint = async () => {
    // Validate all fields before calculation
    const newValidationErrors = {
      carMiles: validateInput('carMiles', transportation.carMiles),
      flightHours: validateInput('flightHours', transportation.flightHours),
      electricityKwh: validateInput('electricityKwh', home.electricityKwh),
      gasTherm: validateInput('gasTherm', home.gasTherm),
    };
    
    setValidationErrors(newValidationErrors);
    
    // Check if any errors exist
    const hasErrors = Object.values(newValidationErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

    const transportationValues = {
      carMiles: parseFloat(transportation.carMiles) || 0,
      flightHours: parseFloat(transportation.flightHours) || 0,
    };

    const homeValues = {
      electricityKwh: parseFloat(home.electricityKwh) || 0,
      gasTherm: parseFloat(home.gasTherm) || 0,
    };

    const emissionFactors = {
      carPerMile: 0.404,
      flightPerHour: 90,
      electricityPerKwh: 0.4,
      gasPerTherm: 5.3,
    };

    const transportationEmissions =
      transportationValues.carMiles * emissionFactors.carPerMile +
      transportationValues.flightHours * emissionFactors.flightPerHour;

    const homeEmissions =
      homeValues.electricityKwh * emissionFactors.electricityPerKwh +
      homeValues.gasTherm * emissionFactors.gasPerTherm;

    const totalEmissions = transportationEmissions + homeEmissions;

    setResults({
      transportationEmissions: Math.round(transportationEmissions * 100) / 100,
      homeEmissions: Math.round(homeEmissions * 100) / 100,
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      calculated: true,
    });

    try {
      const token = localStorage.getItem('token');
      const verifyResponse = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const email = verifyResponse.data.email;
      const userId = email.split('@')[0];

      const calculatorData = {
        userId,
        email,
        transportation: transportationValues,
        home: homeValues,
        transportationEmissions: Math.round(transportationEmissions * 100) / 100,
        homeEmissions: Math.round(homeEmissions * 100) / 100,
        totalEmissions: Math.round(totalEmissions * 100) / 100,
      };

      console.log('Sending calculator data to backend:', calculatorData);

      await axios.post('http://localhost:3000/carbonCalculator', calculatorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('Calculator data saved successfully.');
    } catch (error) {
      console.error('Error saving calculator data:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation />
      <div style={{ flex: 1, paddingTop: '30px', paddingBottom: '30px' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow mb-4">
                <Card.Body>
                  <Card.Title className="fs-2 text-center mb-4">
                    <strong>Carbon Footprint Calculator</strong>
                  </Card.Title>
                  <p className="text-center mb-4">
                    Enter your monthly usage to estimate your carbon footprint
                  </p>

                  <Card className="mb-4">
                    <Card.Header className="bg-dark text-white">
                      <h5 className="mb-0">Transportation</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Car miles driven (monthly)</Form.Label>
                        <Form.Control
                          type="text"
                          name="carMiles"
                          value={transportation.carMiles}
                          onChange={handleTransportationChange}
                          placeholder="Example: 400"
                          isInvalid={!!validationErrors.carMiles}
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.carMiles}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Flight hours (monthly)</Form.Label>
                        <Form.Control
                          type="text"
                          name="flightHours"
                          value={transportation.flightHours}
                          onChange={handleTransportationChange}
                          placeholder="Example: 2"
                          isInvalid={!!validationErrors.flightHours}
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.flightHours}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>

                  <Card className="mb-4">
                    <Card.Header className="bg-dark text-white">
                      <h5 className="mb-0">Home Energy</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Electricity usage (kWh per month)</Form.Label>
                        <Form.Control
                          type="text"
                          name="electricityKwh"
                          value={home.electricityKwh}
                          onChange={handleHomeChange}
                          placeholder="Example: 500"
                          isInvalid={!!validationErrors.electricityKwh}
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.electricityKwh}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Natural gas usage (therms per month)</Form.Label>
                        <Form.Control
                          type="text"
                          name="gasTherm"
                          value={home.gasTherm}
                          onChange={handleHomeChange}
                          placeholder="Example: 50"
                          isInvalid={!!validationErrors.gasTherm}
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.gasTherm}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>

                  <div className="d-flex justify-content-center mb-4">
                    <Button
                      variant="dark"
                      onClick={calculateFootprint}
                      className="w-100 py-2"
                      disabled={Object.values(validationErrors).some(error => error !== '')}
                    >
                      Calculate
                    </Button>
                  </div>

                  {results.calculated && (
                    <Card className="bg-light">
                      <Card.Header className="bg-dark text-white">
                        <h5 className="mb-0">Your Carbon Footprint Results</h5>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <div className="mb-3 text-center">
                              <h6>Transportation Emissions:</h6>
                              <p className="fs-5">{results.transportationEmissions} kg CO₂e</p>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3 text-center">
                              <h6>Home Energy Emissions:</h6>
                              <p className="fs-5">{results.homeEmissions} kg CO₂e</p>
                            </div>
                          </Col>
                        </Row>
                        <div className="mb-3 text-center">
                          <h5>Total Monthly Carbon Footprint:</h5>
                          <p className="fs-4 fw-bold">{results.totalEmissions} kg CO₂e</p>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <MainFooter />
    </div>
  );
};

export default CarbonFootprintCalculator;