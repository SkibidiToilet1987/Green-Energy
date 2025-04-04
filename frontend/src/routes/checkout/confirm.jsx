import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Confirm = () => {
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('5-7 Business Days');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/checkout/confirm' } });
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
        navigate('/login', { state: { from: '/checkout/confirm' } });
      }
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    const generateOrderNumber = () => {
      return Math.floor(Math.random() * 1000000);
    };

    setOrderNumber(generateOrderNumber());
  }, []);

  const handleGoBack = () => {
    navigate('/products');
  };

  const handleViewOrders = () => {
    navigate('/account');
  };

  return (
    <>
      <MainNavigation />
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-50 justify-content-center">
          <Col md={10} style={{ paddingTop: '40px' }}>
            <Card className="shadow text-center" style={{ backgroundColor: 'white', color: '#212529' }}>
              <Card.Body>
                <Card.Title className="fs-2">
                  <strong>Thank You for Your Purchase!</strong>
                </Card.Title>
                <Card.Text className="mt-3">
                  Your order has been successfully placed. You will receive a confirmation email shortly.
                </Card.Text>
                <Card.Text className="mt-3">
                  <strong>Order Number:</strong> #{orderNumber}
                </Card.Text>
                <Card.Text className="mt-2">
                  <strong>Estimated Delivery:</strong> {deliveryTime}
                </Card.Text>
                <div className="mt-4">
                  <Button
                    variant="dark"
                    onClick={handleViewOrders}
                    className="me-3"
                    style={{ backgroundColor: '#212529', borderColor: '#212529' }}
                  >
                    View Orders
                  </Button>
                  <Button
                    variant="dark"
                    onClick={handleGoBack}
                    style={{ backgroundColor: '#212529', borderColor: '#212529' }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </>
  );
};

export default Confirm;