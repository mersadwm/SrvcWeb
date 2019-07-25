const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const debug = require('debug')('app:oauth');
const usersController = require('../../controllers/usersController');

const {
  addUser, loginUser, updateUserInfo, getUserInfo, updateUserProfilePic,
} = usersController;

passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
    // options for google strategy
  }, async (accessToken, refreshToken, profile, done) => {
    // debug(profile);
    const {
      id, name, photos, emails,
    } = await profile;
    const { value } = await emails[0];
    // debug(value);
    const username = id;
    const pass = `sdw90sdkf${id}7iuzjh3f`;
    const login = await loginUser(username, pass);
    // debug(login);
    if (login.output.responseMessage === 'User successfully logged in') {
      // debug('success');
      const { recordset } = await getUserInfo(username, pass);
      done(null, recordset[0]);
    } else {
      // debug('failed');
      await addUser(username, pass, value);
      await updateUserInfo(username, pass, value, name.givenName, name.familyName);
      await updateUserProfilePic(username, photos[0].value);
      done(null, false);
    }

    // pasport callback function


    // debug('profile from the route');
  }),
);
