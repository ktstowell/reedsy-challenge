/***********************************************************************************************************************************************
 * REEDSY SYSTEM - BOOKS COMPONENT
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('System.Components')
    .directive('book', [function() {
      return {
        restrict: 'A',
        scope: {
          book: '='
        },
        replace: true,
        templateUrl: 'system/components/book/book.component.html',
        link: function($scope) {

        }
      };
    }]);
})();
