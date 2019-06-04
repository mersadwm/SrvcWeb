const express = require('express');
const debug = require('debug')('app:users');
const sql = require('mssql');
const passport = require('passport');

const router = express.Router();

/* GET users pages. */
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/editProfile', (req, res) => {
  res.render('editProfile');
});

router.route('/signUp').post((req, res) => {
  debug(req.body);
  // create user
  const { username, password, email } = req.body;
  (async function addUser() {
    const request = new sql.Request();
    const result = await request.query(`INSERT INTO users (user_name, password, email) VALUES ('${username}', '${password}', '${email}')`);
    debug(result);
  }());

  req.login(req.body, () => {
    res.redirect('/users/profile');
  });
  res.json(req.body);
});

router.route('/signin')
  .get((req, res) => {
    res.render('login', {
      name: 'User',
    });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/editProfile',
    failureRedirect: '/',
  }));
router.route('/profile')
  .get((req, res) => {
    res.json(req.user);
  });

module.exports = router;
