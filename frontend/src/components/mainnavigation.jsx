import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const MainNavigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Rolsa Technologies Logo"
            src="https://www.pngplay.com/wp-content/uploads/6/Energy-Logo-PNG-Clipart-Background.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <strong className="ms-2">Rolsa Technologies</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="fs-5 text-white" href="/login">
              <Button variant="outline-light" className="me-2">
                <strong>Login</strong>
              </Button>
            </Nav.Link>
            <Nav.Link className="fs-5 text-white" href="/register">
              <Button variant="outline-light" className="me-2">
                <strong>Register</strong>
              </Button>
            </Nav.Link>
            <Nav.Link className="fs-5 text-white" href="/products">
              <Button variant="outline-light">
                <strong>Products</strong>
              </Button>
            </Nav.Link>
            <Nav.Link className="fs-5 text-white" href="/about-us">
              <Button variant="outline-light">
                <strong>About Us</strong>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;