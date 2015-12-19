/***********************************************************************************************************************************************
 * REEDSY SYSTEM - CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('System.Config', [])
    .service('System.Config.Init', function() {

      // Returns Config promise object
      return angular.injector(['ng']).get('$http').get('/config.json');
    });
})();
