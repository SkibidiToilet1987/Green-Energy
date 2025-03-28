import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ccv, setCcv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email address';
    if (!address) newErrors.address = 'Address is required';
    if (cardNumber.length !== 16) newErrors.cardNumber = 'Card number must be exactly 16 digits';
    if (accountNumber.length !== 8) newErrors.accountNumber = 'Account number must be exactly 8 digits';
    if (ccv.length !== 3) newErrors.ccv = 'CCV must be exactly 3 digits';
    if (phoneNumber.length !== 9) newErrors.phoneNumber = 'Phone number must be exactly 9 digits';

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
        cartItems: JSON.parse(localStorage.getItem('cartItems')), // Retrieve cart items from localStorage
      })
      .then((response) => {
        console.log('Checkout data saved successfully:', response.data);
        navigate('/checkout/confirm'); // Navigate to confirmation page
      })
      .catch((error) => {
        console.error('Error saving checkout data:', error);
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

                  <Form.Group className="mb-3" controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={16}
                      isInvalid={!!validationErrors.cardNumber}
                    />
                    {validationErrors.cardNumber && (
                      <Form.Text className="text-danger">{validationErrors.cardNumber}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formAccountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      maxLength={8}
                      isInvalid={!!validationErrors.accountNumber}
                    />
                    {validationErrors.accountNumber && (
                      <Form.Text className="text-danger">{validationErrors.accountNumber}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCcv">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter CCV"
                      value={ccv}
                      onChange={(e) => setCcv(e.target.value)}
                      maxLength={3}
                      isInvalid={!!validationErrors.ccv}
                    />
                    {validationErrors.ccv && (
                      <Form.Text className="text-danger">{validationErrors.ccv}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={9}
                      isInvalid={!!validationErrors.phoneNumber}
                    />
                    {validationErrors.phoneNumber && (
                      <Form.Text className="text-danger">{validationErrors.phoneNumber}</Form.Text>
                    )}
                  </Form.Group>

                  {validationErrors.api && (
                    <div className="text-danger mb-3">{validationErrors.api}</div>
                  )}

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