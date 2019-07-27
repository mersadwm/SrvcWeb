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

  function addServiceForProviderService(service) {
    for (let index = 0; index < service.length; index++) {
      const element = service[index];
    }
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
    updateUserAddress,
  };
}


module.exports = usersController();
