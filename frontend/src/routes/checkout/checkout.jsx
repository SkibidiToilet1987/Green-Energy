import { Card, Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import '../../assets/checkout.css';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    street: '',
    city: '',
    contactInfo: '',
    cardNumber: '',
    accountNumber: '',
    ccv: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Validates a 10-digit phone number
    return phoneRegex.test(phone);
  };

  const validateCardNumber = (cardNumber) => {
    const cardRegex = /^\d{16}$/; // Validates a 16-digit credit card number
    return cardRegex.test(cardNumber);
  };

  const validateCCV = (ccv) => {
    const ccvRegex = /^\d{3}$/; // Validates a 3-digit CCV
    return ccvRegex.test(ccv);
  };

  const validateRequiredFields = (data) => {
    const errors = {};

    if (!data.firstName.trim()) errors.firstName = "First name is required.";
    if (!data.lastName.trim()) errors.lastName = "Last name is required.";
    if (!data.address.trim()) errors.address = "Address is required.";
    if (!data.street.trim()) errors.street = "Street is required.";
    if (!data.city.trim()) errors.city = "City is required.";
    if (!data.contactInfo.trim() || !validatePhone(data.contactInfo)) errors.contactInfo = "Valid contact information is required.";
    if (!data.cardNumber.trim() || !validateCardNumber(data.cardNumber)) errors.cardNumber = "Valid card number is required.";
    if (!data.accountNumber.trim()) errors.accountNumber = "Account number is required.";
    if (!data.ccv.trim() || !validateCCV(data.ccv)) errors.ccv = "Valid CCV is required.";

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setValidationErrors({});

    // Perform validation
    const errors = validateRequiredFields(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    // Proceed with the API request
    axios
      .post('http://localhost:3000/checkout', formData)
      .then((response) => {
        // Handle successful checkout (e.g., redirect to confirmation page)
      })
      .catch((error) => {
        setValidationErrors({ apiError: "An error occurred during checkout." });
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <MainNavigation />
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-50 justify-content-center">
          <Col md={10} style={{ paddingTop: "40px" }}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fs-2 text-center"><strong>Checkout</strong></Card.Title>
                <Form onSubmit={handleSubmit}>
                  {/* First Name */}
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.firstName}
                    />
                    {validationErrors.firstName && <Form.Text className="text-danger">{validationErrors.firstName}</Form.Text>}
                  </Form.Group>

                  {/* Last Name */}
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.lastName}
                    />
                    {validationErrors.lastName && <Form.Text className="text-danger">{validationErrors.lastName}</Form.Text>}
                  </Form.Group>

                  {/* Address */}
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.address}
                    />
                    {validationErrors.address && <Form.Text className="text-danger">{validationErrors.address}</Form.Text>}
                  </Form.Group>

                  {/* Street */}
                  <Form.Group className="mb-3" controlId="formStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.street}
                    />
                    {validationErrors.street && <Form.Text className="text-danger">{validationErrors.street}</Form.Text>}
                  </Form.Group>

                  {/* City */}
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.city}
                    />
                    {validationErrors.city && <Form.Text className="text-danger">{validationErrors.city}</Form.Text>}
                  </Form.Group>

                  {/* Contact Info */}
                  <Form.Group className="mb-3" controlId="formContactInfo">
                    <Form.Label>Contact Information (Phone Number)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.contactInfo}
                    />
                    {validationErrors.contactInfo && <Form.Text className="text-danger">{validationErrors.contactInfo}</Form.Text>}
                  </Form.Group>

                  {/* Card Number */}
                  <Form.Group className="mb-3" controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.cardNumber}
                    />
                    {validationErrors.cardNumber && <Form.Text className="text-danger">{validationErrors.cardNumber}</Form.Text>}
                  </Form.Group>

                  {/* Account Number */}
                  <Form.Group className="mb-3" controlId="formAccountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.accountNumber}
                    />
                    {validationErrors.accountNumber && <Form.Text className="text-danger">{validationErrors.accountNumber}</Form.Text>}
                  </Form.Group>

                  {/* CCV */}
                  <Form.Group className="mb-3" controlId="formCCV">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter CCV"
                      name="ccv"
                      value={formData.ccv}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.ccv}
                    />
                    {validationErrors.ccv && <Form.Text className="text-danger">{validationErrors.ccv}</Form.Text>}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button style={{ width: "100%" }} variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form>

                {/* API Error Message */}
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
};

export default Checkout;
