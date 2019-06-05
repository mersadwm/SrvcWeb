const debug = require('debug')('app:users');


function usersController() {
  function routeProtection(req, res, next) {
    if (req.user) {
      debug(req.user);
      next();
    } else {
      res.redirect('/users/signin');
    }
  }


  return {
    routeProtection,
  };
}


module.exports = usersController;
