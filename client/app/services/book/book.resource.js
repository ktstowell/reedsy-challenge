/***********************************************************************************************************************************************
 * REEDSY SERVICES - BOOK - RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Services.Book')
    .service('Book.Resource', ['$resource', 'Reedsy.System', function($resource, System) {
      return $resource(System.Config.platform + '/books/:id', {}, {fetch: {method: 'GET', isArray: true}});
    }]);
})();
