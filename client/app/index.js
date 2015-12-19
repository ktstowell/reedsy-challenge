/***********************************************************************************************************************************************
 * REEDSY
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('Reedsy', [
    'ngRoute',
    'ngResource',
    'Reedsy.System',
    'Reedsy.Services',
    'Reedsy.Public'
  ]).service('Reedsy', ['Reedsy.Services', 'Reedsy.System', function(Services, System) {
    window.Reedsy = {
      Services: Services,
      System: System
    };

    return window.Reedsy;
  }]).config(function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });

  //
  // Reedsy Application Bootstrap
  //------------------------------------------------------------------------------------------//
  // @description Here we manually bootstrap the application after the config
  //              data has been loaded.
  angular.injector(['System.Config']).get('System.Config.Init')
    .then(function(config) {
      // Build Config constant
      angular.module('Reedsy').constant('System.Config', (config && config.data));
      // Bootstrap Application
      angular.element(document).ready(function() {
        angular.bootstrap(document, ['Reedsy']);
      });
    }, function(err) {
      throw new Error('Could not load client application config');
    });
})();
