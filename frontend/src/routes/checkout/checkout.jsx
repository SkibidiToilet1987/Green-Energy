import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
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

  // Verify token and redirect if unauthorized
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/checkout' } });
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
        navigate('/login', { state: { from: '/checkout' } });
      }
    };

    verifyToken();
  }, [navigate]);

  const validateInputs = () => {
    const errors = {};

    // Name validation: only letters and spaces
    if (!name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = 'Name must contain only letters and spaces.';
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Address validation: must not be empty
    if (!address.trim()) {
      errors.address = 'Address is required.';
    } else if (address.length < 5) {
      errors.address = 'Address must be at least 5 characters long.';
    }

    // Card number validation: only digits, exactly 16 digits
    if (!cardNumber.trim()) {
      errors.cardNumber = 'Card number is required.';
    } else if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = 'Card number must be exactly 16 digits.';
    }

    // Account number validation: only digits, exactly 8 digits
    if (!accountNumber.trim()) {
      errors.accountNumber = 'Account number is required.';
    } else if (!/^\d{8}$/.test(accountNumber)) {
      errors.accountNumber = 'Account number must be exactly 8 digits.';
    }

    // CCV validation: only digits, exactly 3 digits
    if (!ccv.trim()) {
      errors.ccv = 'CCV is required.';
    } else if (!/^\d{3}$/.test(ccv)) {
      errors.ccv = 'CCV must be exactly 3 digits.';
    }

    // Phone number validation: only digits, exactly 9 digits
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{9}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 9 digits.';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // If validation passes, make API request
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setValidationErrors({ api: 'No token found. Please log in again.' });
        setIsLoading(false);
        return;
      }

      const verifyResponse = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (verifyResponse.status === 200) {
        const emailFromBackend = verifyResponse.data.email;
        const userId = emailFromBackend.split('@')[0];

        const cartItems = JSON.parse(localStorage.getItem('cartItems'))?.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description,
        })) || [];

        if (cartItems.length === 0) {
          setValidationErrors({ api: 'Your cart is empty. Please add items to your cart before checking out.' });
          setIsLoading(false);
          return;
        }

        const checkoutData = {
          userId,
          name,
          email: emailFromBackend,
          address,
          cardNumber,
          accountNumber,
          ccv,
          phoneNumber,
          cartItems,
          createdAt: new Date().toISOString(),
        };

        console.log('Submitting checkout data:', checkoutData);

        const response = await axios.post('http://localhost:3000/checkout', checkoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Checkout data saved successfully:', response.data);
        navigate('/checkout/confirm');
      }
    } catch (error) {
      console.error('Error during token verification or checkout:', error);
      setValidationErrors({ api: 'An error occurred during checkout. Please try again.' });
    } finally {
      setIsLoading(false);
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