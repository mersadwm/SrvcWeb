const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:users');

const router = express.Router();
const defined = require('defined');


const usersController = require('../controllers/usersController');

const user = {
  first_name: '',
  last_name: '',
  login_name: '',
  email: '',
  admin_rights: false,
  profile_pic_url: '/images/profilePic/default_w.png',
  address_1: '',
  address_2: '',
  address_3: '',
  city_name: '',
  state_name: '',
  Country: '',
  PLZ: '',
};

const {
  routeProtection, addUser, loginUser, updateUserInfo,
} = usersController;
/* GET users pages. */
router.get('/signup', (req, res) => {
  res.render('signup', { user: defined(req.user, user), logged: req.isAuthenticated() });
});

router.route('/editProfile')
  .all(routeProtection)
  .get((req, res) => {
    res.render('editProfile', { user: defined(req.user, user), logged: req.isAuthenticated() });
  })
  .post((req, res) => {
    const {
      userName, password, email, firstName, lastName,
    } = req.body;

    updateUserInfo(userName, password, email, firstName, lastName, null);
    res.redirect('/users/profile');
  });

router.route('/signUp').post(async (req, res) => {
  // create user
  const { username, password, email } = req.body;
  addUser(username, password, email);
  const login = await loginUser(username, password);
  debug(login);
  res.redirect('/users/signin');
});

router.route('/signin')
  .get((req, res) => {
    res.render('signin', { user: defined(req.user, user), logged: req.isAuthenticated() });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/users/editProfile',
    failureRedirect: '/users/signin',
  }));
router.route('/profile')
  .all(routeProtection)
  .get((req, res) => {
    res.json(req.user);
  });

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/users/editProfile');

  // debug(result);
});

router.get('/logout', (req, res) => {
  // hande with passport
  req.logout(req.body);
  res.redirect('/users/signin');
});

module.exports = router;
