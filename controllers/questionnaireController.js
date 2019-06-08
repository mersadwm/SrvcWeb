const sql = require('mssql');


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

  return {
    addQuestion,
    updateQuestion,
    addVerbalAnswer,
    addVisualAnswer,
    updateVerbalAnswer,
  };
}
module.exports = questionnaireController;
