const express = require('express');
const defined = require('defined');
const debug = require('debug')('app:show');
const queryString = require('querystring');


const router = express.Router();
const serviceController = require('../controllers/servicesController');

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
  getAllServices,
  getServiceProvidersForServiceByTitle,
  advancedSearch,
} = serviceController;

router.get('/search', async (req, res) => {
  const q = queryString.parse(req.url.replace(/^.*\?/, ''));
  debug(q);
  let serviceCollection;
  if (q.searchVal) {
    // serviceCollection = await getServiceProvidersForServiceByTitle(q.searchVal);
    serviceCollection = await advancedSearch(q.searchVal, null, null);
  } else {
    serviceCollection = await getAllServices();
  }

  res.render('showResults', {
    user: defined(req.user, user),
    serviceCollection,
    logged: req.isAuthenticated(),
  });
});

module.exports = router;
