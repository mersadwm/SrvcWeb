const debug = require('debug')('app:servicesController');

const sql = require('mssql');


function servicesController() {
  function getService(id) {
    const request = new sql.Request();
    const result = request.input('title', sql.NVarChar, id).query('select * from services where title=@title');
    debug(result);
    debug(id);
    return (result);
  }

  function getAllServices() {
    const request = new sql.Request();
    const result = request.query('select * from services');
    debug(result);
    return (result);
  }


  return {
    getService,
    getAllServices,
  };
}

module.exports = servicesController();
