
/***********************************************************************************************************************************************
 * REEDSY SERVICES
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy.Services', [
      'Services.Books',
      'Services.Book'
    ])
    .service('Reedsy.Services', ['$injector', function($injector) {
      return {
        get Books() {
          return $injector.get('Services.Books');
        },
        Book: $injector.get('Services.Book')
      };
    }]);
})();
