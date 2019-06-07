const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { routeProtectionAdmin } = usersController();

router.route('/').get((req, res) => {
  res.send('not found');
});

router.route('/addQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addquestion');
})
  .post((req, res) => {
    const {
      questionkey, parentkey, question, isvisualized, moreinfo,
    } = req.body;
  });

router.route('/addVis').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addvisualanswer');
});

router.route('/addVerb').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addverbalanswer');
});

router.route('/updateQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/updateQuestion');
});

router.route('/updateA').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/updateverbalanswer');
});

module.exports = router;
