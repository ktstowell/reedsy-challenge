/***********************************************************************************************************************************************
 * * REEDSY PUBLIC - BOOKS - BOOK CONTROLLLER
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Books.Book')
    .controller('Book.Controller', ['$scope', '$routeParams', 'Reedsy.Services', function($scope, $params, Services) {
      $scope.book = Services.Book.data;

      // Init service
      Services.Book.init($params.id);
    }]);
})();
