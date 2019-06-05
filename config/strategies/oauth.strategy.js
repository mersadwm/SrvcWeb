const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const debug = require('debug')('app:oauth');
const usersController = require('../../controllers/usersController');

const { addGUser } = usersController();

passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
    // options for google strategy
  }, (accessToken, refreshToken, profile, done) => {
    debug(profile);
    const { id } = profile;
    debug(profile);
    addGUser(id, 'google', `${id}somthing`);

    // pasport callback function


    debug('profile from the route');
  }),
);
