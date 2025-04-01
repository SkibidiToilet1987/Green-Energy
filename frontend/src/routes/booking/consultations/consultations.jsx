import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import MainNavigation from '../../../components/mainnavigation';
import MainFooter from '../../../components/MainFooter';
import axios from 'axios';

const Consultations = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [consultationDate, setConsultationDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Verify token and restrict access
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/consultations' } });
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Token verified. User:', response.data);
        setEmail(response.data.email); // Pre-fill email from user data
      } catch (error) {
        console.error('Token verification failed. Redirecting to login...', error);
        navigate('/login', { state: { from: '/consultations' } });
      }
    };

    verifyToken();
  }, [navigate]);

  // Validate form inputs
  const validateInputs = () => {
    const errors = {};
    const currentDate = new Date();
    const selectedDateObj = new Date(consultationDate);

    if (!name.trim()) {
      errors.name = 'Full name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = 'Full name cannot contain numbers or special characters.';
    }

    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{9}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 9 digits.';
    }

    if (!address.trim()) {
      errors.address = 'Address is required.';
    } else if (address.length < 5) {
      errors.address = 'Address must be at least 5 characters long.';
    }

    if (!consultationDate) {
      errors.consultationDate = 'Consultation date is required.';
    } else if (selectedDateObj < currentDate) {
      errors.consultationDate = 'Consultation date must be a future date.';
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
      const token = localStorage.getItem('token');
      if (!token) {
        setValidationErrors({ api: 'No token found. Please log in again.' });
        setIsLoading(false);
        return;
      }

      const consultationData = {
        name,
        email,
        phoneNumber,
        address,
        consultationDate,
        additionalNotes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log('Submitting consultation request:', consultationData);

      const response = await axios.post('http://localhost:3000/consultations', consultationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('Consultation request saved successfully:', response.data);
      navigate('/consultations/confirm');
    } catch (error) {
      console.error('Error during consultation request:', error);
      setValidationErrors({ api: 'An error occurred while submitting your consultation request. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Format date to YYYY-MM-DD for date input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get min date (today) for date inputs
  const getMinDate = () => {
    return formatDateForInput(new Date());
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
                  <strong>Request a Consultation</strong>
                </Card.Title>
                <Form onSubmit={handleSubmit} className="consultation-form">
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!validationErrors.name}
                    />
                    {validationErrors.name && (
                      <Form.Text className="text-danger">{validationErrors.name}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!validationErrors.email}
                    />
                    {validationErrors.email && (
                      <Form.Text className="text-danger">{validationErrors.email}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={9}
                      isInvalid={!!validationErrors.phoneNumber}
                    />
                    {validationErrors.phoneNumber && (
                      <Form.Text className="text-danger">{validationErrors.phoneNumber}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      isInvalid={!!validationErrors.address}
                    />
                    {validationErrors.address && (
                      <Form.Text className="text-danger">{validationErrors.address}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConsultationDate">
                    <Form.Label>Consultation Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      min={getMinDate()}
                      isInvalid={!!validationErrors.consultationDate}
                    />
                    {validationErrors.consultationDate && (
                      <Form.Text className="text-danger">{validationErrors.consultationDate}</Form.Text>
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
                      'Request Consultation'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
};

export default Consultations;