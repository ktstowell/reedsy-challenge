'use strict';

/***********************************************************************************************************************************************
 * REEDSY PLATFORM GULP TASKS
 ***********************************************************************************************************************************************
 * @description
 */
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var run = require('run-sequence');
var chalk = require('chalk');
var path = require('path');

module.exports = function(gulp, config, System) {
  var Platform = {
    root: path.join(config.root, 'platform') };

  Platform.watch = [path.join(Platform.root, '**/*.js')];

  Platform.commands = {
    stop: 'forever stop reedsy',
    start: 'forever --uid reedsy -o /var/log/reedsy.node.log -e /var/log/reedsy.node.log -a -w --watchDirectory /vagrant/platform  start /vagrant/platform/server.js',
    list: 'forever list',
    logs: {bin: 'tail', args: ['-f', '/var/log/reedsy.node.log']}
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

  /**
   * Platform
   */
  gulp.task('platform.develop', function() {
    System.watch(Platform.watch);

    run('platform.refresh');

    spawn(Platform.commands.logs.bin, Platform.commands.logs.args).stdout.on('data', function(data) {
      console.log(chalk.blue.bold('PLATFORM.NODE.LOGS: '), data.toString());
    });

  });
};
