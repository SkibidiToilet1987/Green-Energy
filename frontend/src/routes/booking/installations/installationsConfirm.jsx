import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MainNavigation from '../../../components/mainnavigation';
import MainFooter from '../../../components/MainFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstallationConfirm = () => {
  const navigate = useNavigate();

  const [requestNumber, setRequestNumber] = useState('');
  const [responseTime] = useState('Within 2 Business Days');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/installations/confirm' } });
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
        navigate('/login', { state: { from: '/installations/confirm' } });
      }
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    const generateRequestNumber = () => {
      return Math.floor(Math.random() * 1000000);
    };

    setRequestNumber(generateRequestNumber());
  }, []);

  const handleGoBack = () => {
    navigate('/bookings/installations');
  };

  const handleViewInstallations = () => {
    navigate('/profile');
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
                  <strong>Installation Request Received!</strong>
                </Card.Title>
                <Card.Text className="mt-3">
                  Your installation request has been successfully submitted. You will receive a confirmation email shortly.
                </Card.Text>
                <Card.Text className="mt-3">
                  <strong>Request Number:</strong> #{requestNumber}
                </Card.Text>
                <Card.Text className="mt-2">
                  <strong>Expected Response:</strong> {responseTime}
                </Card.Text>
                <Card.Text className="mt-3">
                  We will contact you to confirm the installation date and time.
                </Card.Text>
                <div className="mt-4">
                  <Button
                    variant="dark"
                    onClick={handleViewInstallations}
                    className="me-3"
                    style={{ backgroundColor: '#212529', borderColor: '#212529' }}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="dark"
                    onClick={handleGoBack}
                    style={{ backgroundColor: '#212529', borderColor: '#212529' }}
                  >
                    Go Back
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

export default InstallationConfirm;