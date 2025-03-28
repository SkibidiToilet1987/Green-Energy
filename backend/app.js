const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/index');
const authRouter = require('./routes/auth/index');
const productRouter = require('./routes/product/productRoutes');
const checkoutRouter = require('./routes/checkout/checkoutRoutes'); // Checkout route

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/ISL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter); // Register the checkout route

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;