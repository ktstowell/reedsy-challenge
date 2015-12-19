'use strict';

/***********************************************************************************************************************************************
 * REEDSY PUBLIC - BOOKS CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Public.Books')
    .controller('Books.Controller', ['$scope', 'Reedsy.Services', function($scope, Services) {
      $scope.books = Services.Books;
    }]);
})();
