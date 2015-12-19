/***********************************************************************************************************************************************
 * REEDSY SERVICES - BOOKS - RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Services.Books')
    .service('Books.Resource', ['Reedsy.System', '$resource', function(System, $resource) {
      return $resource(System.Config.platform + '/books');
    }]);
})();
