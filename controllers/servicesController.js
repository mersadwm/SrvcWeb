const debug = require('debug')('app:servicesController');
const defined = require('defined');

const sql = require('mssql');


function servicesController() {
  function getService(id) {
    const request = new sql.Request();
    const result = request.input('id', sql.NVarChar, id).query('select * from services where id=@id');
    debug('##servicesController###############################');
    debug(result);
    debug(id);
    debug('########################');
    return result;
  }

  async function getServiceProvidersForService(id) {
    const request = new sql.Request();
    request.input('pServices', sql.NVarChar, id);
    const result = await request.execute('uspSearchServiceProvider');
    debug('##getServiceProvidersForService###############################');
    debug(result);
    debug(id);
    debug('########################');
    return result;
  }


  async function getAllServices() {
    const request = new sql.Request();
    const result = await request.execute('uspGetAllServicesOfProviders');
    debug('##getAllServices###############################');
    debug(result);
    debug('########################');
    return result;
  }

  async function getServiceId(serviceTitle) {
    const request = new sql.Request();
    const result = await request.query(`select id from services where title = '${serviceTitle}'`);
    debug('##getServiceProvidersForService###############################');
    debug(result);
    debug(serviceTitle);
    debug('########################');
    return result;
  }


  async function getServiceProvidersForServiceByTitle(serviceTitle) {
    const serviceIdSet = await getServiceId(serviceTitle);
    const serviceId = defined(serviceIdSet, [{ id: 0 }]);
    const services = await getServiceProvidersForService(serviceId.id);
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
