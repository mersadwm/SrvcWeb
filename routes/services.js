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

    const finalJson = [];
    // TEST Field
    for (let i = 0; i < questions.recordset.lenght; i++) {
      let tempQ = question;
      tempQ.parentKey = questions.recordset[i].parent_key;
      // add the rest
      if (questions.recordset[i].isAnswerVisualized) {
        for (let j = 0; j < visualAnswers.recordset.length; j++) {
          if (visualAnswers.recordset[j].question_key === tempQ.key) {
            let tempA = visualAnswer;
            tempA.nextSlidekey = visualAnswers.recordset[j].next_slide_key;
            // add the rest
            tempQ.visualAnswers.push(tempA);
          }
        }
      } else {
        for (let j = 0; j < verbalAnswers.recordset.length; j++) {
          // like visual answer
        }
      }
      finalJson.push(tempQ);
    }

    // End Test

    res.render('questionnaireView/allQuestions', {
      user: defined(req.user, user), logged: req.isAuthenticated(), questions: questions.recordset, verbalAnswers: verbalAnswers.recordset, visualAnswers: visualAnswers.recordset 
    });
  }());
});

module.exports = router;
