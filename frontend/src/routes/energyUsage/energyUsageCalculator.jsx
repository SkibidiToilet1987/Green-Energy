import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';

const EnergyUsageCalculator = () => {
  const [householdSize, setHouseholdSize] = useState('');
  const [applianceUsage, setApplianceUsage] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [electricityBill, setElectricityBill] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedUsage, setEstimatedUsage] = useState(null);
  const navigate = useNavigate();

  // Verify token and restrict access
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/energy-usage-survey' } });
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
        navigate('/login', { state: { from: '/energy-usage-survey' } });
      }
    };

    verifyToken();
  }, [navigate]);

  // Validate form inputs
  const validateInputs = () => {
    const errors = {};

    if (!householdSize.trim() || isNaN(householdSize) || householdSize <= 0) {
      errors.householdSize = 'Household size is required and must be a positive number.';
    }

    if (!applianceUsage.trim() || isNaN(applianceUsage) || applianceUsage <= 0) {
      errors.applianceUsage = 'Appliance usage is required and must be a positive number.';
    }

    if (!heatingType) {
      errors.heatingType = 'Please select a heating type.';
    }

    if (!electricityBill.trim() || isNaN(electricityBill) || electricityBill <= 0) {
      errors.electricityBill = 'Electricity bill is required and must be a positive number.';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      // Call an API to calculate the energy usage based on the form data
      const energyData = {
        householdSize: parseInt(householdSize, 10),
        applianceUsage: parseFloat(applianceUsage),
        heatingType,
        electricityBill: parseFloat(electricityBill),
        additionalNotes,
      };

      console.log('Calculating energy usage with data:', energyData);

      const response = await axios.post('http://localhost:3000/energy-usage', energyData, {
        withCredentials: true,
      });

      console.log('Energy usage calculated:', response.data);

      // Check if response has the estimatedUsage property
      if (response.data && response.data.estimatedUsage) {
        setEstimatedUsage(response.data.estimatedUsage);
      } else {
        setValidationErrors({ api: 'Invalid response from the API.' });
      }
    } catch (error) {
      console.error('Error calculating energy usage:', error);

      // Log more detailed error info
      if (error.response) {
        console.error('API Response Error:', error.response);
        setValidationErrors({ api: error.response.data.message || 'An error occurred while calculating your energy usage. Please try again.' });
      } else {
        setValidationErrors({ api: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <MainNavigation />
      <Container className="d-flex justify-content-center align-items-center" style={{ flex: '1' }}>
        <Row className="w-75 justify-content-center">
          <Col md={10} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fs-2 text-center mb-4">
                  <strong>Energy Usage Survey</strong>
                </Card.Title>
                <Form onSubmit={handleSubmit} className="energy-usage-form">
                  <Form.Group className="mb-3" controlId="formHouseholdSize">
                    <Form.Label>Household Size</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of people in your household"
                      value={householdSize}
                      onChange={(e) => setHouseholdSize(e.target.value)}
                      isInvalid={!!validationErrors.householdSize}
                    />
                    {validationErrors.householdSize && (
                      <Form.Text className="text-danger">{validationErrors.householdSize}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formApplianceUsage">
                    <Form.Label>Appliance Usage (kWh per month)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your monthly appliance usage in kWh"
                      value={applianceUsage}
                      onChange={(e) => setApplianceUsage(e.target.value)}
                      isInvalid={!!validationErrors.applianceUsage}
                    />
                    {validationErrors.applianceUsage && (
                      <Form.Text className="text-danger">{validationErrors.applianceUsage}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formHeatingType">
                    <Form.Label>Heating Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={heatingType}
                      onChange={(e) => setHeatingType(e.target.value)}
                      isInvalid={!!validationErrors.heatingType}
                    >
                      <option value="">Select Heating Type</option>
                      <option value="electric">Electric</option>
                      <option value="gas">Gas</option>
                    </Form.Control>
                    {validationErrors.heatingType && (
                      <Form.Text className="text-danger">{validationErrors.heatingType}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formElectricityBill">
                    <Form.Label>{heatingType === 'gas' ? 'Gas Bill' : 'Electricity Bill'}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter your monthly ${heatingType === 'gas' ? 'gas' : 'electricity'} bill`}
                      value={electricityBill}
                      onChange={(e) => setElectricityBill(e.target.value)}
                      isInvalid={!!validationErrors.electricityBill}
                    />
                    {validationErrors.electricityBill && (
                      <Form.Text className="text-danger">{validationErrors.electricityBill}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formAdditionalNotes">
                    <Form.Label>Additional Notes (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Any additional information you'd like to share"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </Form.Group>

                  {validationErrors.api && (
                    <div className="text-danger mb-3">{validationErrors.api}</div>
                  )}

                  <Button
                    style={{ width: '100%' }}
                    variant="dark"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Calculate Energy Usage'
                    )}
                  </Button>
                </Form>

                {estimatedUsage !== null && (
                  <div className="mt-4">
                    <h5>Estimated Energy Usage:</h5>
                    <p><strong>{estimatedUsage} kWh per month</strong></p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
};

export default EnergyUsageCalculator;
