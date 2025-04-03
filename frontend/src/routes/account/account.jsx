import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Nav, Button, Table, Form, Alert } from 'react-bootstrap';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { useNavigate } from 'react-router-dom';
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
        
        // Fetch all account data
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3000/users/change-password',
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSuccess('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3000/users/change-email',
        {
          newEmail: emailForm.newEmail,
          currentPassword: emailForm.currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSuccess('Email changed successfully. Please log in again.');
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change email');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const energyChartData = {
    labels: energyData.map((data) => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Electricity Usage (kWh)',
        data: energyData.map((data) => data.electricityKwh),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Gas Usage (therms)',
        data: energyData.map((data) => data.gasTherm),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

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
      <div style={{ flex: 1, paddingTop: '30px', paddingBottom: '30px' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="shadow mb-4">
                <Card.Body>
                  <Card.Title className="fs-2 text-center mb-4">
                    <strong>My Account</strong>
                  </Card.Title>
                  
                  <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Row>
                      <Col md={3}>
                        <Card className="shadow-sm">
                          <Card.Body className="p-0">
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                <Nav.Link eventKey="consultations">Consultations</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="installations">Installations</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="messages">Messages</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="carbon">Carbon Footprint</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="energy">Energy Usage</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="security">Account Security</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={9}>
                        <Tab.Content>
                          {/* Consultations Tab */}
                          <Tab.Pane eventKey="consultations">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Consultation Bookings</h5>
                              </Card.Header>
                              <Card.Body>
                                {consultations.length > 0 ? (
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {consultations.map((consultation) => (
                                        <tr key={consultation._id}>
                                          <td>{new Date(consultation.date).toLocaleDateString()}</td>
                                          <td>{consultation.time}</td>
                                          <td>{consultation.consultationType}</td>
                                          <td>
                                            <span className={`badge ${
                                              consultation.status === 'completed' ? 'bg-success' :
                                              consultation.status === 'pending' ? 'bg-warning' : 'bg-secondary'
                                            }`}>
                                              {consultation.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : (
                                  <p>No consultation bookings found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Installations Tab */}
                          <Tab.Pane eventKey="installations">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Installation Bookings</h5>
                              </Card.Header>
                              <Card.Body>
                                {installations.length > 0 ? (
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>System Type</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {installations.map((installation) => (
                                        <tr key={installation._id}>
                                          <td>{new Date(installation.date).toLocaleDateString()}</td>
                                          <td>{installation.systemType}</td>
                                          <td>{installation.address}</td>
                                          <td>
                                            <span className={`badge ${
                                              installation.status === 'completed' ? 'bg-success' :
                                              installation.status === 'pending' ? 'bg-warning' : 'bg-secondary'
                                            }`}>
                                              {installation.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : (
                                  <p>No installation bookings found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Messages Tab */}
                          <Tab.Pane eventKey="messages">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Contact Messages</h5>
                              </Card.Header>
                              <Card.Body>
                                {messages.length > 0 ? (
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {messages.map((message) => (
                                        <tr key={message._id}>
                                          <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                                          <td>{message.subject}</td>
                                          <td>{message.message.substring(0, 50)}...</td>
                                          <td>
                                            <span className={`badge ${
                                              message.status === 'responded' ? 'bg-success' : 'bg-warning'
                                            }`}>
                                              {message.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : (
                                  <p>No messages found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Carbon Footprint Tab */}
                          <Tab.Pane eventKey="carbon">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Carbon Footprint Calculations</h5>
                              </Card.Header>
                              <Card.Body>
                                {carbonData.length > 0 ? (
                                  <>
                                    <Table striped bordered hover className="mb-4">
                                      <thead>
                                        <tr>
                                          <th>Date</th>
                                          <th>Transportation (kg CO₂e)</th>
                                          <th>Home Energy (kg CO₂e)</th>
                                          <th>Total (kg CO₂e)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {carbonData.map((data) => (
                                          <tr key={data._id}>
                                            <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                                            <td>{data.transportationEmissions}</td>
                                            <td>{data.homeEmissions}</td>
                                            <td>{data.totalEmissions}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </>
                                ) : (
                                  <p>No carbon footprint calculations found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Energy Usage Tab */}
                          <Tab.Pane eventKey="energy">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Energy Usage</h5>
                              </Card.Header>
                              <Card.Body>
                                {energyData.length > 0 ? (
                                  <>
                                    <div style={{ height: '300px', marginBottom: '20px' }}>
                                      <Line data={energyChartData} options={{ responsive: true }} />
                                    </div>
                                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Date</th>
                                          <th>Electricity (kWh)</th>
                                          <th>Gas (therms)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {energyData.map((data) => (
                                          <tr key={data._id}>
                                            <td>{new Date(data.date).toLocaleDateString()}</td>
                                            <td>{data.electricityKwh}</td>
                                            <td>{data.gasTherm}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </>
                                ) : (
                                  <p>No energy usage data found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Products Tab */}
                          <Tab.Pane eventKey="products">
                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Purchased Products</h5>
                              </Card.Header>
                              <Card.Body>
                                {products.length > 0 ? (
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Order Date</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {products.map((product) => (
                                        <tr key={product._id}>
                                          <td>{new Date(product.orderDate).toLocaleDateString()}</td>
                                          <td>{product.productName}</td>
                                          <td>{product.quantity}</td>
                                          <td>${product.price.toFixed(2)}</td>
                                          <td>
                                            <span className={`badge ${
                                              product.status === 'delivered' ? 'bg-success' :
                                              product.status === 'shipped' ? 'bg-info' :
                                              product.status === 'processing' ? 'bg-warning' : 'bg-secondary'
                                            }`}>
                                              {product.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : (
                                  <p>No purchased products found</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>

                          {/* Account Security Tab */}
                          <Tab.Pane eventKey="security">
                            <Card className="shadow-sm mb-4">
                              <Card.Header className="bg-dark text-white">
                                <h5>Change Password</h5>
                              </Card.Header>
                              <Card.Body>
                                <Form onSubmit={handlePasswordChange}>
                                  {error && <Alert variant="danger">{error}</Alert>}
                                  {success && <Alert variant="success">{success}</Alert>}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                      type="password"
                                      value={passwordForm.currentPassword}
                                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                      type="password"
                                      value={passwordForm.newPassword}
                                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                      type="password"
                                      value={passwordForm.confirmPassword}
                                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                      required
                                    />
                                  </Form.Group>
                                  <Button variant="dark" type="submit">
                                    Change Password
                                  </Button>
                                </Form>
                              </Card.Body>
                            </Card>

                            <Card className="shadow-sm mb-4">
                              <Card.Header className="bg-dark text-white">
                                <h5>Change Email</h5>
                              </Card.Header>
                              <Card.Body>
                                <Form onSubmit={handleEmailChange}>
                                  {error && <Alert variant="danger">{error}</Alert>}
                                  {success && <Alert variant="success">{success}</Alert>}
                                  <Form.Group className="mb-3">
                                    <Form.Label>New Email</Form.Label>
                                    <Form.Control
                                      type="email"
                                      value={emailForm.newEmail}
                                      onChange={(e) => setEmailForm({...emailForm, newEmail: e.target.value})}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                      type="password"
                                      value={emailForm.currentPassword}
                                      onChange={(e) => setEmailForm({...emailForm, currentPassword: e.target.value})}
                                      required
                                    />
                                  </Form.Group>
                                  <Button variant="dark" type="submit">
                                    Change Email
                                  </Button>
                                </Form>
                              </Card.Body>
                            </Card>

                            <Card className="shadow-sm">
                              <Card.Header className="bg-dark text-white">
                                <h5>Logout</h5>
                              </Card.Header>
                              <Card.Body>
                                <p>You are currently logged in as {userData?.email}</p>
                                <Button variant="danger" onClick={handleLogout}>
                                  Logout
                                </Button>
                              </Card.Body>
                            </Card>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <MainFooter />
    </div>
  );
};

export default AccountPage;