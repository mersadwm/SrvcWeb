const passport = require('passport');
const { Strategy } = require('passport-local');
// const debug = require('debug')('app:localStrategy');

const usersController = require('../../controllers/usersController');


const { loginUser, getUserInfo } = usersController;


module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    const login = await loginUser(username, password);
    // debug(login);
    if (login.output.responseMessage === 'User successfully logged in') {
      // debug('success');
      const { recordset } = await getUserInfo(username, password);
      // debug('##############################');
      // debug(recordset[0]);
      await done(null, recordset[0]);
    } else {
      // debug('failed');
      await done(null, false);
    }
  }));
};
