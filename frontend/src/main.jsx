import React, { useState, useEffect } from 'react';
import { 
  FaUserCircle, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaLeaf, 
  FaChartLine, 
  FaShoppingBag, 
  FaLock,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaTools,
  FaArrowRight
} from 'react-icons/fa';
import { Container, Row, Col, Card, Tab, Nav, Button, Table, Form, Alert } from 'react-bootstrap';
import MainNavigation from './components/mainnavigation';
import MainFooter from './components/MainFooter';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('consultations');
  const [userData, setUserData] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [carbonData, setCarbonData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [products, setProducts] = useState([]);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    currentPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUserData(response.data);
        fetchAccountData(response.data.email);
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    const fetchAccountData = async (email) => {
      try {
        const token = localStorage.getItem('token');
        const userId = email.split('@')[0];
        
        const [
          consultationsRes,
          installationsRes,
          messagesRes,
          carbonRes,
          energyRes,
          productsRes,
        ] = await Promise.all([
          axios.get(`http://localhost:3000/consultations/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/installations/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/contactForms/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/carbonCalculator/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/energyUsage/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/orders/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setConsultations(consultationsRes.data);
        setInstallations(installationsRes.data);
        setMessages(messagesRes.data);
        setCarbonData(carbonRes.data);
        setEnergyData(energyRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error('Error fetching account data:', err);
        setError('Failed to load account data');
      }
    };

    fetchUserData();
  }, [navigate]);

  // ... (keep all the existing handler functions unchanged)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MainNavigation />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        minHeight: '400px', 
        marginBottom: 0, 
        paddingBottom: '80px',
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container className="h-100">
          <Row className="align-items-center h-100">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-3">
                Welcome {userData?.email.split('@')[0]} to your
              </h1>
              <h1 className="display-3 fw-bold mb-4">Account Dashboard</h1>
              <p className="lead mb-4">
                Manage your consultations, installations, energy usage, and more in one place.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Button 
                  variant="dark" 
                  size="lg" 
                  as={Link} 
                  to="/consultation"
                  className="d-flex align-items-center"
                >
                  Book New Consultation <FaArrowRight className="ms-2" />
                </Button>
                <Button 
                  variant="outline-dark" 
                  size="lg" 
                  as={Link} 
                  to="/products"
                  className="d-flex align-items-center"
                >
                  Browse Products <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                backgroundColor: '#e9ecef',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '5px solid #212529'
              }}>
                <FaUserCircle style={{ fontSize: '200px', color: '#212529' }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content Section */}
      <div style={{ flex: 1, paddingTop: '30px', paddingBottom: '30px' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Row>
                  <Col md={3}>
                    <Card className="shadow-sm">
                      <Card.Body className="p-0">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="consultations" className="d-flex align-items-center">
                              <FaCalendarAlt className="me-2" /> Consultations
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="installations" className="d-flex align-items-center">
                              <FaTools className="me-2" /> Installations
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="messages" className="d-flex align-items-center">
                              <FaEnvelope className="me-2" /> Messages
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="carbon" className="d-flex align-items-center">
                              <FaLeaf className="me-2" /> Carbon Footprint
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="energy" className="d-flex align-items-center">
                              <FaChartLine className="me-2" /> Energy Usage
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="products" className="d-flex align-items-center">
                              <FaShoppingBag className="me-2" /> Products
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="security" className="d-flex align-items-center">
                              <FaLock className="me-2" /> Account Security
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={9}>
                    {/* ... (keep all the existing tab content sections unchanged) ... */}
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
      
      <MainFooter />
    </div>
  );
};

export default AccountPage;