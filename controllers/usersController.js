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
      if (req.user.adminRights) {
      // debug(req.user);
        next();
      }
    } else {
      res.redirect('/users/signin');
    }
  }

  function addUser(req, res, username, password, email) {
    const request = new sql.Request();
    // debug(`username : ${username} ### pass : ${password} ###  email : ${email}`);
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.input('pEmail', sql.NVarChar, email);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspAddUser', (err, result) => {
      if (!err) {
        if (result.output.responseMessage === 'Success') {
          req.login(req.body, () => {
            res.redirect('/users/editProfile');
          });
        } else {
          res.send(result.output.responseMessage);
        }
      } else {
        res.send(err);
      }
    });
  }

  function getUserInfo(username, password) {
    const request = new sql.Request();
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    // request.output('responseMessage', sql.NVarChar);
    request.execute('uspUserInfo', (err, result) => {
      debug(err);
      debug(result);
      const {
        // eslint-disable-next-line camelcase
        first_name, last_name, email, admin_rights, profile_pic_url,
      } = result;
      const userInfo = {
        username, first_name, last_name, email, admin_rights, profile_pic_url,
      };
      debug('userInfo');
      debug(userInfo);
    });
  }


  function loginUser(username, password, done) {
    const request = new sql.Request();
    request.input('pLoginName', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspLogin', (err, result) => {
      if (!err) {
        // debug(result);
        if (result.output.responseMessage === 'User successfully logged in') {
          // ONLY FOR TEST PORPUSE : Should be edited
          const adminRights = true;
          getUserInfo(username, password);
          done(null, { username, adminRights });
        } else {
          done(null, false);
        }
      } else {
        done(err, false);
      }
    });
  }

  function addGUser(username, password, email, done) {
    const request = new sql.Request();
    // debug(`username : ${username} ### pass : ${password} ###  email : ${email}`);
    request.input('pLogin', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.input('pEmail', sql.NVarChar, email);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspAddUser', (err, result) => {
      // debug(err);
      // debug(result);
      if (result.returnValue !== 0) {
        loginUser(username, password, done);
      }
    });
  }

  return {
    routeProtection,
    addUser,
    loginUser,
    routeProtectionAdmin,
    addGUser,
    getUserInfo,
  };
}


module.exports = usersController;
