/***********************************************************************************************************************************************
 * BOOKS MODULE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Public.Books', [
      'Books.Book'
    ])
    .config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'public/books/books.html',
        controller: 'Books.Controller'
      });
    });
})();
