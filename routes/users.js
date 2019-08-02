const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:users');
const formidable = require('formidable');
const path = require('path');
const crypto = require('crypto');
const sql = require('mssql');


const router = express.Router();
const defined = require('defined');


const usersController = require('../controllers/usersController');
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
  routeProtection,
  addUser,
  loginUser,
  updateUserInfo,
  updateUserProfilePic,
  updateUserPassword,
  addServiceProviderInfo,
  addServiceProviderService,
  updateUserAddress,
  getServiceProviderInfo,
  deleteService,
} = usersController;

const { getAllServicesForProvider } = serviceController;
/* GET users pages. */
router.get('/signup', (req, res) => {
  res.render('signup', {
    user: defined(req.user, user),
    logged: req.isAuthenticated(),
  });
});


router.route('/SVEditProfile')
  .all(routeProtection)
  .get(async (req, res) => {
    const serviceProvider = await getServiceProviderInfo(req.user.login_name);
    const serviceProviderData = await getAllServicesForProvider(serviceProvider.user_id);
    res.render('SVEditProfile', {
      user: defined(req.user, user),
      serviceProvider,
      serviceProviderData,
      logged: req.isAuthenticated(),
    });
  })
  .post(async (req, res) => {
    const {
      address,
      city,
      zipcode,
      phone,
      webpage,
      aboutme,
      company,
      email,
      service,
    } = req.body;
    const serviceArr = service.split('\n');
    debug(aboutme);
    addServiceProviderInfo(req.user.login_name, company, address, phone, webpage, email, zipcode, city, aboutme);
    await addServiceProviderService(serviceArr, req.user.login_name);
    // debug(typeof service);
    // debug(typeof serviceArr);
    // debug(typeof serviceArr[0]);
    res.redirect('/users/SVEditProfile');
  });

router.route('/editProfile')
  .all(routeProtection)
  .get((req, res) => {
    res.render('editProfile', {
      user: defined(req.user, user),
      logged: req.isAuthenticated(),
    });
  })
  .post((req, res) => {
    const {
      password,
      passwordNew,
      email,
      firstName,
      lastName,
      address1,
      address2,
      address3,
      city,
      state,
      country,
      zipcode,
    } = req.body;

    // debug(req.user);
    updateUserInfo(req.user.login_name, email, firstName, lastName);
    updateUserAddress(req.user.login_name, defined(address1, ''), address2, address3, defined(city, ''), defined(state, ''), defined(country, ''), defined(zipcode, ''));
    if (defined(passwordNew, false)) {
      if (defined(passwordNew.lenght, 0) > 7) {
        updateUserPassword(req.user.login_name, password, passwordNew);
      }
    }
    res.redirect('/users/signin');
  });

router.route('/updateProfilePic')
  .all(routeProtection)
  .post((req, res) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 10 * 1024 * 1024;

    form.parse(req);

    form.on('fileBegin', (name, file) => {
      // eslint-disable-next-line no-param-reassign
      file.path = path.join(__dirname, '../', 'public', 'images', 'profilePic', 'userUploads', crypto.randomBytes(50).toString('hex') + file.name);
    });

    form.on('file', (name, file) => {
      debug(`Uploaded ${file.path}`);
      // MARK: the file should be saved as the user s profile pic in the db
      updateUserProfilePic(req.user.login_name, file.path.replace('/home/site/wwwroot/public/', '/'));
      res.redirect('/users/signin');
    });
  });

router.route('/signUp').post(async (req, res) => {
  // create user
  const {
    username,
    password,
    email,
  } = req.body;
  addUser(username, password, email);
  loginUser(username, password);
  // debug(login);
  res.redirect('/users/signin');
});

router.route('/signin')
  .get((req, res) => {
    res.render('signin', {
      user: defined(req.user, user),
      logged: req.isAuthenticated(),
    });
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

router.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/users/editProfile',
  failureRedirect: '/users/signin',
}));

router.get('/logout', (req, res) => {
  // hande with passport
  req.logout(req.body);
  res.redirect('/users/signin');
});

router.post('/DeleteService', (req, res) => {
  const { userid, serviceproviderid } = req.body;
  deleteService(userid, serviceproviderid);
  res.redirect('/users/SVEditProfile');
});

module.exports = router;
