const passport = require('passport');
const { Strategy } = require('passport-local');
const sql = require('mssql');
// const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.input('username', sql.VarChar, username).query('select * from users where user_name=@username');
      // debug(recordset);

      if (recordset.length > 0) {
        const user = recordset[0];
        // debug(user);
        if (user.pass === password) {
        // debug('matchted');
          done(null, user);
        }
      } else {
        // debug(`not matched ${user.password} ${password}`);
        done(null, false);
      }
    }());
  }));
};
