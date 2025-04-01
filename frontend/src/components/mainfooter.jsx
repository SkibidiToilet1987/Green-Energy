import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/footer.css';

const MainFooter = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 mt-5">
            <Container>
                <Row className="text-center">
                    <Col>
                        <img 
                            src="https://www.pngplay.com/wp-content/uploads/6/Energy-Logo-PNG-Clipart-Background.png" 
                            alt="Logo" 
                            width="50" 
                            height="50" 
                            className="logo-img"
                        />
                        <h5 className="mt-3">Rolsa Technologies</h5>
                    </Col>
                </Row>

                <Row className="text-center mt-3">
                    <Col>
                        <Nav className="justify-content-center">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/products" className="text-light">Browse our products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/energy-usage" className="text-light">Find your energy usage</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/carbon-footprint" className="text-light">Learn to reduce carbon footprint</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/bookings" className="text-light">Learn more about consultations & installations </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>

                <Row className="text-center mt-4">
                    <Col>
                        <p className="text-light mb-0">&copy; {new Date().getFullYear()} Rolsa Technologies Co. | All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default MainFooter;
