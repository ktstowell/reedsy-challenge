'use strict';

/***********************************************************************************************************************************************
 * REEDSY CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
var fs = require('fs');
var log = (new (require('log')));

module.exports = function(config) {
  var data;

  config = config || {};
  config.path = config.path || process.cwd();

  try {
    data = fs.readFileSync(config.path +'/' + config.primary);
    log.info('Reedsy.System.Config - loading values from local config: '+ e);
  } catch(e) {
    log.info('Reedsy.System.Config - No primary config specified, attempting to load default: '+ e);
    try {
      data = fs.readFileSync(config.path +'/' + config.defaults);
    } catch(e) {
      log.error('Reedsy.System.Config - There was an error loading the config file: '+ e);
    }
  }

  return (data && JSON.parse(data));
};
