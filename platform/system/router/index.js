'use strict';

/***********************************************************************************************************************************************
 * REEDSY ROUTER
 ***********************************************************************************************************************************************
 * @description
 */

var router = require('express')();
var log = (new (require('log')));
var q = require('q');

/**
 * Router defaults
 * @type {{port: number}}
 */
var defaults = {
  port: 3000
};

/**
 * Router API
 * @param config
 */
module.exports = {
  start: start,
  get instance () {
    return router;
  }
};

/**
 * Start
 * @param config
 * @returns {*}
 */
function start(config) {
  var def = q.defer();

  router.listen((config.port || defaults.port), function() {
    def.resolve();
  });

  return def.promise;
}

//
// CORS
//------------------------------------------------------------------------------------------//
// @description
router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

//
// LOGGING
//------------------------------------------------------------------------------------------//
// @description
router.all('*', function(req, res, next) {
  next();
});
