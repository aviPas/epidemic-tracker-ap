var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var notifications = require('./dds/dds.js');dds/dds.js
var usersRouter = require('./routes/users');
//const cache =  require('./routes/routeCache');

var methodOverride = require('method-override')


var app = express();

// view engine setup


app.use(methodOverride('X-HTTP-Method-Override'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/epidemic-tracker', indexRouter);
app.use('/hello', indexRouter);
app.use('/covid19', indexRouter);
app.use('/infectionRisk', indexRouter);


///disease-data-source/covid19/notifications

//router.put('/users/:userId', (req, res

//app.use('/', usersRouter);
app.use('/users', usersRouter);
app.use('/ss', usersRouter);

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
