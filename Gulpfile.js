'use strict';

/***********************************************************************************************************************************************
 * REEDSY DEV OPS
 ***********************************************************************************************************************************************
 * @description
 */

// Required Packages - break this stuff out
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var tasks = require('gulp-task-listing');
var injector = require('gulp-inject');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var fsort = require('gulp-angular-filesort');
var sass;
var connect = require('gulp-connect');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var rename = require('gulp-rename');

// Dev Packages
var tap = require('gulp-tap');

//
// TASK NAMESPACES
//------------------------------------------------------------------------------------------//
// @description
var Platform = {},
  Client = {},
  System = {};


//
// ENVIRONMENT CONFIG
//------------------------------------------------------------------------------------------//
// @description
var CONFIG = {};
    CONFIG.root = __dirname;
    CONFIG.client = CONFIG.root + '/client';
    CONFIG.platform = CONFIG.root + '/platform';

//
// SYSTEM TASKS
//------------------------------------------------------------------------------------------//
// @description

/**
 * HELP
 * @type {{}}
 */
gulp.task('help', tasks);

/**
 * LINTING
 * @type {{}}
 */
System.linter = {
  src: [CONFIG.
    client + '/app/**/*.js', CONFIG.platform + '/**/*.js']
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
  src: {
    platform: [CONFIG.platform + '/**/*.js'],
    client: [CONFIG.client + '/app/**/*.js', CONFIG.client + '/app/**/*.html', CONFIG.client + '/styles/**/*.scss']
  },
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

//
// CLIENT TASKS
//------------------------------------------------------------------------------------------//
// @description

/**
 * Injection
 * @type {{name: string, target: string, src: string}}
 */
Client.injector = {
  name: 'reedsy.js',
  target: CONFIG.client + '/app/index.html'
};

Client.injector.src = path.join(CONFIG.client, '.tmp', Client.injector.name);

gulp.task('client.inject', function () {
  var target = gulp.src(Client.injector.target);
  var src = gulp.src(Client.injector.src);

  return target.pipe(injector(src, {
    transform: function () {
      return '<script src="' + Client.injector.name + '"></script>';
    }
  })).pipe(gulp.dest(CONFIG.client + '/app'));
});

/**
 * Concat
 */
Client.concat = {
  name: 'reedsy.js',
  src: CONFIG.client + '/app/**/*.js',
  dest: CONFIG.client + '/.tmp/'
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
  default: path.join(CONFIG.client, '.config'),
  local: path.join(CONFIG.client, '.config.local'),
  dest: path.join(CONFIG.client, 'www')
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
  src: CONFIG.client + '/styles/main.scss',
  dest: CONFIG.client + '/www'
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
  root: [CONFIG.client + '/www', CONFIG.client + '/.tmp'],
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
 * Reload
 * @param file
 * @returns {*}
 */
function reload(file) {
  return gulp.src(file)
    .pipe(connect.reload());
}

/**
 * HTML
 */
Client.html = {
  root: CONFIG.client + '/www/index.html',
  src: [CONFIG.client + '/app/**/*.html'],
  dest: CONFIG.client + '/www'
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
    .pipe(useref({searchPath: CONFIG.client}))
    .pipe(gulp.dest(CONFIG.client + '/www'));
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
  src: path.join(CONFIG.client, 'images', '**', '*.+(png|jpg|gif|svg)'),
  dest: path.join(CONFIG.client, 'www', 'images')
};

gulp.task('client.images', function() {
  return gulp.src(Client.images.src)
    .pipe(gulp.dest(Client.images.dest));
});

/**
 * Fonts
 */
Client.fonts = {
  src: path.join(CONFIG.client, 'fonts', '**', '*.+(otf)'),
  dest: path.join(CONFIG.client, 'www', 'fonts')
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

//
// PLATFORM TASKS
//------------------------------------------------------------------------------------------//
// @description
Platform.commands = {
  stop: 'forever stop reedsy',
  start: 'forever --uid reedsy -o /var/log/reedsy.node.log -e /var/log/reedsy.node.log -a -w --watchDirectory /vagrant/platform  start /vagrant/platform/server.js',
  list: 'forever list'
};

gulp.task('platform.refresh', function(done) {
  exec(Platform.commands.stop, function(err, stdout, stderr) {
    console.log(stderr)
    exec(Platform.commands.start, {shell: '/bin/bash'}, function(err, stdout, stderr) {
      console.log(stderr)
      exec(Platform.commands.list, function() {
        done();
      });
    });
  });
});

//
// DEVELOPMENT
//------------------------------------------------------------------------------------------//
// @description

/**
 * Client
 */
gulp.task('client.develop', function (done) {
  run('client.serve', 'client.package', function () {
    watch(System.watch.src.client);
  });
});

/**
 * Platform
 */
gulp.task('platform.develop', function() {
  watch(System.watch.src.platform);
});
