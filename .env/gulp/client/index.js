'use strict';

/***********************************************************************************************************************************************
 * REEDSY GULP CLIENT TASKS
 ***********************************************************************************************************************************************
 * @description
 */
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var tasks = require('gulp-task-listing');
var injector = require('gulp-inject');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var fsort = require('gulp-angular-filesort');
var connect = require('gulp-connect');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var rename = require('gulp-rename');
var sass;

module.exports = function(gulp, config, System) {
  var Client = {
    root: path.join(config.root, 'client') };

  Client.watch = [path.join(Client.root, 'app/**/*.js'), path.join(Client.root, 'app/**/*.html'), path.join(Client.root, 'styles/**/*.scss')];

  /**
   * Injection
   * @type {{name: string, target: string, src: string}}
   */
  Client.injector = {
    name: 'reedsy.js',
    target: path.join(Client.root, 'app/index.html')
  };

  Client.injector.src = path.join(Client.root, '.tmp', Client.injector.name);

  gulp.task('client.inject', function () {
    var target = gulp.src(Client.injector.target);
    var src = gulp.src(Client.injector.src);

    return target.pipe(injector(src, {
      transform: function () {
        return '<script src="' + Client.injector.name + '"></script>';
      }
    })).pipe(gulp.dest(Client.root + '/app'));
  });

  /**
   * Concat
   */
  Client.concat = {
    name: 'reedsy.js',
    src: path.join(Client.root, 'app/**/*.js'),
    dest: Client.root + '/.tmp/'
  };

  gulp.task('client.concat', function () {
    return gulp.src(Client.concat.src)
      .pipe(plumber())
      .pipe(fsort())
      .pipe(concat(Client.concat.name))
      .pipe(gulp.dest(Client.concat.dest));
  });

  /**
   * Client JS task wrapper
   */
  gulp.task('client.js', function (done) {
    run('client.concat', function () {
      run('client.inject', function () {
        done();
      });
    });
  });

  Client.config = {
    default: path.join(Client.root, '.config'),
    local: path.join(Client.root, '.config.local'),
    dest: path.join(Client.root, 'www')
  };

  gulp.task('client.config', function() {
    var local,
      src = Client.config.default;

    try {
      local = fs.readFileSync(Client.config.local, {encoding: 'UTF-8'});
    } catch(err) {
      console.warn('Reedsy.Client - no local config file found. Loading default.');
    }

    if(local) {
      src = Client.config.local; }

    return gulp.src(src)
      .pipe(plumber())
      .pipe(rename(function(path) {
        path.basename = 'config';
        path.extname = '.json';
      })).pipe(gulp.dest(Client.config.dest));
  });

  /**
   * Styles
   * @type {{}}
   */
  Client.styles = {
    src: Client.root + '/styles/main.scss',
    dest: Client.root + '/www'
  };

  gulp.task('client.styles', function () {
    sass = require('gulp-sass');

    return gulp.src(Client.styles.src)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest(Client.styles.dest))

  });

  /**
   * Server
   * @type {{}}
   */
  Client.server = {
    root: [Client.root + '/www', Client.root + '/.tmp'],
    port: 3000
  };

  gulp.task('client.serve', function () {
    return connect.server({
      root: Client.server.root,
      port: Client.server.port,
      livereload: true
    });
  });

  /**
  * HTML
  */
  Client.html = {
    root: path.join(Client.root, 'www/index.html'),
    src: [path.join(Client.root, 'app/**/*.html')],
    dest: path.join(Client.root, 'www')
  };

// HTML task wrapper
  gulp.task('client.html', function (done) {
    run('client.html.copy', 'client.useref', function () {
      done();
    });
  });

// Process assets - called by client.html
  gulp.task('client.useref', function () {
    return gulp.src(Client.html.root)
      .pipe(useref({searchPath: Client.root}))
      .pipe(gulp.dest(Client.root + '/www'));
  });

// Process assets -
  gulp.task('client.html.copy', function () {
    return gulp.src(Client.html.src)
      .pipe(gulp.dest(Client.html.dest));
  });

  /**
   * Images
   */
  Client.images = {
    src: path.join(Client.root, 'images', '**', '*.+(png|jpg|gif|svg)'),
    dest: path.join(Client.root, 'www', 'images')
  };

  gulp.task('client.images', function() {
    return gulp.src(Client.images.src)
      .pipe(gulp.dest(Client.images.dest));
  });

  /**
   * Fonts
   */
  Client.fonts = {
    src: path.join(Client.root, 'fonts', '**', '*.+(otf)'),
    dest: path.join(Client.root, 'www', 'fonts')
  };

  gulp.task('client.fonts', function() {
    return gulp.src(Client.fonts.src)
      .pipe(gulp.dest(Client.fonts.dest));
  });

  /**
   * Package
   */
  gulp.task('client.package', function (done) {
    run('client.concat', function () {
      run('client.inject', 'client.styles', 'client.html', 'client.images', 'client.fonts', 'client.config', function () {
        done();
      });
    });
  });

  gulp.task('client.develop', function (done) {
    run('client.serve', 'client.package', function () {
      System.watch(Client.watch);
    });
  });
};

