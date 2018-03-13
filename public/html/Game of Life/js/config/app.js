'use strict';


// Declare app level module which depends on filters, and services
angular.module('gameoflife', [
  'ngRoute',
  'gameoflife.filters',
  'gameoflife.services',
  'gameoflife.directives',
  'gameoflife.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logo', {templateUrl: 'partials/logo.html', controller: 'logoCtrl'});
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'mainCtrl'});
  $routeProvider.when('/wallpaper', {templateUrl: 'partials/logo.html', controller: ''});
  $routeProvider.otherwise({redirectTo: '/logo'});
}]);
