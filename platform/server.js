'use strict';

/***********************************************************************************************************************************************
 * REEDSY PLATFORM SERVER
 ***********************************************************************************************************************************************
 * @description
 */

//
// SYSTEM
//------------------------------------------------------------------------------------------//
// @description
var System = require('./system'),
    Config = System.Config({path: __dirname, primary: '.config.local', defaults: '.config'});


// REEDSY PROCESS NAMESPACE
//------------------------------------------------------------------------------------------//
// @description
global.Reedsy = {
  Router: System.Router.instance,
  Config: Config,
  DAL: System.DAL(Config.database),
  Log: (new (require('log'))(Config.log)),
  Errors: System.Errors
};

//
// SERVICES
//------------------------------------------------------------------------------------------//
// @description
//
var Services;

//
// APPLICATION
//------------------------------------------------------------------------------------------//
// @description
var Application;

//
// INIT
//------------------------------------------------------------------------------------------//
// @description
Reedsy.DAL.start()
  .then(function() {
    // Log
    Reedsy.Log.info('Reedsy.System.DAL - Database connection successful');
    // Load services now that we have a DB connection.
    Services = Reedsy.Services = require('./services');
    // Start Router
    return System.Router.start(Config.router);
  }, function(err) {
    throw new Error(Reedsy.Log.error('Reedsy - failed to start application: '+ err));
  }).then(function() {
    // Log
    Reedsy.Log.info('Reedsy.System.Router - Server started successfully on: '+ Config.router.port);
    // Bind application routes now that there's a router instance
    Application = require('./application');
  }, function(err) {
    throw new Error(Reedsy.Log.error('Reedsy - failed to start application: '+ err));
  }).done();
