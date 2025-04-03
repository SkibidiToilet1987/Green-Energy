import { Card, Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../../assets/login.css'; // Import the updated CSS file
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for the hero section and password visibility

export default function Login() {
    const [, setCookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const SubmitLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setValidationErrors({});

        const email = event.target[0].value;
        const password = event.target[1].value;
        const remember = event.target[2].checked;

        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required. Please enter your email address.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address (e.g., example@domain.com).";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required. Please enter your password.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/auth', {
                email,
                password,
                remember,
            });

            if (res.data.token) {
                setCookies('token', res.data.token, { path: '/' });

                localStorage.setItem('token', res.data.token);
                console.log("Token stored in localStorage:", res.data.token);

                clearCart();

                // Redirect to the home page
                navigate('/');
            } else {
                setValidationErrors({ api: "Login failed. Please check your credentials and try again." });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setValidationErrors({
                        api: (
                            <>
                                Invalid credentials. Try again or{' '}
                                <Link to="/register/">Register Here</Link>.
                            </>
                        )
                    });
                } else {
                    setValidationErrors({ api: error.response.data.message || "Invalid email or password. Please try again." });
                }
            } else {
                setValidationErrors({ api: "An error occurred. Please check your internet connection and try again." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MainNavigation />
            {/* Hero Section */}
            <section className="hero-section" style={{ minHeight: '350px' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-3 fw-bold mb-3">Sign in to</h1>
                            <h1 className="display-3 fw-bold mb-3">your account</h1>
                        </div>
                        <div className="col-lg-6 text-center">
                            <FaSignInAlt className="display-1 pulse-animation" />
                        </div>
                    </div>
                </div>
            </section>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-50 justify-content-center">
                    <Col md={10} style={{ paddingTop: "40px" }}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="fs-2 text-center"><strong>Login</strong></Card.Title>
                                <Form onSubmit={SubmitLogin}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            isInvalid={!!validationErrors.email}
                                            className={validationErrors.email ? 'error-background' : ''}
                                        />
                                        {validationErrors.email && (
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {validationErrors.email}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                isInvalid={!!validationErrors.password}
                                                className={validationErrors.password ? 'error-background' : ''}
                                            />
                                            {showPassword ? (
                                                <FaEyeSlash
                                                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-dark"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={togglePasswordVisibility}
                                                />
                                            ) : (
                                                <FaEye
                                                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-dark"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={togglePasswordVisibility}
                                                />
                                            )}
                                        </div>
                                        {validationErrors.password && (
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {validationErrors.password}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    {/* Forgotten Password Link */}
                                    <div className="mb-3">
                                        <Link to="/register" style={{ color: '#212529', textDecoration: 'none', fontWeight: 'bold' }}>
                                            Forgotten your password?
                                        </Link>
                                    </div>

                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                    </Form.Group>

                                    {validationErrors.api && (
                                        <div className="text-danger mb-3">
                                            {validationErrors.api}
                                        </div>
                                    )}

                                    <Button
                                        style={{ width: "100%" }}
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
                                            "Sign In"
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
}