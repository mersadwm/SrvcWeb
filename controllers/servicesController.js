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

  async function getAllServicesForProvider(providerUserId) {
    const { recordset } = await getAllServices();
    const dataCollection = [];
    for (let index = 0; index < recordset.length; index++) {
      const element = recordset[index];
      if (element.user_id[0] === providerUserId) {
        dataCollection.push(element);
      }
    }
    debug(dataCollection);
    return dataCollection;
  }

  async function getServiceProvidersForServiceByTitle(serviceTitle) {
    const id = await getServiceId(serviceTitle);
    const services = await getServiceProvidersForService(id);
    return services;
  }

  async function advancedSearch(keyword, zip, range) {
    const { recordset } = await getAllServices();

    for (let index = 0; index < recordset.length; index++) {
      const element = recordset[index];
      debug(element);
      debug('###############');
    }
  }


  return {
    getService,
    getAllServices,
    getServiceId,
    getServiceProvidersForService,
    getServiceProvidersForServiceByTitle,
    advancedSearch,
    getAllServicesForProvider,
  };
}

module.exports = servicesController();
