const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const debug = require('debug')('app:oauth');
const usersController = require('../../controllers/usersController');

const { addUser, loginUser } = usersController();

passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
    // options for google strategy
  }, async (accessToken, refreshToken, profile, done) => {
    debug(profile);
    const { id } = profile;
    const username = id;
    const pass = `sdw90sdkf${id}7iuzjh3f`;
    const email = `${id}google.com`;
    debug(profile);
    addUser(username, pass, email);
    const login = await loginUser(username, pass);
    debug(login);
    if (login.output.responseMessage === 'User successfully logged in') {
      debug('success');
      done(null, true);
    } else {
      debug('failed');
      done(null, true);
    }

    // pasport callback function


    debug('profile from the route');
  }),
);
