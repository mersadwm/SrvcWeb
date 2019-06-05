const express = require('express');
const passport = require('passport');
// const debug = require('debug')('app:users');
const router = express.Router();

const usersController = require('../controllers/usersController');

const { routeProtection, addUser } = usersController();
/* GET users pages. */
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.route('/editProfile')
  .all(routeProtection)
  .get((req, res) => {
    res.render('editProfile');
  });

router.route('/signUp').post((req, res) => {
  // create user
  const { username, password, email } = req.body;
  addUser(req, res, username, password, email);
});

router.route('/signin')
  .get((req, res) => {
    res.render('signin');
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
  scope: ['profile'],
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.render('editProfile');

  // debug(result);
});

router.get('/logout', (req, res) => {
  // hande with passport
  req.logout(req.body);
  res.redirect('/users/signin');
});

module.exports = router;
