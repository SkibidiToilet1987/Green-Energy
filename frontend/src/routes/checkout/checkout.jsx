import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/checkout.css';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // State to manage form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ccv, setCcv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Input handlers for specific fields
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setAccountNumber(value);
  };

  const handleCcvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCcv(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhoneNumber(value);
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!address) {
      newErrors.address = 'Address is required';
    }
    if (cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits';
    }
    if (accountNumber.length !== 8) {
      newErrors.accountNumber = 'Account number must be exactly 8 digits';
    }
    if (ccv.length !== 3) {
      newErrors.ccv = 'CCV must be exactly 3 digits';
    }
    if (phoneNumber.length !== 9) {
      newErrors.phoneNumber = 'Phone number must be exactly 9 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    // If validation passes, make API request
    setIsLoading(true);
    axios
      .post('http://localhost:3000/checkout', {
        name,
        email,
        address,
        cardNumber,
        accountNumber,
        ccv,
        phoneNumber,
      })
      .then((response) => {
        // Navigate to confirmation page after successful submission
        navigate('/checkout/confirm');
      })
      .catch((error) => {
        // Handle errors
        setValidationErrors({ api: 'An error occurred during checkout.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  <strong>Checkout</strong>
                </Card.Title>
                <Form onSubmit={handleSubmit} className="checkout-form">
                  {/* Name */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!validationErrors.name}
                    />
                    {validationErrors.name && (
                      <Form.Text className="text-danger">{validationErrors.name}</Form.Text>
                    )}
                  </Form.Group>

                  {/* Email */}
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

                  {/* Address */}
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

                  {/* Card Number */}
                  <Form.Group className="mb-3" controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={16}
                      isInvalid={!!validationErrors.cardNumber}
                    />
                    {validationErrors.cardNumber && (
                      <Form.Text className="text-danger">{validationErrors.cardNumber}</Form.Text>
                    )}
                  </Form.Group>

                  {/* Account Number */}
                  <Form.Group className="mb-3" controlId="formAccountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                      maxLength={8}
                      isInvalid={!!validationErrors.accountNumber}
                    />
                    {validationErrors.accountNumber && (
                      <Form.Text className="text-danger">{validationErrors.accountNumber}</Form.Text>
                    )}
                  </Form.Group>

                  {/* CCV */}
                  <Form.Group className="mb-3" controlId="formCcv">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter CCV"
                      value={ccv}
                      onChange={handleCcvChange}
                      maxLength={3}
                      isInvalid={!!validationErrors.ccv}
                    />
                    {validationErrors.ccv && (
                      <Form.Text className="text-danger">{validationErrors.ccv}</Form.Text>
                    )}
                  </Form.Group>

                  {/* Phone Number */}
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      maxLength={9}
                      isInvalid={!!validationErrors.phoneNumber}
                    />
                    {validationErrors.phoneNumber && (
                      <Form.Text className="text-danger">{validationErrors.phoneNumber}</Form.Text>
                    )}
                  </Form.Group>

                  {/* API Error Message (Inline) */}
                  {validationErrors.api && (
                    <div className="text-danger mb-3">{validationErrors.api}</div>
                  )}

                  {/* Submit Button */}
                  <Button
                    style={{ width: '100%' }}
                    variant="primary"
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
                      'Submit'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </>
  );
};

export default Checkout;