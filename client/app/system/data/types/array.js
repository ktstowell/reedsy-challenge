/***********************************************************************************************************************************************
 * REEDSY SYSTEM - DATA - TYPES - ARRAY
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('System.Data')
    .service('Types.Array', [function() {

      return function() {
        this.data = [];
        this.data.clean = clean.bind(this.data);
        this.data.fill = fill.bind(this.data);

        return this.data;
      };


      /**
       *
       * @returns {clean}
       */
      function clean() {
        this.length = 0;

        return this;
      }

      /**
       *
       * @param data
       */
      function fill(data) {
        var self = this;

        data = data || [];

        data.forEach(function(itm) {
          self.push(itm);
        });

        return this;
      }
    }]);
})();
