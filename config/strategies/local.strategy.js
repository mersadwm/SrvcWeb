const passport = require('passport');
const { Strategy } = require('passport-local');
const usersController = require('../../controllers/usersController');

/**
 * @param {method}  loginUser login the user, exported from userController
 * @param {method}  getUserInfo get user information, exported from userController
 */
const { loginUser, getUserInfo } = usersController;
/**
 * Local strategy from Passport library
 */
module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    const login = await loginUser(username, password);
    if (login.output.responseMessage === 'User successfully logged in') {
      const { recordset } = await getUserInfo(username, password);
      await done(null, recordset[0]);
    } else {
      await done(null, false);
    }
  }));
};
