'use strict';

/***********************************************************************************************************************************************
 * NPM SCRIPTS RUNNER
 ***********************************************************************************************************************************************
 * @description
 */
var q = require('q');
var spawn = require('child_process').spawn;

//
// SCRIPTS API
//------------------------------------------------------------------------------------------//
// @description
module.exports = {
  run: run
};

//
// SCRIPTS FUNCTIONS
//------------------------------------------------------------------------------------------//
// @description

/**
 * RUN
 * @param script
 */
function run(script) {
  var def = q.defer(),
      stream = spawn('bash', [script], {stdio: 'inherit'});

  stream.on('close', function(code) {
    def[(code === 0? 'resolve': 'reject')]();
  });

  return def.promise;
}
