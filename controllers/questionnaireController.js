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

  return {
    addQuestion,
    updateQuestion,
  };
}
module.exports = questionnaireController;
