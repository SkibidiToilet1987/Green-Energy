import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  // State variables to manage user data, consultations, installations, and UI modals
  const [localPart, setLocalPart] = useState(''); // Stores the local part of the user's email
  const [userInfo, setUserInfo] = useState({ fname: '', sname: '', email: '', _id: '' }); // Stores user info
  const [consultations, setConsultations] = useState([]); // Stores consultations data
  const [installations, setInstallations] = useState([]); // Stores installations data
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Controls the delete confirmation modal
  const [showRescheduleModal, setShowRescheduleModal] = useState(false); // Controls the reschedule modal
  const [itemToDelete, setItemToDelete] = useState({ type: '', id: '' }); // Stores the item to delete
  const [itemToReschedule, setItemToReschedule] = useState({ type: '', id: '' }); // Stores the item to reschedule
  const [newDate, setNewDate] = useState(''); // Stores the new date for rescheduling
  const [error, setError] = useState(null); // Stores error messages
  const navigate = useNavigate(); // Used for navigation

  // Fetch user data, consultations, and installations when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/account' } }); // Redirect to login if no token
          return;
        }

        // Fetch user info
        const userResponse = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const { email, fname, sname, _id } = userResponse.data;
        const localPartOfEmail = email.split('@')[0]; // Extract the local part of the email
        setLocalPart(localPartOfEmail);
        setUserInfo({ fname, sname, email, _id });

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
      } catch (error) {
        if (error.response && error.response.status === 401) {
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

  // Helper functions to format date and time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle rescheduling of consultations or installations
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
        `http://localhost:3000/${type}/${id}/date`,
        { date: newDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (type === 'consultations') {
          setConsultations((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, consultationDate: newDate } : item
            )
          );
        } else if (type === 'installations') {
          setInstallations((prev) =>
            prev.map((item) =>
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

  // Handle deletion of consultations or installations
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
          setConsultations((prev) => prev.filter((item) => item._id !== id));
        } else if (type === 'installations') {
          setInstallations((prev) => prev.filter((item) => item._id !== id));
        }
        setShowConfirmModal(false);
        setItemToDelete({ type: '', id: '' });
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setError('Failed to delete. Please try again.');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
              {/* Account Overview Card */}
              <Col md={6} className="d-flex">
                <Card className="account-card flex-grow-1">
                  <Card.Body className="p-4 d-flex flex-column">
                    <h3 className="mb-3 text-center">
                      <FaUserCircle className="icon" /> Account Overview
                    </h3>
                    <Card.Text className="flex-grow-1">
                      This is your account dashboard where you can view and manage your personal information, track your carbon footprint, and explore ways to reduce your environmental impact.
                    </Card.Text>
                    <Button 
                      variant="danger" 
                      className="mt-3" 
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Personal Information Card */}
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

            {/* Consultations and Installations */}
            <Row className="gx-4 mt-4 mb-5">
              {/* Consultations */}
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
                                <p><strong>Additional Notes:</strong> {consultation.additionalNotes || 'No additional notes provided'}</p>
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

              {/* Installations */}
              <Col md={6}>
                <Card className="account-card w-100 mb-2">
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
                                <p><strong>Installation Date:</strong> {installation.installationDate ? formatDate(installation.installationDate) : 'N/A'}</p>
                                <p><strong>Additional Notes:</strong> {installation.additionalNotes || 'No additional notes provided'}</p>
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
          </Container>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
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

      {/* Reschedule Modal */}
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