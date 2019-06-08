const express = require('express');

const router = express.Router();
const debug = require('debug')('app:services');
const servicesController = require('../controllers/servicesController');
const questionController = require('../controllers/questionnaireController');

const { getService, getAllServices } = servicesController;
const { getQuestion, getAllQuestions } = questionController;
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
    const result = await getAllQuestions();
    debug(result);
    res.send(result.recordset);
  }());
});

module.exports = router;
