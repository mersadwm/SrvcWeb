const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { routeProtectionAdmin } = usersController();

router.route('/').get((req, res) => {
  res.send('not found');
});

router.route('/addQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('addquestion');
});

router.route('/addVis').all(routeProtectionAdmin).get((req, res) => {
  res.render('addvisualanswer');
});

router.route('/addVerb').all(routeProtectionAdmin).get((req, res) => {
  res.render('addverbalanswer');
});

router.route('/updateQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('updateQuestion');
});

router.route('/updateA').all(routeProtectionAdmin).get((req, res) => {
  res.render('updateverbalanswer');
});

module.exports = router;
