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
    clientID: '279862265685-lmj5j8rto2ss84enlic472f7egjnu94i.apps.googleusercontent.com',
    clientSecret: 'cE_tKiQ4wMkFgzTozO_hPJRr',
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
