import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import { Card, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { FaTrash, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
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
      removeFromCart(itemToRemove._id);
      setShowConfirmModal(false);
      setItemToRemove(null);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const checkoutData = {
      cartItems: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        description: item.description,
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

        // Save cart data to localStorage for use in the checkout form
        localStorage.setItem('cartItems', JSON.stringify(checkoutData.cartItems));

        // Redirect to the checkout page
        navigate('/checkout');
      })
      .catch((error) => {
        console.error('Error saving shopping cart data:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <MainNavigation />

      <div style={{ flex: '1', padding: '20px' }}>
        <Container>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <h2 className="text-center mb-4">
                <FaShoppingCart className="me-2" /> Shopping Cart
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">Your cart is empty</p>
                  <Button href="/products" variant="dark" className="btn-rounded">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <Row className="g-4 mb-4">
                    {cart.map((product) => (
                      <Col md={6} lg={4} key={product._id}>
                        <Card className="product-card h-100 hover-shadow">
                          <Card.Img
                            variant="top"
                            src={product.image || 'https://via.placeholder.com/300x200'}
                            className="product-image"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <Card.Text className="text-muted mb-0">
                                £{product.price.toFixed(2)} × {product.quantity}
                              </Card.Text>
                              <div className="d-flex align-items-center">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => updateQuantity(product._id, 'decrement')}
                                >
                                  -
                                </Button>
                                <span>{product.quantity}</span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => updateQuantity(product._id, 'increment')}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="danger"
                              className="btn-rounded w-100"
                              onClick={() => handleRemoveConfirmation(product)}
                            >
                              <FaTrash className="me-2" /> Remove Item
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {/* Total and Checkout Section */}
                  <div className="text-center">
                    <h4 className="mb-3">
                      Total: <strong>£{totalPrice.toFixed(2)}</strong>
                    </h4>
                    <Button
                      variant="success"
                      size="lg"
                      className="btn-rounded px-5"
                      onClick={handleCheckout}
                    >
                      <FaCheck className="me-2" /> Confirm & Checkout
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Confirmation Modal */}
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
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <MainFooter />
    </div>
  );
};

export default Cart;