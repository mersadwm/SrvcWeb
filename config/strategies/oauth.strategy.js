const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const usersController = require('../../controllers/usersController');

const {
  addUser, loginUser, updateUserInfo, getUserInfo, updateUserProfilePic,
} = usersController;
/**
 * Google Api using ClientID and ClientSecret
 */
passport.use(
  new GoogleStrategy({
    callbackURL: '/users/google/redirect',
    clientID: '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
    clientSecret: 'UsfdAK9yDy9RroyMcP2YGVQZ',
  /**
   * @param {profile} profile option for google strategy
   */
  }, async (accessToken, refreshToken, profile, done) => {
    const {
      id, name, photos, emails,
    } = await profile;
    const { value } = await emails[0];
    const username = `${id}@google.auth`;
    const pass = `sdw90sdkf${id}7iuzjh3f`;
    const login = await loginUser(username, pass);
    if (login.output.responseMessage === 'User successfully logged in') {
      const { recordset } = await getUserInfo(username, pass);
      done(null, recordset[0]);
    } else {
      await addUser(username, pass, value);
      await updateUserInfo(username, value, name.givenName, name.familyName);
      await updateUserProfilePic(username, photos[0].value);
      done(null, false);
    }
  }),
);
