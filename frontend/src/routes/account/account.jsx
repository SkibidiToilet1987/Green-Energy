import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaInfoCircle, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AccountPage = () => {
  const [localPart, setLocalPart] = useState('');
  const [userInfo, setUserInfo] = useState({ fname: '', sname: '', email: '' });
  const [consultations, setConsultations] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [energyUsage, setEnergyUsage] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', id: '' });
  const [itemToReschedule, setItemToReschedule] = useState({ type: '', id: '' });
  const [newDate, setNewDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/account' } });
          return;
        }

        // Fetch user info
        const userResponse = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const { email, fname, sname } = userResponse.data;
        const localPartOfEmail = email.split('@')[0];
        setLocalPart(localPartOfEmail);
        setUserInfo({ fname, sname, email });

        // Fetch consultations
        const consultationsResponse = await axios.get('http://localhost:3000/consultations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConsultations(consultationsResponse.data);

        // Fetch installations
        const installationsResponse = await axios.get('http://localhost:3000/installations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstallations(installationsResponse.data);

        // Fetch energy usage with email included
        const energyUsageResponse = await axios.get('http://localhost:3000/energy-usage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            email: email
          }
        });
        setEnergyUsage(energyUsageResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Energy usage data not found.');
        } else if (error.response && error.response.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
          navigate('/login', { state: { from: '/account' } });
        } else {
          console.error('Failed to fetch data:', error);
          setError('Failed to load data. Please try again later.');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleReschedule = (type, id) => {
    setItemToReschedule({ type, id });
    setShowRescheduleModal(true);
  };

  const confirmReschedule = async () => {
    if (!itemToReschedule || !newDate) return;

    const { type, id } = itemToReschedule;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/${type}/${id}`,
        { date: newDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (type === 'consultations') {
          setConsultations(prev =>
            prev.map(item =>
              item._id === id ? { ...item, consultationDate: newDate } : item
            )
          );
        } else if (type === 'installations') {
          setInstallations(prev =>
            prev.map(item =>
              item._id === id ? { ...item, installationDate: newDate } : item
            )
          );
        }
        setShowRescheduleModal(false);
        setItemToReschedule({ type: '', id: '' });
        setNewDate('');
      }
    } catch (error) {
      console.error('Error rescheduling:', error);
      setError('Failed to reschedule. Please try again.');
    }
  };

  const handleDeleteConfirmation = (type, id) => {
    setItemToDelete({ type, id });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const { type, id } = itemToDelete;

      const response = await axios.delete(`http://localhost:3000/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        if (type === 'consultations') {
          setConsultations(prev => prev.filter(item => item._id !== id));
        } else if (type === 'installations') {
          setInstallations(prev => prev.filter(item => item._id !== id));
        }
        setShowConfirmModal(false);
        setItemToDelete({ type: '', id: '' });
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setError('Failed to delete. Please try again.');
    }
  };

  const energyUsageGraphData = {
    labels: energyUsage.map((usage) => formatDate(usage.createdAt)),
    datasets: [
      {
        label: 'Energy Usage Per Day (kWh)',
        data: energyUsage.map((usage) => usage.energyUsage?.perDay || 0),
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="carbon-footprint-container">
      <MainNavigation />

      <main className="carbon-main">
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="text-center text-lg-start">
                <h1 className="display-3 fw-bold mb-3">Welcome</h1>
                <h1 className="display-3 fw-bold mb-3">{localPart} to your account overview</h1>
              </Col>
              <Col lg={6} className="text-center">
                <FaUserCircle className="display-1 pulse-animation" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="account-section">
          <Container>
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <Row className="gx-4 gy-4">
              <Col md={6} className="d-flex">
                <Card className="account-card flex-grow-1">
                  <Card.Body className="p-4 d-flex flex-column">
                    <h3 className="mb-3 text-center">
                      <FaUserCircle className="icon" /> Account Overview
                    </h3>
                    <Card.Text className="flex-grow-1">
                      This is your account dashboard where you can view and manage your personal information, track your carbon footprint, and explore ways to reduce your environmental impact.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} className="d-flex">
                <Card className="account-card flex-grow-1">
                  <Card.Body className="p-4 d-flex flex-column">
                    <h3 className="mb-3 text-center">
                      <FaInfoCircle className="icon" /> Personal Information
                    </h3>
                    <div className="flex-grow-1">
                      <Card.Text><strong>First Name:</strong> {userInfo.fname || 'N/A'}</Card.Text>
                      <Card.Text><strong>Surname:</strong> {userInfo.sname || 'N/A'}</Card.Text>
                      <Card.Text><strong>Email:</strong> {userInfo.email || 'N/A'}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="gx-4 mt-4">
              <Col md={6}>
                <Card className="account-card w-100">
                  <Card.Body>
                    <h3 className="mb-3 text-center">
                      <FaCalendarAlt className="icon" /> Consultations
                    </h3>
                    <Row>
                      {consultations.length > 0 ? (
                        consultations.map((consultation) => (
                          <Col xs={12} key={consultation._id}>
                            <Card className="mb-3 w-100">
                              <Card.Body>
                                <p><strong>ID:</strong> {consultation._id}</p>
                                <p><strong>Name:</strong> {consultation.name || 'N/A'}</p>
                                <p><strong>Email:</strong> {consultation.email || 'N/A'}</p>
                                <p><strong>Phone Number:</strong> {consultation.phoneNumber || 'N/A'}</p>
                                <p><strong>Address:</strong> {consultation.address || 'N/A'}</p>
                                <p><strong>Consultation Date:</strong> {consultation.consultationDate ? formatDate(consultation.consultationDate) : 'N/A'}</p>
                                <p><strong>Additional Notes:</strong> {consultation.notes || 'N/A'}</p>
                                <p><strong>Status:</strong> {consultation.status || 'N/A'}</p>
                                <p><strong>Date Created:</strong> {formatDate(consultation.createdAt)}</p>
                                <p><strong>Time Created:</strong> {formatTime(consultation.createdAt)}</p>
                                <Button
                                  variant="dark"
                                  size="sm"
                                  onClick={() => handleReschedule('consultations', consultation._id)}
                                >
                                  Reschedule
                                </Button>{' '}
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirmation('consultations', consultation._id)}
                                >
                                  Delete
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <div className="text-center">
                          <p>No consultations booked.</p>
                          <Button variant="dark" onClick={() => navigate('/bookings/consultations')}>
                            Book a Consultation
                          </Button>
                        </div>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="account-card w-100">
                  <Card.Body>
                    <h3 className="mb-3 text-center">
                      <FaCalendarAlt className="icon" /> Installations
                    </h3>
                    <Row>
                      {installations.length > 0 ? (
                        installations.map((installation) => (
                          <Col xs={12} key={installation._id}>
                            <Card className="mb-3 w-100">
                              <Card.Body>
                                <p><strong>ID:</strong> {installation._id}</p>
                                <p><strong>Name:</strong> {installation.name || 'N/A'}</p>
                                <p><strong>Email:</strong> {installation.email || 'N/A'}</p>
                                <p><strong>Phone Number:</strong> {installation.phoneNumber || 'N/A'}</p>
                                <p><strong>Address:</strong> {installation.address || 'N/A'}</p>
                                <p><strong>Installation Date:</strong> {installation.installationDate || 'N/A'}</p>
                                <p><strong>Additional Notes:</strong> {installation.notes || 'N/A'}</p>
                                <p><strong>Status:</strong> {installation.status || 'N/A'}</p>
                                <p><strong>Date Created:</strong> {formatDate(installation.createdAt)}</p>
                                <p><strong>Time Created:</strong> {formatTime(installation.createdAt)}</p>
                                <Button
                                  variant="dark"
                                  size="sm"
                                  onClick={() => handleReschedule('installations', installation._id)}
                                >
                                  Reschedule
                                </Button>{' '}
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirmation('installations', installation._id)}
                                >
                                  Delete
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <div className="text-center">
                          <p>No installations booked.</p>
                          <Button variant="dark" onClick={() => navigate('/bookings/installations')}>
                            Book an Installation
                          </Button>
                        </div>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="gx-4 mt-4">
              <Col md={12}>
                <Card className="account-card w-100">
                  <Card.Body>
                    <h3 className="mb-3 text-center">
                      <FaChartBar className="icon" /> Energy Usage
                    </h3>
                    {energyUsage.length > 0 ? (
                      <>
                        <Row>
                          <Col md={6}>
                            <p><strong>Watts Per Day:</strong> {energyUsage[0].wattsPerDay || 'N/A'}</p>
                            <p><strong>Hours Per Day:</strong> {energyUsage[0].hoursPerDay || 'N/A'}</p>
                            <p><strong>Days Per Month:</strong> {energyUsage[0].daysPerMonth || 'N/A'}</p>
                            <p><strong>Cost Per kWh:</strong> {energyUsage[0].costPerKWh || 'N/A'}</p>
                          </Col>
                          <Col md={6}>
                            <p><strong>Energy Usage Per Day:</strong> {energyUsage[0].energyUsage.perDay || 'N/A'} kWh</p>
                            <p><strong>Energy Usage Per Month:</strong> {energyUsage[0].energyUsage.perMonth || 'N/A'} kWh</p>
                            <p><strong>Energy Usage Per Year:</strong> {energyUsage[0].energyUsage.perYear || 'N/A'} kWh</p>
                            <p><strong>Cost Per Day:</strong> ${energyUsage[0].cost.perDay || 'N/A'}</p>
                            <p><strong>Cost Per Month:</strong> ${energyUsage[0].cost.perMonth || 'N/A'}</p>
                            <p><strong>Cost Per Year:</strong> ${energyUsage[0].cost.perYear || 'N/A'}</p>
                            <p><strong>Date Created:</strong> {formatDate(energyUsage[0].createdAt)}</p>
                            <p><strong>Time Created:</strong> {formatTime(energyUsage[0].createdAt)}</p>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <Line data={energyUsageGraphData} />
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p>No energy usage data available.</p>
                        <Button variant="dark" onClick={() => navigate('/energy-usage/calculator')}>
                          Measure your Energy Usage
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {itemToDelete?.type === 'consultations' ? 'consultation' : 'installation'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newDate">
              <Form.Label>Select a new date</Form.Label>
              <Form.Control
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowRescheduleModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={confirmReschedule}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <MainFooter />
    </div>
  );
};

export default AccountPage;