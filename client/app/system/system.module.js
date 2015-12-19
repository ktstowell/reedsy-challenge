/***********************************************************************************************************************************************
 * REEDSY SYSTEM
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy.System', [
      'System.Config',
      'System.Components',
      'System.Data',
      'System.Filters'
    ])
    .service('Reedsy.System', ['$injector', function($injector) {
      return {
        get Config() {
          return $injector.get('System.Config');
        },
        get Data() {
          return $injector.get('System.Data');
        }
      };
    }]);
})();
