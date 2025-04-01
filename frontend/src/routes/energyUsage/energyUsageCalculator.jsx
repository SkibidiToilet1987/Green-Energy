import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';

const EnergyUsageCalculator = () => {
  const [wattsPerDay, setWattsPerDay] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [daysPerMonth, setDaysPerMonth] = useState('');
  const [costPerKWh, setCostPerKWh] = useState('');
  const [energyUsagePerDay, setEnergyUsagePerDay] = useState(null);
  const [energyUsagePerMonth, setEnergyUsagePerMonth] = useState(null);
  const [energyUsagePerYear, setEnergyUsagePerYear] = useState(null);
  const [costPerDay, setCostPerDay] = useState(null);
  const [costPerMonth, setCostPerMonth] = useState(null);
  const [costPerYear, setCostPerYear] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  // Verify token and fetch user details on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/energy-usage' } });
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Token verified. User:', response.data);
        setUserId(response.data.id); // Assuming the backend returns `id` for the user
        setEmail(response.data.email);
      } catch (error) {
        console.error('Token verification failed. Redirecting to login...', error);
        navigate('/login', { state: { from: '/energy-usage' } });
      }
    };

    verifyToken();
  }, [navigate]);

  const validateInputs = () => {
    const errors = {};

    if (!wattsPerDay || wattsPerDay <= 0) {
      errors.wattsPerDay = 'Please enter a valid positive number for watts per day.';
    }

    if (!hoursPerDay || hoursPerDay <= 0 || hoursPerDay > 24) {
      errors.hoursPerDay = 'Please enter a valid number of hours per day (1-24).';
    }

    if (!daysPerMonth || daysPerMonth <= 0 || daysPerMonth > 31) {
      errors.daysPerMonth = 'Please enter a valid number of days per month (1-31).';
    }

    if (!costPerKWh || costPerKWh <= 0) {
      errors.costPerKWh = 'Please enter a valid positive number for the cost per kWh.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateEnergyUsage = async () => {
    if (!validateInputs()) return;

    const wattsPerDayNum = parseFloat(wattsPerDay);
    const hoursPerDayNum = parseFloat(hoursPerDay);
    const daysPerMonthNum = parseFloat(daysPerMonth);
    const costPerKWhNum = parseFloat(costPerKWh);

    const energyPerDay = (wattsPerDayNum * hoursPerDayNum) / 1000; // kWh
    const energyPerMonth = energyPerDay * daysPerMonthNum;
    const energyPerYear = energyPerMonth * 12;

    setEnergyUsagePerDay(energyPerDay);
    setEnergyUsagePerMonth(energyPerMonth);
    setEnergyUsagePerYear(energyPerYear);

    const costPerDayVal = energyPerDay * costPerKWhNum;
    const costPerMonthVal = energyPerMonth * costPerKWhNum;
    const costPerYearVal = energyPerYear * costPerKWhNum;

    setCostPerDay(costPerDayVal);
    setCostPerMonth(costPerMonthVal);
    setCostPerYear(costPerYearVal);

    // Send data to the backend
    try {
      const token = localStorage.getItem('token');
      const payload = {
        userId,
        email,
        wattsPerDay: wattsPerDayNum,
        hoursPerDay: hoursPerDayNum,
        daysPerMonth: daysPerMonthNum,
        costPerKWh: costPerKWhNum,
        energyUsage: {
          perDay: energyPerDay,
          perMonth: energyPerMonth,
          perYear: energyPerYear,
        },
        cost: {
          perDay: costPerDayVal,
          perMonth: costPerMonthVal,
          perYear: costPerYearVal,
        },
        createdAt: new Date().toISOString(),
      };

      console.log('Payload being sent to backend:', payload);

      const response = await axios.post('http://localhost:3000/energy-usage', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Energy usage data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving energy usage data:', error.response?.data || error.message);
      alert('Failed to save energy usage data. Please try again.');
    }
  };

  return (
    <>
      <MainNavigation />
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-50 justify-content-center">
          <Col md={10} style={{ paddingTop: '40px' }}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fs-2 text-center">
                  <strong>Energy Usage Calculator</strong>
                </Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formWattsPerDay">
                    <Form.Label>How much energy is being used daily? (watts)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Example: 10"
                      value={wattsPerDay}
                      onChange={(e) => setWattsPerDay(e.target.value)}
                      isInvalid={!!validationErrors.wattsPerDay}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.wattsPerDay}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formHoursPerDay">
                    <Form.Label>How many hours per day?</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Example: 5"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(e.target.value)}
                      isInvalid={!!validationErrors.hoursPerDay}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.hoursPerDay}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDaysPerMonth">
                    <Form.Label>How many days per month?</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Example: 15"
                      value={daysPerMonth}
                      onChange={(e) => setDaysPerMonth(e.target.value)}
                      isInvalid={!!validationErrors.daysPerMonth}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.daysPerMonth}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCostPerKWh">
                    <Form.Label>How much does it cost per kWh?</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Example: 0.10"
                      value={costPerKWh}
                      onChange={(e) => setCostPerKWh(e.target.value)}
                      isInvalid={!!validationErrors.costPerKWh}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.costPerKWh}</Form.Control.Feedback>
                  </Form.Group>

                  <Button style={{ width: '100%' }} variant="dark" onClick={calculateEnergyUsage}>
                    Calculate
                  </Button>
                </Form>

                {energyUsagePerDay !== null && (
                  <div className="mt-4 text-center">
                    <h5>Results:</h5>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="rounded-3"
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <thead className="table-dark">
                        <tr>
                          <th></th>
                          <th>Usage (kWh)</th>
                          <th>Cost (£)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Per Day</td>
                          <td>{energyUsagePerDay.toFixed(2)} kWh</td>
                          <td>{costPerDay.toFixed(2)} £</td>
                        </tr>
                        <tr>
                          <td>Per Month</td>
                          <td>{energyUsagePerMonth.toFixed(2)} kWh</td>
                          <td>{costPerMonth.toFixed(2)} £</td>
                        </tr>
                        <tr>
                          <td>Per Year</td>
                          <td>{energyUsagePerYear.toFixed(2)} kWh</td>
                          <td>{costPerYear.toFixed(2)} £</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </>
  );
};

export default EnergyUsageCalculator;