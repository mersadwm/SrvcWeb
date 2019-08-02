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
const showRoute = require('./routes/show');

const app = express();

const sqlConfig = {
  user: 'mersad',
  password: '5xqpV&Vde9!W',
  server: 'extrahandsdbserver.database.windows.net',
  database: 'extraHandsDB',
  options: {
    encrypt: true
  }
};
/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'esxdrcfvgbe6ede5e46br6rzbdbd346djjz3wlps35jjuofd34',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport.js')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/help', help);
app.use('/services', services);
app.use('/admin', admin);
app.use('/show', showRoute);


sql.connect(sqlConfig).catch(err => debug(err));
/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/**
 * error handlers
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
  });
}
/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});
/**
 * Local port
 */
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug(`Express server listening on port ${server.address().port}`);
});