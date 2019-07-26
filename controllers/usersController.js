const debug = require('debug')('app:usersController');
const sql = require('mssql');


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

  function addUser(username, password, email) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.input('pEmail', sql.NVarChar, email);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspAddUser');
  }

  async function updateUserInfo(username, email, firstName, lastName) {
    const request = new sql.Request();
    debug(username, email, firstName, lastName);
    // await can be removed.
    const answ = await request.query(`update users set FIRST_NAME = '${firstName}', LAST_NAME = '${lastName}', email = '${email}' where LOGIN_NAME = '${username}'`);
    debug(answ);
  }

  async function updateUserPassword(username, password, passwordNew) {
    debug(username);
  }

  async function updateUserProfilePic(username, profilePic) {
    const request = new sql.Request();
    // await can be removed.
    const answ = await request.query(`update users set PROFILE_PIC_URL = '${profilePic}' where LOGIN_NAME = '${username}'`);
    debug(answ);
  }

  function addServiceForProviderService(service) {
    for (let index = 0; index < service.length; index++) {
      const element = service[index];
    }
  }

  function addServiceProviderInfo(componyName, address, phone, website, email, zipCode, city, aboutme ){
    const request = new sql.Request();
    const verified = 0;
    request.input('pcompany_name', sql.NVarChar, componyName);
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

  return {
    routeProtection,
    addUser,
    loginUser,
    routeProtectionAdmin,
    getUserInfo,
    updateUserInfo,
    updateUserProfilePic,
    updateUserPassword,
    addServiceForProviderService,
    addServiceProviderInfo,
  };
}


module.exports = usersController();
