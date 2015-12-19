/***********************************************************************************************************************************************
 * REEDSY SYSTEM - DATA - TYPES - OBJECT
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('System.Data')
    .service('Types.Object', [function() {
      var methods = {
        clean: clean,
        fill: fill
      };

      return function() {
        return Object.create(methods);
      };

      function clean() {
        var self = this;

        Object.keys(this).forEach(function(key) {
          delete self[key];
        });

        return this;
      }

      function fill(data) {
        var data = (data && data.isPrototypeOf? data : {}),
            self = this;

        Object.keys(data).forEach(function(key) {
          self[key] = data[key];
        });

        return this;
      }
    }]);
})();
