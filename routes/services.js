const express = require('express');

const router = express.Router();
const debug = require('debug')('app:services');
const defined = require('defined');
const sql = require('mssql');
const servicesController = require('../controllers/servicesController');
const questionController = require('../controllers/questionnaireController');

const { getService, getAllServices } = servicesController;
const { getQuestion, getAllQuestions } = questionController;


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

const verbalAnswer = {
  nextSlidekey: '',
  text: '',
};

const visualAnswer = {
  nextSlidekey: '',
  imageUrl: '',
  imageCaption: '',
  imageDescription: '',
};

const question = {
  parentKey: '',
  key: '',
  question: '',
  isAnswerVisualized: null,
  moreInfo: '',
  verbalAnswers: [],
  visualAnswers: [],
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

router.get('/questionnaire/:id', (req, res) => {
  (async function query() {
    const result = await getQuestion(req.param.id);
    debug(result);
    res.send(result.recordset);
  }());
});

router.get('/questionnaire/', (req, res) => {
  (async function query() {
    const questions = await getAllQuestions();
    // debug(questions);
    const request = new sql.Request();
    const verbalAnswers = await request.query('select * from verbal_answer');
    const visualAnswers = await request.query('select * from visual_answer');
    let tempQ = question;
    let tempA = visualAnswer;
    let tempB = verbalAnswer;

    let finalJson = [];
    // TEST Field
    for (let i = 0; i < questions.recordset.lenght; i++) {
      tempQ.parentKey = questions.recordset[i].parent_key;
      tempQ.key = questions.recordset[i].question_key;
      tempQ.question = questions.recordset[i].questions;
      tempQ.isAnswerVisualized = questions.recordset[i].isvisualized;
      tempQ.moreInfo = questions.recordset[i].moreinfo;
      // add the rest
      if (questions.recordset[i].isvisualized) {
        for (let j = 0; j < visualAnswers.recordset.length; j++) {
          if (visualAnswers.recordset[j].question_key === tempQ.key) {
            tempA.nextSlidekey = visualAnswers.recordset[j].next_slide_key;
            tempA.imageUrl = visualAnswers.recordset[j].image_url;
            tempA.imageCaption = visualAnswers.recordset[j].image_caption;
            tempA.imageDescription = visualAnswers.recordset[j].image_description;
            // add the rest
            tempQ.visualAnswers.push(tempA);
          }
        }
      } else {
        for (let j = 0; j < verbalAnswers.recordset.length; j++) {
          if (verbalAnswer.recordset[j].question_key === tempQ.key) {
            tempB.nextSlidekey = verbalAnswer.recordset[j].next_slide_key;
            tempB.text = verbalAnswer.recordset[j].txt;
            tempQ.verbalAnswers.push(tempB);
          }
          // like visual answer
        }
      }
      finalJson.push(tempQ);
    }
    tempQ.isAnswerVisualized = questions.recordset[4].isvisualized;
    debug(tempQ);
    // End Test
    res.send(finalJson);
    // res.render('questionnaireView/allQuestions', {
    // user: defined(req.user, user), logged: req.isAuthenticated(), questions: questions.recordset, verbalAnswers: verbalAnswers.recordset, visualAnswers: visualAnswers.recordset
  }());
});

module.exports = router;
