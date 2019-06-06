const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const debug = require('debug')('app:oauth');
const usersController = require('../../controllers/usersController');

const {
  addUser, loginUser, updateUserInfo, getUserInfo,
} = usersController();

passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
    // options for google strategy
  }, async (accessToken, refreshToken, profile, done) => {
    // debug(profile);
    const { id, name, photos } = profile;
    const username = id;
    const pass = `sdw90sdkf${id}7iuzjh3f`;
    const email = `${id}google.com`;
    addUser(username, pass, email);
    updateUserInfo(username, pass, name.givenName, name.familyName, photos[0].value);
    const login = await loginUser(username, pass);
    // debug(login);
    if (login.output.responseMessage === 'User successfully logged in') {
      // debug('success');
      const { recordset } = await getUserInfo(username, pass);
      done(null, recordset[0]);
    } else {
      // debug('failed');
      done(null, false);
    }

    // pasport callback function


    // debug('profile from the route');
  }),
);
