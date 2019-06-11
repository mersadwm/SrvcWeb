const express = require('express');
const debug = require('debug')('app:usersController');

const router = express.Router();

const usersController = require('../controllers/usersController');

const questionnaireController = require('../controllers/questionnaireController');

const { routeProtectionAdmin } = usersController;

const {
  addQuestion, updateQuestion, addVisualAnswer, addVerbalAnswer, updateVerbalAnswer,
} = questionnaireController;


router.route('/').get((req, res) => {
  res.send('not found');
});

router.route('/addQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addquestion', { user: req.user, logged: req.isAuthenticated() });
})
  .post((req, res) => {
    let {
      // eslint-disable-next-line prefer-const
      questionKey, parentKey, question, isVisualized, moreInfo,
    } = req.body;
    isVisualized = isVisualized === 'on' ? 1 : 0;
    addQuestion(question, parentKey, moreInfo, questionKey, isVisualized);

    res.redirect('/admin/addQ');
  });

router.route('/addVis').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addvisualanswers', { user: req.user, logged: req.isAuthenticated() });
})
  .post((req, res) => {
    const {
      questionKey, imageDescription, id, nextSlideKey, imageCaption, imageUrl,
    } = req.body;
    debug(questionKey, imageDescription, id, nextSlideKey, imageCaption, imageUrl);
    addVisualAnswer(questionKey, imageDescription, id, nextSlideKey, imageCaption, imageUrl);
    res.redirect('/admin/addVis');
  });

router.route('/addVerb').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/addverbalanswer', { user: req.user, logged: req.isAuthenticated() });
})
  .post((req, res) => {
    const {
      questionKey, text, id, nextSlideKey,
    } = req.body;

    addVerbalAnswer(questionKey, text, id, nextSlideKey);
    res.redirect('/admin/addVerb');
  });

router.route('/updateQ').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/updateQuestion', { user: req.user, logged: req.isAuthenticated() });
})
  .post((req, res) => {
    let {
      // eslint-disable-next-line prefer-const
      questionKey, parentKey, question, isVisualized, moreInfo,
    } = req.body;
    isVisualized = isVisualized === 'on' ? 1 : 0;
    updateQuestion(question, parentKey, moreInfo, questionKey, isVisualized);

    res.redirect('/admin/updateQ');
  });

router.route('/updateA').all(routeProtectionAdmin).get((req, res) => {
  res.render('questionnaireView/updateverbalanswer', { user: req.user, logged: req.isAuthenticated() });
})
  .post((req, res) => {
    const {
      questionKey, text, id, nextSlideKey,
    } = req.body;

    updateVerbalAnswer(questionKey, text, id, nextSlideKey);
    res.redirect('/admin/updateA');
  });

module.exports = router;
