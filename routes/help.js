const express = require('express');
const defined = require('defined');

const router = express.Router();

const user = {
  first_name: '',
  last_name: '',
  login_name: '',
  email: '',
  admin_rights: false,
  profile_pic_url: '',
  address_1: '',
  address_2: '',
  address_3: '',
  city_name: '',
  state_name: '',
  Country: '',
  PLZ: '',
};

/* GET help pages. */
router.get('/faq', (req, res) => {
  res.render('faq', { user: defined(req.user, user), logged: req.isAuthenticated() });
  // res.render(req.params.page);
});

router.get('/aboutUs', (req, res) => {
  res.render('aboutUs', { user: defined(req.user, user), logged: req.isAuthenticated() });
});

module.exports = router;
