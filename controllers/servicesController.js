const debug = require('debug')('app:servicesController');
const defined = require('defined');

const sql = require('mssql');


function servicesController() {
  function getService(id) {
    const request = new sql.Request();
    const data = request.input('id', sql.NVarChar, id).query('select * from services where id=@id');

    return data;
  }

  async function getServiceProvidersForService(id) {
    const request = new sql.Request();
    request.input('pServices', sql.NVarChar, id);
    const data = await request.execute('uspSearchServiceProvider');

    return data;
  }


  async function getAllServices() {
    const request = new sql.Request();
    const data = await request.execute('uspGetAllServicesOfProviders');

    return data;
  }

  async function getServiceId(serviceTitle) {
    const request = new sql.Request();
    const data = await request.query(`select id from services where title = '${serviceTitle}'`);
    const { recordset } = data;
    const serviceId = defined(recordset[0], { id: 0 });
    return serviceId.id;
  }


  async function getServiceProvidersForServiceByTitle(serviceTitle) {
    const id = await getServiceId(serviceTitle);
    const services = await getServiceProvidersForService(id);
    return services;
  }


  return {
    getService,
    getAllServices,
    getServiceId,
    getServiceProvidersForService,
    getServiceProvidersForServiceByTitle,
  };
}

module.exports = servicesController();
