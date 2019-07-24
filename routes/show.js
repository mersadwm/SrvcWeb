const express = require('express');
const defined = require('defined');
const debug = require('debug');


const router = express.Router();

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

router.get('/', (req, res) => {
  res.render('showResults', { user: defined(req.user, user), logged: req.isAuthenticated() });
});

module.exports = router;
