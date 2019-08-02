const sql = require('mssql');
const debug = require('debug')('app:QuestionnaireController');
/**
 * Questionnaire Choice including texts
 */
class VerbalAnswer {
  constructor() {
    this.nextSlidekey = '';
    this.text = '';
  }
}
/**
 * Questionnaire Choice including images
 */
class VisualAnswer {
  constructor() {
    this.nextSlidekey = '';
    this.imageUrl = '';
    this.imageCaption = '';
    this.imageDescription = '';
  }
}

/**
 * Questionnaire main questions including information to connect to the correct answer
 */
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
  /**
   * method to add questions to the data base
   * @param {string} question questions
   * @param {string} parentKey key which the question related to
   * @param {string} moreInfo more info
   * @param {string} questionKey question key which is connected to the related answers
   * @param {boolean} isVisualized determine if the question is visual or verbal
   */
  function addQuestion(question, parentKey, moreInfo, questionKey, isVisualized) {
    const request = new sql.Request();
    request.input('questions', question);
    request.input('parent_key', parentKey);
    request.input('moreinfo', moreInfo);
    request.input('question_key', questionKey);
    request.input('isvisualized', sql.Int, isVisualized);
    request.query('insert into question values(@questions, @parent_key, @moreinfo, @question_key,@isvisualized)');
  }

  /**
   * method to update questions on database
   * @param {string} question questions
   * @param {string} parentKey key which the question related to
   * @param {string} moreInfo more info
   * @param {string} questionKey question key which is connected to the related answers
   * @param {boolean} isVisualized determine if the question is visual or verbal
   */
  function updateQuestion(question, parentKey, moreInfo, questionKey, isVisualized) {
    const request = new sql.Request();
    request.input('questions', question);
    request.input('parent_key', parentKey);
    request.input('moreinfo', moreInfo);
    request.input('question_key', questionKey);
    request.input('isvisualized', sql.Int, isVisualized);
    request.query(`update question set questions = '${question}', parent_key = '${parentKey}', moreinfo = '${moreInfo}', isvisualized = '${isVisualized}' where question_key = '${questionKey}' `);
  }
  /**
   * Method to add verbal answers to database
   * @param {string} questionKey question key of which the answer is related
   * @param {string} text answer
   * @param {number} id answer id
   * @param {string} nextSlideKey connected to the next related question
   */
  function addVerbalAnswer(questionKey, text, id, nextSlideKey) {
    const request = new sql.Request();
    request.input('question_key', questionKey);
    request.input('txt', text);
    request.input('id', sql.Int, id);
    request.input('next_slide_key', nextSlideKey);
    request.query('insert into verbal_answer values(@question_key, @txt, @id, @next_slide_key)');
  }
  /**
   * Method to add visual answers
   * @param {string} questionKey question key of which the answer is related
   * @param {string} imageDescription dicription of images
   * @param {number} id id
   * @param {string} nextSlideKey connected to the next related question
   * @param {string} imageCaption caption of image
   * @param {string} imageUrl url of image
   */
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
  /**
   * Method to update verbal answers in database
   * @param {string} questionKey question key of which the answer is related
   * @param {string} text answer
   * @param {number} id id
   * @param {string} nextSlideKey connected to the next related question
   */
  function updateVerbalAnswer(questionKey, text, id, nextSlideKey) {
    const request = new sql.Request();
    request.input('question_key', questionKey);
    request.input('txt', text);
    request.input('id', sql.Int, id);
    request.input('next_slide_key', nextSlideKey);
    request.query(`update verbal_answer set txt = '${text}', id = '${id}', next_slide_key = '${nextSlideKey}' where question_key = '${questionKey}' `);
  }
  /**
   * get the question with id
   * @param {number} id question id
   */
  function getQuestion(id) {
    const request = new sql.Request();
    const result = request.input('title', sql.NVarChar, id).query('select * from question where title=@title');
    debug(result);
    return (result);
  }
  /**
   * Get all question from database
   */
  function getAllQuestions() {
    const request = new sql.Request();
    const result = request.query('select * from question');
    debug(result);
    return (result);
  }
  /**
   * API to get a Json raw including all information of the questionnaire
   */
  async function getAllQuestionsRaw() {
    const { recordset } = await getAllQuestions();
    const questions = recordset;
    const request = new sql.Request();
    const verbalAnswers = await request.query('select * from verbal_answer');
    const visualAnswers = await request.query('select * from visual_answer');
    const finalJson = [];
    for (let i = 0; i < questions.length; i += 1) {
      const tempQ = new Question();
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
