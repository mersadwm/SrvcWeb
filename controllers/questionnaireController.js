const sql = require('mssql');
const debug = require('debug')('app:QuestionnaireController');

class VerbalAnswer {
  constructor() {
    this.nextSlidekey = '';
    this.text = '';
  }
}

class VisualAnswer {
  constructor() {
    this.nextSlidekey = '';
    this.imageUrl = '';
    this.imageCaption = '';
    this.imageDescription = '';
  }
}


class Question {
  constructor() {
    this.parentKey = '';
    this.key = '';
    this.question = '';
    this.isAnswerVisualized = null;
    this.moreInfo = '';
    this.verbalAnswers = [];
    this.visualAnswers = [];
  }
}

function questionnaireController() {
  function addQuestion(question, parentKey, moreInfo, questionKey, isVisualized) {
    const request = new sql.Request();
    request.input('questions', question);
    request.input('parent_key', parentKey);
    request.input('moreinfo', moreInfo);
    request.input('question_key', questionKey);
    request.input('isvisualized', sql.Int, isVisualized);
    request.query('insert into question values(@questions, @parent_key, @moreinfo, @question_key,@isvisualized)');
  }


  function updateQuestion(question, parentKey, moreInfo, questionKey, isVisualized) {
    const request = new sql.Request();
    request.input('questions', question);
    request.input('parent_key', parentKey);
    request.input('moreinfo', moreInfo);
    request.input('question_key', questionKey);
    request.input('isvisualized', sql.Int, isVisualized);
    request.query(`update question set questions = '${question}', parent_key = '${parentKey}', moreinfo = '${moreInfo}', isvisualized = '${isVisualized}' where question_key = '${questionKey}' `);
  }

  function addVerbalAnswer(questionKey, text, id, nextSlideKey) {
    const request = new sql.Request();
    request.input('question_key', questionKey);
    request.input('txt', text);
    request.input('id', sql.Int, id);
    request.input('next_slide_key', nextSlideKey);
    request.query('insert into verbal_answer values(@question_key, @txt, @id, @next_slide_key)');
  }

  function addVisualAnswer(questionKey, imageDescription, id, nextSlideKey, imageCaption, imageUrl) {
    const request = new sql.Request();
    request.input('question_key', questionKey);
    request.input('image_description', imageDescription);
    request.input('id', sql.Int, id);
    request.input('next_slide_key', nextSlideKey);
    request.input('image_caption', imageCaption);
    request.input('image_url', imageUrl);
    request.query('insert into visual_answer values(@question_key, @image_description, @id, @next_slide_key, @image_caption, @image_url)');
  }

  function updateVerbalAnswer(questionKey, text, id, nextSlideKey) {
    const request = new sql.Request();
    request.input('question_key', questionKey);
    request.input('txt', text);
    request.input('id', sql.Int, id);
    request.input('next_slide_key', nextSlideKey);
    request.query(`update verbal_answer set txt = '${text}', id = '${id}', next_slide_key = '${nextSlideKey}' where question_key = '${questionKey}' `);
  }
  function getQuestion(id) {
    const request = new sql.Request();
    const result = request.input('title', sql.NVarChar, id).query('select * from question where title=@title');
    debug(result);
    return (result);
  }

  function getAllQuestions() {
    const request = new sql.Request();
    const result = request.query('select * from question');
    debug(result);
    return (result);
  }

  async function getAllQuestionsRaw() {
    const { recordset } = await getAllQuestions();
    const questions = recordset;
    // debug(questions);
    const request = new sql.Request();
    const verbalAnswers = await request.query('select * from verbal_answer');
    // debug(verbalAnswers);
    const visualAnswers = await request.query('select * from visual_answer');
    // debug(visualAnswers);
    const finalJson = [];
    // TEST Field
    for (let i = 0; i < questions.length; i += 1) {
      const tempQ = new Question();
      // debug('##################');
      // debug(questions[i]);
      tempQ.parentKey = questions[i].parent_key;
      tempQ.key = questions[i].question_key;
      tempQ.question = questions[i].questions;
      tempQ.isAnswerVisualized = questions[i].isvisualized;
      tempQ.moreInfo = questions[i].moreinfo;
      if (questions[i].isvisualized) {
        for (let j = 0; j < visualAnswers.recordset.length; j += 1) {
          if (visualAnswers.recordset[j].question_key === tempQ.key) {
            const tempA = new VisualAnswer();
            tempA.nextSlidekey = visualAnswers.recordset[j].next_slide_key;
            tempA.imageUrl = visualAnswers.recordset[j].image_url;
            tempA.imageCaption = visualAnswers.recordset[j].image_caption;
            tempA.imageDescription = visualAnswers.recordset[j].image_description;
            tempQ.visualAnswers.push(tempA);
          }
        }
      } else {
        for (let p = 0; p < verbalAnswers.recordset.length; p += 1) {
          if (verbalAnswers.recordset[p].question_key === tempQ.key) {
            const tempB = new VerbalAnswer();
            tempB.nextSlidekey = verbalAnswers.recordset[p].next_slide_key;
            tempB.text = verbalAnswers.recordset[p].txt;
            tempQ.verbalAnswers.push(tempB);
          }
        }
      }
      finalJson.push(tempQ);
    }
    return finalJson;
  }


  return {
    addQuestion,
    updateQuestion,
    addVerbalAnswer,
    addVisualAnswer,
    updateVerbalAnswer,
    getAllQuestions,
    getQuestion,
    getAllQuestionsRaw,
  };
}
module.exports = questionnaireController();
