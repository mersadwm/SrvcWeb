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
  verbalAnswers: [verbalAnswer],
  visualAnswers: [visualAnswer],
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
    const { recordset } = await getAllQuestions();
    const questions = recordset;
    // debug(questions);
    const request = new sql.Request();
    const verbalAnswers = await request.query('select * from verbal_answer');
    // debug(verbalAnswers);
    const visualAnswers = await request.query('select * from visual_answer');
    // debug(visualAnswers);
    const tempQ = question;
    const tempA = visualAnswer;
    const tempB = verbalAnswer;
    const finalJson = [];
    // TEST Field
    for (var i = 0; i < questions.length; i++) {
      debug('##################');
      debug(questions[i]);
      tempQ.parentKey = questions[i].parent_key;
      tempQ.key = questions[i].question_key;
      tempQ.question = questions[i].questions;
      tempQ.isAnswerVisualized = questions[i].isvisualized;
      tempQ.moreInfo = questions[i].moreinfo;
      // add the rest
      if (questions[i].isvisualized === 1) {
        for (var j = 0; j < visualAnswers.recordset.length; j++) {
          if (visualAnswers.recordset[j].question_key === tempQ.key) {
            tempA.nextSlidekey = visualAnswers.recordset[j].next_slide_key;
            tempA.imageUrl = visualAnswers.recordset[j].image_url;
            tempA.imageCaption = visualAnswers.recordset[j].image_caption;
            tempA.imageDescription = visualAnswers.recordset[j].image_description;
            // add the rest
            // debug(tempA);
            tempQ.visualAnswers.push(tempA);
            // debug(tempQ);
          }
        }
      } else {
        for (var p = 0; p < verbalAnswers.recordset.length; p++) {
          if (verbalAnswers.recordset[p].question_key === tempQ.key) {
            tempB.nextSlidekey = verbalAnswers.recordset[p].next_slide_key;
            tempB.text = verbalAnswers.recordset[p].txt;
            tempQ.verbalAnswers.push(tempB);
          }
          // like visual answer
        }
      }
      finalJson.push(tempQ);
    }
    // debug(finalJson);
    // End Test
    res.send(JSON.stringify(finalJson));
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
