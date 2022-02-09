var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Auth, Session
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { forwardAuthenticated } = require('./modules/auth');

// DB 
var db = require('./modules/mongo');
db.connectToServer("Projekt", function(err) {
  if(err)console.log("Error:", err);
})

// Routing
var indexRouter = require('./routes/index');

var restRouter = require('./routes/API');

var addRouter = require('./routes/itemAdd');
var removeRouter = require('./routes/itemRemover');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./modules/passport')(passport);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', restRouter);
app.use('/users', usersRouter);
app.use('/users/login', loginRouter);
app.use('/users/register', registerRouter);

app.use('/AddIt', addRouter);
app.use('/RemoveIt', removeRouter);

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
