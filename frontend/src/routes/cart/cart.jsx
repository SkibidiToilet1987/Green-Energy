import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import { Button, Container, Modal, Row, Col, Image, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Confirm removal modal handler
  const handleRemoveConfirmation = (product) => {
    setItemToRemove(product);
    setShowConfirmModal(true);
  };

  // Confirm remove action
  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove._id); // Call the remove function from CartContext
      setShowConfirmModal(false);
      setItemToRemove(null);
    }
  };

  // Update quantity
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(productId, newQuantity); // Call the update function from CartContext
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const checkoutData = {
      cartItems: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
    };

    // Save cart data to the backend
    axios
      .post('http://localhost:3000/shoppingcart', checkoutData)
      .then((response) => {
        console.log('Shopping cart data saved successfully:', response.data);

        // Redirect to the checkout page
        navigate('/checkout');
      })
      .catch((error) => {
        console.error('Error saving shopping cart data:', error);
      });
  };

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
                      <h1 className="fw-bold mb-0">Shopping Cart</h1>
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
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <Button
                            variant="link"
                            className="px-2 text-dark text-decoration-none"
                            onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            min={1}
                            value={product.quantity}
                            type="number"
                            className="form-control form-control-sm mx-2"
                            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                          />
                          <Button
                            variant="link"
                            className="px-2 text-dark text-decoration-none"
                            onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 className="mb-0 text-dark">£{(product.price * product.quantity).toFixed(2)}</h6>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <Button
                            variant="link"
                            className="text-dark text-decoration-none"
                            onClick={() => handleRemoveConfirmation(product)}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                    <hr className="my-4" />
                    <div className="pt-5">
                      <h6 className="mb-0">
                        <a href="/products" className="text-dark text-decoration-none">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
                        </a>
                      </h6>
                    </div>
                  </Col>
                  <Col lg={4} className="bg-light p-5">
                    <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="text-uppercase">Items {cart.length}</h5>
                      <h5>£{totalPrice.toFixed(2)}</h5>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-5">
                      <h5 className="text-uppercase">Total price</h5>
                      <h5>£{totalPrice.toFixed(2)}</h5>
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
      <MainFooter />
    </section>
  );
};

export default Cart;