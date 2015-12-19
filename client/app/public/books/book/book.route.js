/***********************************************************************************************************************************************
 * REEDSY PUBLIC - BOOKS - BOOK ROUTE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy.Public')
    .config(function($routeProvider) {
      $routeProvider.when('/books/:id', {
        controller: 'Book.Controller',
        templateUrl: 'public/books/book/book.html'
      });
    })
})();
