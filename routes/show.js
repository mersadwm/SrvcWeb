const express = require('express');
const defined = require('defined');
const url = require('url');
const debug = require('debug')('app:show');


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

router.get('/search', (req, res) => {
  const q = url.parse(req.url, true);
  debug(`\nsearch parameters are ${q.search}`);
  res.render('showResults', { user: defined(req.user, user), logged: req.isAuthenticated() });
});

module.exports = router;
