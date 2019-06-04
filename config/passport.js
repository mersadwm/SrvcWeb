const passport = require('passport');
require('./strategies/local.strategy.js')();
const ouathStrategy = require('./strategies/ouath.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieves user from session
  passport.deserializeUser((user, done) => {
    // fine user by id
    done(null, user);
  });
};
