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
var checkoutRouter = require('./routes/checkout/checkoutRoutes');
var shoppingCartRouter = require('./routes/checkout/shoppingCartRoutes');
var calculatorRouter = require('./routes/checkout/calculatorRoutes');
var meRouter = require('./routes/users/@me');
var consultationRouter = require('./routes/booking/consultationRoutes');
var installationRouter = require('./routes/booking/installationRoutes');
var energyUsageRouter = require('./routes/energyUsage/energyUsageRoutes');
var cookieConsentRouter = require('./routes/cookies/cookieConsent'); // Add cookie consent route

var app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ISL')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/me', meRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/shoppingcart', shoppingCartRouter);
app.use('/carbonCalculator', calculatorRouter);
app.use('/consultations', consultationRouter);
app.use('/installations', installationRouter);
app.use('/energy-usage', energyUsageRouter); // Add energy usage routes
app.use('/api/cookies', cookieConsentRouter); // Add cookie consent route

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;