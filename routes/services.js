const express = require('express');

const router = express.Router();
const debug = require('debug')('app:services');
const defined = require('defined');
const sql = require('mssql');
const servicesController = require('../controllers/servicesController');
const questionController = require('../controllers/questionnaireController');

const { getService, getAllServices } = servicesController;
const { getAllQuestionsRaw, getAllQuestions } = questionController;


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

/* GET users pages. */
router.get('/id:id', (req, res) => {
  (async function query() {
    const result = await getService(req.param.id);
    debug(result);
    res.send(result.recordset);
  }());
});

router.get('/', (req, res) => {
  (async function query() {
    const result = await getAllServices();
    debug(result);
    res.send(result.recordset);
  }());
});

// router.get('/questionnaire/:id', (req, res) => {
//   (async function query() {
//     const result = await getQuestion(req.param.id);
//     debug(result);
//     res.send(result.recordset);
//   }());
// });

router.get('/questionnaire/raw', (req, res) => {
  (async function query() {
    const jsonResult = await getAllQuestionsRaw();
    res.send(jsonResult);
  }());
});


router.get('/questionnaire/', (req, res) => {
  (async function query() {
    const questions = await getAllQuestions();
    // debug(questions);
    const request = new sql.Request();
    const verbalAnswers = await request.query('select * from verbal_answer');
    const visualAnswers = await request.query('select * from visual_answer');
    res.render('questionnaireView/allQuestions', {
      user: defined(req.user, user), logged: req.isAuthenticated(), questions: questions.recordset, verbalAnswers: verbalAnswers.recordset, visualAnswers: visualAnswers.recordset,
    });
  }());
});


module.exports = router;
