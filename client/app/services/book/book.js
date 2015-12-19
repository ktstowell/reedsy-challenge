/***********************************************************************************************************************************************
 * REEDSY SERVICES - BOOK
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Services.Book', [])
    .service('Services.Book', ['Book.Resource', 'Reedsy.System', function(Resource, System) {
      var Book = new System.Data.Object();

      return {
        data: Book,
        init: init
      };

      function init(id) {
        Resource.fetch({id: id}, function(book) {
          Book.clean().fill(book[0]);
        });
      }
    }]);
})();
