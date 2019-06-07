const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const questionnaireController = require('../controllers/questionnaireController');

const { routeProtectionAdmin } = usersController();

const { addQuestion, updateQuestion } = questionnaireController();

router.route('/').get((req, res) => {
  res.send('not found');
});

router.route('/addQ').get((req, res) => {
  res.render('questionnaireView/addquestion');
})
  .post((req, res) => {
    let {
      questionKey, parentKey, question, isVisualized, moreInfo,
    } = req.body;
    if (isVisualized === 'on') {
      isVisualized = 1;
    } else {
      isVisualized = 0;
    }
    addQuestion(question, parentKey, moreInfo, questionKey, isVisualized);

    res.redirect('/admin/addQ');
  });

router.route('/addVis').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addvisualanswer');
});

router.route('/addVerb').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addverbalanswer');
});

router.route('/updateQ').get((req, res) => {
  res.render('questionnaireView/updateQuestion');
})
  .post((req, res) => {
    let {
      questionKey, parentKey, question, isVisualized, moreInfo,
    } = req.body;
    if (isVisualized === 'on') {
      isVisualized = 1;
    } else {
      isVisualized = 0;
    }
    updateQuestion(question, parentKey, moreInfo, questionKey, isVisualized);

    res.redirect('/admin/updateQ');
  });

router.route('/updateA').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/updateverbalanswer');
});

module.exports = router;
