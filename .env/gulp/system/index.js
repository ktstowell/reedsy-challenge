'use strict';

/***********************************************************************************************************************************************
 * REEDAYS GULP SYSTEM TASKS
 ***********************************************************************************************************************************************
 * @description
 */
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var tasks = require('gulp-task-listing');
var connect = require('gulp-connect');

module.exports = function(gulp, config) {
  var System = {};

  /**
   * LINTING
   * @type {{}}
   */
  System.linter = {
    src: [config.client + '/app/**/*.js', config.platform + '/**/*.js']
  };

  gulp.task('lint', function () {
    return gulp.src(System.linter.src)
      .pipe(plumber())
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  /**
   * WATCHING
   * @type {{}}
   */
  System.watch = {
    tasks: {
      linter: {query: ['.js'], action: ['lint']},
      styles: {query: ['client', '.scss'], action: ['client.styles'], reload: true},
      concat: {query: ['client', '.js'], action: ['client.js'], reload: true},
      package: {query: ['client', '.html'], action: ['client.html'], reload: true},
      refresh: {query: ['platform'], action: ['platform.refresh']}
    },
    parse: function (file, fn) {
      var self = this;

      // Loop through each strategy, and determine elligible tasks
      Object.keys(this.tasks).forEach(function (task) {
        var matches = self.tasks[task].query.filter(function (str) {
          return file.path.match((new RegExp(str)));
        }).length;

        if (matches === self.tasks[task].query.length) {
          fn(null, self.tasks[task].action, self.tasks[task]);
        } else {
          fn('No matches for file.');
        }
      });
    }
  };

  return {
    watch: watch,
    reload: reload
  };

  /**
   * Watch
   * @param src
   * @returns {*}
     */
  function watch(src) {

    return gulp.watch(src, function (file) {

      System.watch.parse(file, function (err, task, config) {

        if (!err && gulp.tasks[task]) {
          run(task, function () {
            if (config && config.reload) {
              reload(file.path);
            }
          });
        }
      });
    });
  }

  /**
   * Reload
   * @param file
   * @returns {*}
   */
  function reload(file) {
    return gulp.src(file)
      .pipe(connect.reload());
  }

};
