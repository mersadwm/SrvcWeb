const debug = require('debug')('app:usersController');
const sql = require('mssql');
const defined = require('defined');


function usersController() {
  function routeProtection(req, res, next) {
    if (req.user) {
      // debug(req.user);
      next();
    } else {
      res.redirect('/users/signin');
    }
  }

  function routeProtectionAdmin(req, res, next) {
    if (req.user) {
      if (req.user.admin_rights) {
        // debug(req.user);
        next();
      }
    } else {
      res.redirect('/users/signin');
    }
  }


  function getUserInfo(username, password) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    const result = request.execute('uspUserInfo');
    return result;
  }

  function loginUser(username, password) {
    const request = new sql.Request();
    request.input('pLoginName', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.output('responseMessage', sql.NVarChar);
    const result = request.execute('uspLogin');
    return result;
  }

  async function addNewUsersAddress(username) {
    const request = new sql.Request();
    request.query(`INSERT INTO user_address (login_name, address_1, address_2, address_3, PLZ, city_name, state_name, Country)
    VALUES('${username}', ' ', NULL, NULL, 00000, ' ', ' ', ' ')`);
  }


  function addUser(username, password, email) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.input('pEmail', sql.NVarChar, email);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspAddUser');
    addNewUsersAddress(username);
  }

  async function updateUserInfo(username, email, firstName, lastName) {
    const request = new sql.Request();
    // debug(username, email, firstName, lastName);
    // await can be removed.
    await request.query(`update users set FIRST_NAME = '${firstName}', LAST_NAME = '${lastName}', email = '${email}' where LOGIN_NAME = '${username}'`);
  }

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

  async function updateUserProfilePic(username, profilePic) {
    const request = new sql.Request();
    // await can be removed.
    await request.query(`update users set PROFILE_PIC_URL = '${profilePic}' where LOGIN_NAME = '${username}'`);
  }

  async function addServiceProviderService(service, loginName) {
    for (let index = 0; index < service.length - 1; index++) {
      const request = new sql.Request();
      debug(`index before ++index: ${index}`);
      const serviceName = service[index];
      const moreInfo = service[++index];
      debug(`index after ++index: ${index}`);
      request.input('pLogin', sql.NVarChar, loginName);
      request.input('pservice', sql.NVarChar, serviceName.trim());
      request.input('pmore_info', sql.NVarChar, moreInfo);
      request.execute('uspServices_ref', (err, result) => {
        debug(err);
        debug(result);
      });
      // debug(serviceName , typeof moreInfo);
      // debug(service.length);
      //  debug(serviceName);
      // debug('service: ' + serviceName);
      // debug('moreinfo: ' + moreInfo);
      debug(`service : ${serviceName}`);
      debug(`moreinfo : ${moreInfo}`);
    }
  }

  async function addServiceProviderInfo(username, componyName, address, phone, website, email, zipCode, city, aboutme) {
    const request = new sql.Request();
    const verified = 0;
    const user = await request.query(`select * from service_providers where login_user = '${username}'`);
    if (user.rowsAffected[0] === 0) {
      request.input('pcompany_name', sql.NVarChar, componyName);
      request.input('plogin_user', sql.NVarChar, username);
      request.input('paddress_sp', sql.NVarChar, address);
      request.input('ptelephone', sql.NVarChar, phone);
      request.input('pwebsite_link', sql.NVarChar, website);
      request.input('pcontact_email', sql.NVarChar, email);
      request.input('pzip', sql.Int, zipCode);
      request.input('pcity', sql.NVarChar, city);
      request.input('pabout_me', sql.NVarChar, aboutme);
      request.input('pverified', sql.Bit, verified);
      request.execute('uspService_Provider');
    }
    debug(user.rowsAffected[0]);
  }

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


  async function upgradeToAdmin(username, operationMode) {
    const request = new sql.Request();
    request.query(`update users set admin_rights = ${operationMode} where login_name = '${username}'`);
  }

  async function verifyServiceProvider(username, operationMode) {
    const request = new sql.Request();
    request.query(`update service_providers set verified = ${operationMode} where login_user = '${username}'`);
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
  };
}


module.exports = usersController();