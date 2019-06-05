const passport = require('passport');
const { Strategy } = require('passport-local');
const usersController = require('../../controllers/usersController');


const { loginUser } = usersController();


module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    loginUser(username, password, done);
  }));
};
