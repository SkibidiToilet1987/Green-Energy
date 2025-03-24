import { Card, Col, Container, Row, Form, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/register.css';

export default function Register() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [strengthLabel, setStrengthLabel] = useState("");
    const [strengthColor, setStrengthColor] = useState("danger");
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    // Check password strength whenever password changes
    useEffect(() => {
        checkPasswordStrength(password);
    }, [password]);

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate password requirements
    const validatePassword = (password) => {
        const passwordErrors = [];

        if (password.length < 8) {
            passwordErrors.push("Password must be at least 8 characters long");
        }

        if (!/\d/.test(password)) {
            passwordErrors.push("Password must contain at least one number");
        }

        if (!/[a-z]/.test(password)) {
            passwordErrors.push("Password must contain at least one lowercase letter");
        }

        if (!/[A-Z]/.test(password)) {
            passwordErrors.push("Password must contain at least one uppercase letter");
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            passwordErrors.push("Password must contain at least one special character");
        }

        return passwordErrors;
    };

    const checkPasswordStrength = (password) => {
        // Start with a base score
        let strength = 0;

        // Skip strength check if password is empty or too short
        if (!password || password.length < 1) {
            setPasswordStrength(0);
            setStrengthLabel("");
            setStrengthColor("danger");
            return;
        }

        // Check length
        if (password.length >= 8) strength += 20;

        // Check for numbers
        if (/\d/.test(password)) strength += 20;

        // Check for lowercase letters
        if (/[a-z]/.test(password)) strength += 20;

        // Check for uppercase letters
        if (/[A-Z]/.test(password)) strength += 20;

        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;

        // Set the strength and appropriate label/color
        setPasswordStrength(strength);

        if (strength < 40) {
            setStrengthLabel("Weak");
            setStrengthColor("danger");
        } else if (strength < 60) {
            setStrengthLabel("Fair");
            setStrengthColor("warning");
        } else if (strength < 80) {
            setStrengthLabel("Good");
            setStrengthColor("info");
        } else {
            setStrengthLabel("Strong");
            setStrengthColor("success");
        }
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        const firstName = event.target[0].value;
        const lastName = event.target[1].value;

        // Validate empty fields
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";

        // Validate email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate password
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // If there are validation errors, show them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        // If validation passes, submit the form
        axios.post('http://localhost:3000/users', {
            email,
            password,
            fname: firstName,
            sname: lastName
        }).then(() => {
            navigate('/login');
        }).catch((error) => {
            setValidationErrors({ apiError: error.response?.data?.message || "An error occurred during registration" });
        });
    };

    return (
        <>
            <MainNavigation />
            <Container fluid="true" className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-50 justify-content-center">
                    <Col md={7} style={{ paddingTop: "40px" }}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="fs-2 text-center"><strong>Signup</strong></Card.Title>
                                <Form onSubmit={handleRegisterSubmit}>
                                    <Form.Group className='mb-3' controlId='formFirstName'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First Name"
                                            isInvalid={!!validationErrors.firstName}
                                        />
                                        {validationErrors.firstName && <Form.Text className="text-danger">{validationErrors.firstName}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Last Name"
                                            isInvalid={!!validationErrors.lastName}
                                        />
                                        {validationErrors.lastName && <Form.Text className="text-danger">{validationErrors.lastName}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={!!validationErrors.email}
                                        />
                                        {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            isInvalid={!!validationErrors.password}
                                        />
                                        {validationErrors.password && (
                                            <Form.Text className="text-danger">
                                                <ul className="ps-3 mb-0">
                                                    {validationErrors.password.map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </Form.Text>
                                        )}
                                        {password.length > 0 && (
                                            <div className="mt-2">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small>Password Strength:</small>
                                                    <small>{strengthLabel}</small>
                                                </div>
                                                <ProgressBar
                                                    now={passwordStrength}
                                                    variant={strengthColor}
                                                    style={{ height: '8px' }}
                                                />
                                                <div className="mt-1">
                                                    <small className="text-muted">
                                                        Password must be at least 8 characters long and contain uppercase, lowercase,
                                                        numbers, and special characters.
                                                    </small>
                                                </div>
                                            </div>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            isInvalid={!!validationErrors.confirmPassword}
                                        />
                                        {validationErrors.confirmPassword && <Form.Text className="text-danger">{validationErrors.confirmPassword}</Form.Text>}
                                    </Form.Group>

                                    <Button style={{ width: "100%" }} variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>

                                {validationErrors.apiError && (
                                    <div className="text-danger mt-3">{validationErrors.apiError}</div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <MainFooter />
        </>
    );
}