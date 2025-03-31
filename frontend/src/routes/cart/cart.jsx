import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/userContext';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { Button, Container, Modal, Row, Col, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const userContext = useContext(UserContext);
  const user = userContext?.user || {};
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.2;
  const totalPrice = subtotal + vat;

  const handleRemoveConfirmation = (product) => {
    setItemToRemove(product);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove._id);
      setShowConfirmModal(false);
      setItemToRemove(null);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      console.error('Cart is empty. Cannot proceed to checkout.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Retrieved token:", token);

      if (!token) {
        console.error('No token found. Redirecting to login...');
        navigate('/login', { state: { from: '/cart' } });
        return;
      }

      console.log("Sending request to /users/me to verify token...");

      const verifyResponse = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Response from /users/me:", verifyResponse.data);

      if (verifyResponse.status === 200) {
        const email = verifyResponse.data.email;
        const userId = email.split('@')[0];


        const checkoutData = {
          userId,
          email,
          cartItems: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            description: item.description,
          })),
        };

        console.log("Sending checkout data to backend:", checkoutData);

        const response = await axios.post('http://localhost:3000/shoppingcart', checkoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('Shopping cart data saved successfully:', response.data);
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error during token verification or checkout:', error);

      if (error.response && error.response.status === 401) {
        console.log("Unauthorized. Redirecting to login...");
        navigate('/login', { state: { from: '/cart' } });
      } else if (error.response && error.response.status === 403) {
        console.log("Redirecting to login due to invalid token");
        navigate('/login', { state: { from: '/cart' } });
      } else if (error.response && error.response.status === 404) {
        console.log("User not found. Redirecting to login.");
        navigate('/login', { state: { from: '/cart' } });
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <section className="h-100 h-custom" style={{ backgroundColor: '#ffffff' }}>
        <MainNavigation />
        <Container className="py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <Card className="card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                <Card.Body className="p-5">
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <h3 className="mb-4">Your Cart is Empty</h3>
                    <p className="text-muted mb-4 text-center">
                      Browse our selection of eco-friendly products that help reduce your carbon footprint.
                    </p>
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={() => navigate('/products')}
                    >
                      Browse Products
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
        <MainFooter />
      </section>
    );
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#ffffff' }}>
      <MainNavigation />
      <Container className="py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <Card className="card-registration card-registration-2" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col lg={8} className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h1 className="fw-bold mb-0 text-dark">Shopping Cart</h1>
                      <h6 className="mb-0 text-muted">{cart.length} items</h6>
                    </div>
                    <hr className="my-4" />

                    {cart.map((product) => (
                      <div key={product._id} className="row mb-4 d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <Image
                            src={product.image || 'https://via.placeholder.com/300x200'}
                            className="img-fluid rounded-3"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <h6 className="mb-0">{product.name}</h6>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center justify-content-between">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2">{product.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 className="mb-0 text-dark">£{(product.price * product.quantity).toFixed(2)}</h6>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <span
                            className="text-dark"
                            style={{ cursor: 'pointer', fontSize: '1rem' }}
                            onClick={() => handleRemoveConfirmation(product)}
                          >
                            X
                          </span>
                        </div>
                      </div>
                    ))}
                    <hr className="my-4" />
                    <div className="pt-5">
                      <h6 className="mb-0">
                        <a href="/products" className="text-dark text-decoration-none d-flex align-items-center">
                          <FaArrowLeft className="me-2" /> <span>Continue Shopping</span>
                        </a>
                      </h6>
                    </div>
                  </Col>
                  <Col lg={4} className="bg-light p-5">
                    <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-4">
                      <h6 className="text-uppercase">Subtotal</h6>
                      <h6>£{subtotal.toFixed(2)}</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <h6 className="text-uppercase">VAT (20%)</h6>
                      <h6>£{vat.toFixed(2)}</h6>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-5">
                      <h6 className="text-uppercase">Total</h6>
                      <h6>£{totalPrice.toFixed(2)}</h6>
                    </div>
                    <Button variant="dark" onClick={handleCheckout} className="btn-lg w-100">
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {itemToRemove?.name} from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <MainFooter />
    </section>
  );
};

export default Cart;