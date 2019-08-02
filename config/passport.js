const passport = require('passport');
require('./strategies/local.strategy.js')();
// eslint-disable-next-line no-unused-vars
const oauthStrategy = require('./strategies/oauth.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Stores user in session
   */
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  /**
   *   retrieves user from session
   */
  passport.deserializeUser((user, done) => {
    /**
     * Find user by id
     */
    done(null, user);
  });
};
