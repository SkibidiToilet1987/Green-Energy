var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/index');
var authRouter = require('./routes/auth/index');
var productRouter = require('./routes/product/productRoutes');
var checkoutRouter = require('./routes/checkout/checkoutRoutes'); // Checkout route
var shoppingCartRouter = require('./routes/checkout/shoppingCartRoutes'); // Shopping cart route

var app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ISL')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// view engine setup (if you still need it for rendering views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter); // Register the checkout route
app.use('/shoppingcart', shoppingCartRouter); // Register the shopping cart route

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send JSON response instead of rendering a view
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;