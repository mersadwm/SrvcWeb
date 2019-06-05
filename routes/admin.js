const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { routeProtectionAdmin } = usersController();

router.route('/').get((req, res) => {
  res.send('not found');
});

router.route('/addQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('addQuestion');
});

router.route('/addA').all(routeProtectionAdmin).get((req, res) => {
  res.render('addAnswer');
});

router.route('/updateQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('updateQuestion');
});

router.route('/updateA').all(routeProtectionAdmin).get((req, res) => {
  res.render('updateAnswer');
});

module.exports = router;
