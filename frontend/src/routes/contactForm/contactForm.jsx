import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Verify token and fetch user details
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token'); // Use the same key as in /checkout
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/contact' } });
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Token verified. User:', response.data);
        setEmail(response.data.email); // Set user email from the token response
        setUserId(response.data.id); // Set user ID from the token response
      } catch (error) {
        console.error('Token verification failed. Redirecting to login...', error);
        navigate('/login', { state: { from: '/contact' } });
      }
    };

    verifyToken();
  }, [navigate]);

  // Validate form inputs
  const validateInputs = () => {
    const errors = {};
    if (!name.trim() || !/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = 'Full name is required and must contain only letters and spaces.';
    }
    if (!phoneNumber.trim() || !/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must contain only numbers.';
    }
    if (!message.trim()) {
      errors.message = 'Message cannot be empty.';
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
      const token = localStorage.getItem('token'); // Use the same key as in /checkout
      if (!token) {
        setValidationErrors({ api: 'No token found. Please log in again.' });
        setIsLoading(false);
        return;
      }

      const contactFormData = {
        userId,
        name,
        email,
        phoneNumber,
        message,
        createdAt: new Date().toISOString(),
      };

      console.log('Submitting contact form data:', contactFormData);

      // Submit contact form data to the backend
      const response = await axios.post('http://localhost:3000/api/contactForm', contactFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('Contact form data saved successfully:', response.data);
      navigate('/contact/confirm'); // Redirect to /contact/confirm after successful submission
    } catch (error) {
      console.error('Error sending message:', error);
      setValidationErrors({ api: 'An error occurred while sending your message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation />
      <Container className="d-flex justify-content-center align-items-center" style={{ flex: '1' }}>
        <Row className="w-75 justify-content-center">
          <Col md={10} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fs-2 text-center mb-4"><strong>Contact Us</strong></Card.Title>
                <Form onSubmit={handleSubmit}>
                  {/* Full Name Field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!validationErrors.name}
                    />
                    {validationErrors.name && <Form.Text className="text-danger">{validationErrors.name}</Form.Text>}
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!validationErrors.email}
                      disabled // Email is pre-filled and cannot be changed
                    />
                    {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                  </Form.Group>

                  {/* Phone Number Field */}
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
                    {validationErrors.phoneNumber && <Form.Text className="text-danger">{validationErrors.phoneNumber}</Form.Text>}
                  </Form.Group>

                  {/* Message Field */}
                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      isInvalid={!!validationErrors.message}
                    />
                    {validationErrors.message && <Form.Text className="text-danger">{validationErrors.message}</Form.Text>}
                  </Form.Group>

                  {/* API Error Message */}
                  {validationErrors.api && <div className="text-danger mb-3">{validationErrors.api}</div>}

                  {/* Submit Button */}
                  <Button style={{ width: '100%' }} variant="dark" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                      'Send Message'
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

export default ContactForm;