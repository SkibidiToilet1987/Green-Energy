import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MainNavigation />
        <div style={{ flex: '1', padding: '20px' }}>
            <Container>
                <Card className="shadow-lg rounded-3">
                    <Card.Body>
                        <h2 className="text-center mb-4">Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-center">Your cart is empty</p>
                        ) : (
                            <Row className="g-4">
                                {cart.map((product) => (
                                    <Col md={6} lg={4} key={product._id}>
                                        <Card className="product-card h-100">
                                            <Card.Img
                                                variant="top"
                                                src={product.image || 'https://via.placeholder.com/300x200'}
                                                className="product-image"
                                            />
                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text className="text-muted">
                                                    £{product.price} x {product.quantity}
                                                </Card.Text>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Button
                                                        variant="danger"
                                                        className="btn-rounded"
                                                        onClick={() => removeFromCart(product._id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
        <MainFooter />
    </div>
  );
};

export default Cart;
