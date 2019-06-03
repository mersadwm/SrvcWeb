const express = require('express');
const debug = require('debug')('app:users');

const router = express.Router();

/* GET users pages. */
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/editProfile', (req, res) => {
  res.render('editProfile');
});

router.post('/signUp', (req, res) => {
  debug(req.body);
  // create user
  req.login(req.body, () => {
    res.redirect('/users/profile');
  });
  res.json(req.body);
});

router.route('/profile')
  .get((req, res) => {
    res.json(req.user);
  });

module.exports = router;
