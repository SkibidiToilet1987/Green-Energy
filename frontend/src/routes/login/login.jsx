import { Card, Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import { Link } from 'react-router-dom';  // Import Link for navigation
import '../../assets/login.css';

export default function Login() {
    const [, setCookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(false); // Controls loading state
    const [validationErrors, setValidationErrors] = useState({}); // Stores validation errors
    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle form submission
    const SubmitLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        setValidationErrors({}); // Clear previous validation errors

        const email = event.target[0].value;
        const password = event.target[1].value;
        const remember = event.target[2].checked;

        // Validate inputs
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

        // If there are validation errors, stop submission
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // Make API request
            const res = await axios.post('http://localhost:3000/auth', {
                email,
                password,
                remember,
            });

            // Handle successful login
            if (res.data.token) {
                setCookies('token', res.data.token, { path: '/' });
                navigate('/'); // Redirect to home page
            } else {
                setValidationErrors({ api: "Login failed. Please check your credentials and try again." });
            }
        } catch (error) {
            // Handle API errors
            if (error.response) {
                if (error.response.status === 401) { // Assuming 401 for invalid credentials
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
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <>
            <MainNavigation />
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-50 justify-content-center">
                    <Col md={10} style={{ paddingTop: "40px" }}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="fs-2 text-center"><strong>Login</strong></Card.Title>
                                <Form onSubmit={SubmitLogin}>
                                    {/* Email Field */}
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            isInvalid={!!validationErrors.email}
                                            className={validationErrors.email ? 'error-background' : ''} // Add light red background
                                        />
                                        {/* Error Message for Email */}
                                        {validationErrors.email && (
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {validationErrors.email}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    {/* Password Field */}
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            isInvalid={!!validationErrors.password}
                                            className={validationErrors.password ? 'error-background' : ''} // Add light red background
                                        />
                                        {/* Error Message for Password */}
                                        {validationErrors.password && (
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {validationErrors.password}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    {/* Remember Me Checkbox */}
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                    </Form.Group>

                                    {/* API Error Message (Inline) */}
                                    {validationErrors.api && (
                                        <div className="text-danger mb-3">
                                            {validationErrors.api}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        style={{ width: "100%" }}
                                        variant="primary"
                                        type="submit"
                                        disabled={isLoading} // Disable button while loading
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
                                            "Submit"
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
