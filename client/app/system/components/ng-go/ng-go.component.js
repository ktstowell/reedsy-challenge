/***********************************************************************************************************************************************
 * REEDSY COMPOENENTS - NG-GO
 ***********************************************************************************************************************************************
 * @description global $location.path alias for reusability
 */
(function() {
  'use strict';

  angular.module('System.Components')
    .directive('ngGo', function($location, $timeout) {

      function click(evt) {
        var path = [].filter.call(evt.target.attributes, function(attr) {
          return attr.name === "ng-go";
        })[0];

        $timeout(function() {
          $location.path(path.value);
        });
      }

      return {
        restrict: 'A',
        scope: true,
        link: function($scope, $element, $attrs) {
          if($attrs.ngGo) {
            $element[0].addEventListener('click', click);

            $scope.$on('$destroy', function() {
              $element[0].removeEventListener('click', click);
            });

            $element.css('cursor', 'pointer');
          }
        }
      }
    });
})();
