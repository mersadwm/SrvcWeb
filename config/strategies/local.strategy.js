const passport = require('passport');
const { Strategy } = require('passport-local');
const usersController = require('../../controllers/usersController');
const debug = require('debug')('app:localStrategy');


const { loginUser } = usersController();


module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    const login = await loginUser(username, password);
    debug(login);
    if (login.output.responseMessage === 'User successfully logged in') {
      debug('success');
      await done(null, true);
    } else {
      debug('failed');
      await done(null, false);
    }
  }));
};
