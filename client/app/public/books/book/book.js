/***********************************************************************************************************************************************
 * REEDSY PUBLIC - BOOKS - BOOK ROUTE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Books.Book', [])
    .config(function($routeProvider) {
      $routeProvider.when('/books/:id', {
        controller: 'Book.Controller',
        templateUrl: 'public/books/book/book.html'
      });
    })
})();
