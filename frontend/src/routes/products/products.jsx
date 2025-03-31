import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaSearch, FaLeaf, FaFilter, FaShoppingCart, FaTimes, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/product.css';
import MainFooter from '../../components/MainFooter';
import MainNavigation from '../../components/mainnavigation';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All', 'Solar', 'Wind', 'Transport', 'Home']);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
        const uniqueCategories = ['All', ...new Set(response.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return 0;
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="products-page dark-theme">
      <MainNavigation />

      <div className="cart-notification">
        <Button variant="dark" className="cart-button position-relative">
          <FaShoppingCart size={20}/>
          {totalItems > 0 && (
            <Badge pill bg="dark" className="position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </Badge>
          )}
        </Button>

        {totalItems > 0 && (
          <Card className="cart-dropdown">
            <Card.Body>
              <h6 className="mb-3">Your Cart ({totalItems} items)</h6>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image || 'https://via.placeholder.com/50'} 
                        alt={item.name} 
                        className="cart-item-image me-2"
                      />
                      <div>
                        <div className="fw-bold">{item.name}</div>
                        <small>£{item.price}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item._id);
                          } else {
                            updateQuantity(item._id, 'decrement');
                          }
                        }}
                        className="ms-2"
                      >
                        {item.quantity === 1 ? <FaTrash /> : <FaMinus />}
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item._id, 'increment')}
                        className="ms-2"
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                <span className="fw-bold">
                  Total: £{totalPrice.toFixed(2)}
                </span>
                <Link to="/cart">
                  <Button variant="outline-secondary" size="sm">
                    Checkout
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

        <div className="hero-section text-white py-5">
          <Container>
            <Row className="align-items-center">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-3 text-white">Sustainable Energy Solutions</h1>
            <p className="lead mb-4 text-white">Transform your home and lifestyle with our cutting-edge green energy products.</p>
          </Col>
          <Col lg={6} className="d-none d-lg-block">
            <div className="text-center">
              <FaLeaf className="display-1 pulse-animation text-white" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Green Energy Products</h2>
          </Col>
        </Row>

        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="me-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <Row>
          <Col lg={3} className={`filters-sidebar ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-3">Search</h5>
                <div className="position-relative mb-4">
                  <Form.Control
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="ps-5 bg-light border-0"
                  />
                  <FaSearch className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                </div>

                <h5 className="fw-bold mb-3">Categories</h5>
                <div className="d-flex flex-column">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "dark" : "outline-dark"}
                      className="mb-2 text-start"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <h5 className="fw-bold mb-3 mt-4">Sort By</h5>
                <Form.Select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-light border-0"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Row>
              {sortedProducts.map((product) => (
                <Col md={6} lg={4} key={product._id} className="mb-4">
                  <Card className="h-100 product-card border-0 shadow-sm">
                    <div className="product-image-container">
                      <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/300x200'} className="product-image" />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">{product.description}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold fs-5">£{product.price}</span>
                        <Button 
                          variant="dark" 
                          onClick={() => addToCart(product)}
                          className="ms-auto"
                          style={{ minWidth: '120px' }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {sortedProducts.length === 0 && (
              <div className="text-center py-5">
                <h3>No products found</h3>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
                <Button variant="dark" className="rounded-0" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}>Reset Filters</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <div className="featured-section py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <div className="featured-card bg-dark text-white p-4 h-100 text-center">
                <h3 className="border-bottom pb-2">Consultations & Installations</h3>
                <p>Our certified technicians ensure proper installation and setup of all our green energy products.</p>
                <p>We also offer free consultations</p>
                <Button variant="light" className="rounded-pill btn-rounded">Schedule Now</Button>
              </div>
            </Col>
            <Col md={6}>
              <div className="featured-card bg-dark text-white p-4 h-100 text-center">
                <h3 className="border-bottom pb-2">Calculate Your Carbon Footprint</h3>
                <p>Use our carbon footprint calculator to see how much you can reduce your carbon footprint by switching to green energy solutions.</p>
                <Button variant="light" className="rounded-pill btn-rounded">Try Calculator</Button>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col md={6}>
              <div className="featured-card bg-dark text-white p-4 h-100 text-center">
                <h3 className="border-bottom pb-2">Calculate Your Energy Usage</h3>
                <p>Estimate how much energy your home uses and discover ways to improve efficiency with our energy usage calculator.</p>
                <Button variant="light" className="rounded-pill btn-rounded">Try Calculator</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <MainFooter />
    </div>
  );
};

export default Products;