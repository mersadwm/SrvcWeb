const passport = require('passport');
const { Strategy } = require('passport-local');
const sql = require('mssql');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    (async function query() {
      const request = new sql.Request();
      const user = await request.input('username', sql.VarChar, username).query('select * from services where username=@username');
      debug(user);

      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    }());
  }));
};
