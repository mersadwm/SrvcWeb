

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

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: defined(req.user, user), logged: req.isAuthenticated() });
});

module.exports = router;
