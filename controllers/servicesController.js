const debug = require('debug')('app:servicesController');
const defined = require('defined');

const sql = require('mssql');


function servicesController() {
  async function getServiceProvidersForService(id) {
    const request = new sql.Request();
    request.input('pServices', sql.NVarChar, id);
    const { recordset } = await request.execute('uspSearchServiceProvider');
    return recordset;
  }


  async function getAllServices() {
    const request = new sql.Request();
    const { recordset } = await request.execute('uspGetAllServicesOfProviders');
    return recordset;
  }

  async function getServiceId(serviceTitle) {
    const request = new sql.Request();
    const { recordset } = await request.query(`select id from services where title = '${serviceTitle}'`);
    const serviceId = defined(recordset[0], { id: 0 });
    return serviceId.id;
  }

  async function getAllServicesForProvider(providerUserId) {
    const dataRaw = await getAllServices();
    const dataCollection = [];
    for (let index = 0; index < dataRaw.length; index++) {
      const element = dataRaw[index];
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
    const dataArr = await getAllServices();
    const dataCollectionPrimary = [];
    const dataCollectionSecondary = [];
    const dataCollectionMinor = [];
    for (let index = 0; index < dataArr.length; index++) {
      const element = dataArr[index];
      if (element.title.includes(keyword)) {
        dataCollectionPrimary.push(element);
      } else if (element.category.includes(keyword)) {
        dataCollectionSecondary.push(element);
      } else if (element.super_cat.includes(keyword)) {
        dataCollectionMinor.push(element);
      }
      debug(element);
      debug('###############');
    }
    return dataCollectionPrimary.concat(dataCollectionSecondary.concat(dataCollectionMinor));
  }


  return {
    getAllServices,
    getServiceId,
    getServiceProvidersForService,
    getServiceProvidersForServiceByTitle,
    advancedSearch,
    getAllServicesForProvider,
  };
}

module.exports = servicesController();
