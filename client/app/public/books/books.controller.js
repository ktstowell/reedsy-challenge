'use strict';

/***********************************************************************************************************************************************
 * REEDSY PUBLIC - BOOKS CONTROLLLER
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy.Public')
    .controller('Books.Controller', ['$scope', 'Reedsy.Services', function($scope, Services) {
      $scope.books = Services.Books;
    }]);
})();
