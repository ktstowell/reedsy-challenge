/***********************************************************************************************************************************************
 * REEDSY SERVICES - BOOKS
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Services.Books', [])
    .service('Services.Books', ['$http', 'Reedsy', 'Books.Resource', function($http, Reedsy, Resource) {
      var Books = new Reedsy.System.Data.Array();

      Resource.query(function(books) {
        Books.clean().fill(books);
      });

      return Books;
    }]);
})();
