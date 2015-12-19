/***********************************************************************************************************************************************
 * REEDSY PUBLIC - MAIN ROUTE
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy.Public')
    .config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'public/books/books.html',
        controller: 'Books.Controller'
      });
    });
})();
