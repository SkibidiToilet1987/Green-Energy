import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/footer.css';


const MainFooter = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 mt-5">
            <Container>
                <Row>
                    {/* Links Section */}
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <Nav className="flex-column">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/register" className="text-light">Register</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/about" className="text-light">About Us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/carbon-footprint" className="text-light">Carbon Footprint</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/energy-usage" className="text-light">Energy Usage</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/green-products" className="text-light">Green Products</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {/* About Green Energy */}
                    <Col md={4}>
                        <h5>Why We Love Green Energy</h5>
                        <p>
                            Green energy is vital for a sustainable future. It reduces greenhouse gas emissions,
                            conserves natural resources, and helps combat climate change. By embracing renewable
                            energy sources like solar and wind, we can create a cleaner, healthier planet for future generations.
                        </p>
                    </Col>

                    {/* Logo and Company Name */}
                    <Col md={4} className="text-center">
                        <img src="https://www.pngplay.com/wp-content/uploads/6/Energy-Logo-PNG-Clipart-Background.png" alt="Logo" width="100" height="100" />
                        <h5 className="mt-3">Rolsa Technologies</h5>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <Row className="text-center mt-4">
                    <Col>
                        <p className="text-light mb-0">&copy; {new Date().getFullYear()} Green Energy Co. | All Rights Reserved</p>
                        <Button variant="outline-light" href="#top" className="mt-2">Back to Top</Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default MainFooter;