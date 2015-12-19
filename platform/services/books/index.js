'use strict';

/***********************************************************************************************************************************************
 * REEDSY BOOKS MODEL
 ***********************************************************************************************************************************************
 * @description
 */
var Books = Reedsy.DAL('books'),
    q = require('q');

//
// MODEL API
//------------------------------------------------------------------------------------------//
// @description
module.exports = {
  find: findBooks
};

/**
 * Find Books
 * @param id
 * @returns {*}
 */
function findBooks(id) {
  var def = q.defer();

  // If and ID is passed, auto-normalize to Object ID
  Books.find((id && {query:{_id: (new Reedsy.DAL.mongodb.objectid(id))}} || {query: {}}))
    .then(function(books) {
      def.resolve(books);
    }, function(err) {
      def.reject(err);
    });

  return def.promise;
}

