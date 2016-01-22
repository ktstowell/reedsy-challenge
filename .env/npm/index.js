'use strict';

/***********************************************************************************************************************************************
 * REEDSY NPM SCRIPTS
 ***********************************************************************************************************************************************
 * @description
 */
var exec = require('child_process').exec;
var path = require('path');
var ascii = require('ascii-art');
var scripts = require('./scripts');

//
// PATHS
//------------------------------------------------------------------------------------------//
// @description
var root = process.cwd();
var npm = __dirname;
var start = path.join(npm, 'start', 'start.sh');

//
// PREP
//------------------------------------------------------------------------------------------//
// @description
ascii.font('Reedsy', 'Doom', function(rendered) {
  console.log(rendered);

  scripts.run(start)
    .catch(function(err) {
      console.log((err || 'Closing Reedsy development session. Wewt!'))
    });
});
