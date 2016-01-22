'use strict';

/***********************************************************************************************************************************************
 * REEDSY DEV OPS
 ***********************************************************************************************************************************************
 * @description
 */

// Required Packages - break this stuff out
var gulp = require('gulp');
var tasks = require('gulp-task-listing');
var path = require('path');
var spawn = require('child_process').spawn;

// Dev Packages
var tap = require('gulp-tap');

//
// ENVIRONMENT CONFIG
//------------------------------------------------------------------------------------------//
// @description
var CONFIG = {};
    CONFIG.root = __dirname;
    CONFIG.gulp = path.join(CONFIG.root, '.env', 'gulp');

//
// LOAD TASKS
//------------------------------------------------------------------------------------------//
// @description
var System = require(path.join(CONFIG.gulp, 'system'))(gulp, CONFIG);
var Client = require(path.join(CONFIG.gulp, 'client'))(gulp, CONFIG, System);
var Platform = require(path.join(CONFIG.gulp, 'platform'))(gulp, CONFIG, System);
gulp.task('help', tasks);


//
// DEVELOPMENT
//------------------------------------------------------------------------------------------//
// @description

 gulp.task('develop', function(done) {
   var client = spawn('gulp', ['client.develop'], {stdio: 'inherit'});
   var platform = spawn('gulp', ['platform.develop'], {stdio: 'inherit'});
 });
