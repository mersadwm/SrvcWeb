const debug = require('debug')('app:servicesController');
const defined = require('defined');

const sql = require('mssql');


function servicesController() {
  /**
   * Get service provider with the service user id
   * @param {number} id user id
   */
  async function getServiceProvidersForService(id) {
    const request = new sql.Request();
    request.input('pServices', sql.NVarChar, id);
    const {
      recordset
    } = await request.execute('uspSearchServiceProvider');
    return recordset;
  }
  /**
   * Get all services
   */
  async function getAllServices() {
    const request = new sql.Request();
    const {
      recordset
    } = await request.execute('uspGetAllServicesOfProviders');
    return recordset;
  }
  /**
   * Get the service id with service title
   * @param {string} serviceTitle title of sub service
   */
  async function getServiceId(serviceTitle) {
    const request = new sql.Request();
    const {
      recordset
    } = await request.query(`select id from services where title = '${serviceTitle}'`);
    const serviceId = defined(recordset[0], {
      id: 0
    });
    return serviceId.id;
  }
  /**
   * get all services of a service provider with service provider id
   * @param {number} providerUserId service provider id
   */
  async function getAllServicesForProvider(providerUserId) {
    const dataRaw = await getAllServices();
    const dataCollection = [];
    for (let index = 0; index < dataRaw.length; index++) {
      const element = dataRaw[index];
      if (element.user_id[0] === providerUserId) {
        dataCollection.push(element);
      }
    }
    return dataCollection;
  }
  /**
   * get all service provider who have one or more services
   * @param {string} serviceTitle title of sub service
   */
  async function getServiceProvidersForServiceByTitle(serviceTitle) {
    const id = await getServiceId(serviceTitle);
    const services = await getServiceProvidersForService(id);
    return services;
  }
  /**
   * Advance search with keyword
   * @param {string} keyword name of service which user want to search for it
   */
  async function advancedSearch(keyword, zip, range) {
    const word = keyword.toLowerCase();
    const dataArr = await getAllServices();
    const dataCollectionPrimary = [];
    const dataCollectionSecondary = [];
    const dataCollectionMinor = [];
    for (let index = 0; index < dataArr.length; index++) {
      const element = dataArr[index];
      if (element.title.includes(word)) {
        dataCollectionPrimary.push(element);
      } else if (element.category.includes(word)) {
        dataCollectionSecondary.push(element);
      } else if (element.super_cat.includes(word)) {
        dataCollectionMinor.push(element);
      }
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