var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socketEvents = require('./routes/socket.js');
// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 

app.use(session({
  secret: 'callmesecret',
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))); // redirect bootstrap JS 
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist'))); // redirect CSS bootstrap

// 소켓서버
socketEvents.start(io);

app.use('/', indexRouter);
app.use('/user', userRouter);

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

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});
//module.exports = app
