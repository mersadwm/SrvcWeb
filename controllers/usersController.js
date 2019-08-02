const debug = require('debug')('app:usersController');
const sql = require('mssql');
const defined = require('defined');


function usersController() {
  function routeProtection(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/users/signin');
    }
  }

  function routeProtectionAdmin(req, res, next) {
    if (req.user) {
      if (req.user.admin_rights) {
        next();
      }
    } else {
      res.redirect('/users/signin');
    }
  }
  /**
   * Get user information with username and password
   * @param {string} username username
   * @param {password} password password
   */
  function getUserInfo(username, password) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    const result = request.execute('uspUserInfo');
    return result;
  }
  /**
   * Login user
   * @param {string} username username
   * @param {password} password password
   */
  function loginUser(username, password) {
    const request = new sql.Request();
    request.input('pLoginName', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.output('responseMessage', sql.NVarChar);
    const result = request.execute('uspLogin');
    return result;
  }
  /**
   * Add user address to database
   * @param {string} username username
   */
  async function addNewUsersAddress(username) {
    const request = new sql.Request();
    request.query(`INSERT INTO user_address (login_name, address_1, address_2, address_3, PLZ, city_name, state_name, Country)
    VALUES('${username}', ' ', NULL, NULL, 00000, ' ', ' ', ' ')`);
  }
  /**
   * Add new user to database
   * @param {string} username username
   * @param {password} password password
   * @param {email} email email
   */
  function addUser(username, password, email) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.input('pEmail', sql.NVarChar, email);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspAddUser');
    addNewUsersAddress(username);
  }
  /**
   * Update user information
   * @param {string} username username
   * @param {email} email email
   * @param {string} firstName firstname
   * @param {string} lastName lastname
   */
  async function updateUserInfo(username, email, firstName, lastName) {
    const request = new sql.Request();
    // debug(username, email, firstName, lastName);
    // await can be removed.
    await request.query(`update users set FIRST_NAME = '${firstName}', LAST_NAME = '${lastName}', email = '${email}' where LOGIN_NAME = '${username}'`);
  }
  /**
   * Update user address
   * @param {string} username username
   * @param {string} address1 address1
   * @param {string} address2 address2
   * @param {string} address3 address3
   * @param {string} city city
   * @param {string} state state
   * @param {string} country country
   * @param {number} zipcode zipcode
   */
  async function updateUserAddress(username, address1, address2, address3, city, state, country, zipcode) {
    const request = new sql.Request();
    request.query(`update user_address set address_1 = '${address1}', address_2 = '${address2}', address_3 = '${address3}', city_name = '${city}', state_name = '${state}', Country = '${country}', PLZ = ${zipcode} where login_name = '${username}'`, (err, result) => {
      if (err) {
        addNewUsersAddress(username);
      }
    });
  }

  async function updateUserPassword(username, password, passwordNew) {
    // debug(username);
  }
  /**
   * Update profile pic
   * @param {string} username username
   * @param {URL} profilePic url of pic
   */
  async function updateUserProfilePic(username, profilePic) {
    const request = new sql.Request();
    await request.query(`update users set PROFILE_PIC_URL = '${profilePic}' where LOGIN_NAME = '${username}'`);
  }
  /**
   * Add services for service provider
   * @param {string} service service name
   * @param {string} loginName login name
   */
  async function addServiceProviderService(service, loginName) {
    for (let index = 0; index < service.length - 1; index++) {
      const request = new sql.Request();
      debug(`index before ++index: ${index}`);
      const serviceName = service[index];
      const lowerCaseServise = serviceName.toLowerCase();
      const moreInfo = service[++index];
      debug(`index after ++index: ${index}`);
      request.input('pLogin', sql.NVarChar, loginName);
      request.input('pservice', sql.NVarChar, lowerCaseServise.trim());
      request.input('pmore_info', sql.NVarChar, moreInfo);
      request.execute('uspServices_ref');
      debug(`service : ${lowerCaseServise.trim()}`);
    }
  }
  /**
   * Add service provider information
   */
  async function addServiceProviderInfo(username, companyName, address, phone, website, email, zipCode, city, aboutme) {
    const request = new sql.Request();
    const verified = 0;
    const userId = await request.query(`select user_id from users where login_name = '${username}'`);
    const user = await request.query(`select * from service_providers where login_user = '${username}'`);
    if (user.rowsAffected[0] === 0) {
      request.input('plogin_user', sql.NVarChar, username);
      request.input('puser_id', sql.Int, userId.recordset[0].user_id);
      request.input('pcompany_name', sql.NVarChar, companyName);
      request.input('paddress_sp', sql.NVarChar, address);
      request.input('ptelephone', sql.NVarChar, phone);
      request.input('pwebsite_link', sql.NVarChar, website);
      request.input('pcontact_email', sql.NVarChar, email);
      request.input('pzip', sql.Int, zipCode);
      request.input('pcity', sql.NVarChar, city);
      request.input('pabout_me', sql.NVarChar, aboutme);
      request.input('pverified', sql.Bit, verified);
      request.execute('uspService_Provider');
    } else {
      request.query(`update service_providers set company_name = '${companyName}', address_sp = '${address}', telephone = '${phone}', website_link = '${website}', contact_email = '${email}', zip = '${zipCode}', city = '${city}', about_me = '${aboutme}' where login_user = '${username}'`);
    }
    debug(user.rowsAffected[0]);
  }
  /**
   * Get service provider information
   * @param {string} username username
   */
  async function getServiceProviderInfo(username) {
    const request = new sql.Request();
    const result = await request.query(`select * from service_providers where login_user = '${username}'`);
    debug(result);
    const returnVal = defined(result.recordset[0], {
      company_name: '',
      address_sp: '',
      telephone: 0,
      website_link: '',
      contact_email: '',
      zip: 0,
      city: '',
      about_me: '',
      verified: false,
    });
    return returnVal;
  }
  /**
   * Give admin access to a user
   * @param {string} username username
   * @param {boolean} operationMode admin right
   */
  async function upgradeToAdmin(username, operationMode) {
    const request = new sql.Request();
    request.query(`update users set admin_rights = ${operationMode} where login_name = '${username}'`);
  }
  /**
   * Verfy service provider
   * @param {string} username username
   * @param {boolean} operationMode verified or not
   */
  async function verifyServiceProvider(username, operationMode) {
    const request = new sql.Request();
    request.query(`update service_providers set verified = ${operationMode} where login_user = '${username}'`);
  }
  /**
   * Delete service from a service provider
   * @param {number} userId user id
   * @param {number} spId service provider id
   */
  function deleteService(userId, spId) {
    const request = new sql.Request();
    request.query(`delete from service_prividers_ref where user_id = ${userId} and sp_id = ${spId}`, (err, result) => { debug(err); debug(result); });
    debug(userId);
    debug(spId);
  }
  return {
    routeProtection,
    addUser,
    loginUser,
    routeProtectionAdmin,
    getUserInfo,
    updateUserInfo,
    updateUserProfilePic,
    updateUserPassword,
    updateUserAddress,
    addServiceProviderInfo,
    addServiceProviderService,
    getServiceProviderInfo,
    upgradeToAdmin,
    verifyServiceProvider,
    deleteService,
  };
}


module.exports = usersController();