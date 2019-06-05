const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const sql = require('mssql');
const debug = require('debug')('app:oauth');


passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
    // options for google strategy
  }, (accessToken, refreshToken, profile, done) => {
    (async function addUser() {
      // pasport callback function
      const {
        displayName, givenName, familyName, id,
      } = profile;
      debug(profile);
      debug('profile from the route');
      const request = new sql.Request();
      const result = await request.query(`INSERT INTO users (login_name, user_id) VALUES ('${displayName}', '${id}')`);
    }());
  }),
);
