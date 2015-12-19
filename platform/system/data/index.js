'use strict';

/***********************************************************************************************************************************************
 * REEDSY DAL
 ***********************************************************************************************************************************************
 * @description
 */
var archives = require('archives');

module.exports = function (config) {
  // Set up DB wrapper with configured logging mode
  var api = archives({DB: config, logging: config.logging});
      api.mongodb = {
        objectid: require('mongodb').ObjectID
      };

  return api;
};
