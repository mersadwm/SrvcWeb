/* eslint-disable comma-dangle */
const debug = require('debug')('app');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sql = require('mssql');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes/index');
const users = require('./routes/users');
const help = require('./routes/help');
const services = require('./routes/services');
const admin = require('./routes/admin');

const app = express();

const sqlConfig = {
  user: 'mersad',
  password: '5xqpV&Vde9!W',
  server: 'srvc.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'services',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'srvc'
}));
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport.js')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/help', help);
app.use('/services', services);
app.use('/admin', admin);


sql.connect(sqlConfig).catch(err => debug(err));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send('error 500');
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send('404 page not found');
});


// app.get('/', (req, res) => {
//   // res.send('Hello world');
//   res.render('index', {
//     title: ['a', 'b']
//   });
// });


app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug(`Express server listening on port ${server.address().port}`);
});
