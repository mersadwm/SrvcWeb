// const debug = require('debug')('app:usersController');
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

  function loginUser(username, password, done) {
    const request = new sql.Request();
    request.input('pLoginName', sql.NVarChar, username);
    request.input('pPassword', sql.NVarChar, password);
    request.output('responseMessage', sql.NVarChar);
    request.execute('uspLogin', (err, result) => {
      if (!err) {
        // debug(result);
        if (result.output.responseMessage === 'User successfully logged in') {
          done(null, { username });
        } else {
          done(null, false);
        }
      } else {
        done(err, false);
      }
    });
  }

  return {
    routeProtection,
    addUser,
    loginUser,
  };
}


module.exports = usersController;
