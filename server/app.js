var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var app = express();
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const passport = require("passport");




const socketHub = require('./src/socket/socketHub');
const api = require('./src/routes/rootApi');

//MongoDB mongoose
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/projekiot',{useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.connect('mongodb://projek20:projek20@localhost/siagabanjir?replicaSet=rs0',{useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.connect('mongodb://projek20:projek20@198.211.106.64:27017/siagabanjir',{useNewUrlParser: true,useUnifiedTopology: true});



//app io
app.io = require('socket.io')();

// app.io.sockets.on('connection', function (socket) {
//   console.log('client connect');
//   socket.on('echo', function (data) {
//   io.sockets.emit('message', data);
// });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use('/socketHub', socketHub.router);
app.use('/api/klinik', api.klinik);
app.use('/api/users', api.users);
app.use('/api/dps', api.dps);
app.use('/api/site', api.site);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   console.log(err)
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// admin.sck(app.io);
socketHub.sck(app.io);
// index.sck(app.io);

module.exports = app;

// app.io.attach(server);