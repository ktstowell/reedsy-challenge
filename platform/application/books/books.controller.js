'use strict';

/***********************************************************************************************************************************************
 * BOOKS CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
var Books = Reedsy.Services.Books;

//
// Books API
//------------------------------------------------------------------------------------------//
// @description
module.exports = {
  get: getBooks
};

/**
 * GET BOOKS
 * @desc  This function contacts the books service either with a param or without
 *        If a param was provided and the result set is empty, return 404.
 */
function getBooks(req, res) {

  Books.find(req.params.id)
    .then(function(books) {
      // If no param or if param and populated result
      if(!req.params.id || req.params.id && books.length) {
        res.status(200).send(books);
      } else {
        // param was provided yet no book was returned
        res.status(404).send(books);
      }
    }, function(err) {
      res.status(500).send(err);
    });
}

