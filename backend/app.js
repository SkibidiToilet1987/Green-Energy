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
var consultationRouter = require('./routes/booking/consultationRoutes'); // Added consultation routes
var installationRouter = require('./routes/booking/installationRoutes'); // Added installation routes

var app = express();

mongoose.connect('mongodb://localhost:27017/ISL')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/me', meRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/shoppingcart', shoppingCartRouter);
app.use('/carbonCalculator', calculatorRouter);
app.use('/consultations', consultationRouter); // Added consultations route
app.use('/installations', installationRouter); // Added installations route

app.use(function (req, res, next) {
  next(createError(404));
});

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