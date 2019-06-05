const express = require('express');
<<<<<<< HEAD
// const debug = require('debug')('app:users');
=======
>>>>>>> acd3c44ada4731d1b8bbd7757780ecf630961e66
const sql = require('mssql');
const passport = require('passport');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { routeProtection } = usersController();
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
  // debug(req.body);
  // create user
  const { username, password, email } = req.body;
  (async function addUser() {
    const request = new sql.Request();
    const result = await request.query(`INSERT INTO users (user_name, pass, email) VALUES ('${username}', '${password}', '${email}')`);
    // debug(result);
  }());

  req.login(req.body, () => {
    res.redirect('/users/editProfile');
  });
  // res.json(req.body);
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
  res.send('you reached');

  // debug(result);
});

router.get('/logout', (req, res) => {
  // hande with passport
  req.logout(req.body);
  res.redirect('/users/signin');
});

module.exports = router;
