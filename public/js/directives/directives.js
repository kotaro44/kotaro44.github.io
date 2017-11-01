'use strict';

/**
 * ******** Directives ********** 
 */
var Directives = angular.module('portfolio.directives', []);

Directives.directive('start', ['Analytics', function start(Analytics) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/start.html',
    link: function startLink() {
    	setTimeout(function timeout() {
        creative();
        Analytics.report('Start');
      }, 500);
    },
    scope: {},
  };
}]);

Directives.directive('about', [function about() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/about.html',
    scope: {},
  };
}]);

Directives.directive('navigation', [function navigation() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/navigation.html',
    scope: {},
    controller: ['$scope', 'Analytics', function navigationCtrl($scope, Analytics) {
      $scope.Analytics = Analytics;
    }],
  };
}]);

Directives.directive('appHeader', [function appHeader() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/app-header.html',
    scope: {},
  };
}]);

Directives.directive('contact', [function contact() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/contact.html',
    scope: {},
  };
}]);

Directives.directive('programmingLanguages', [function programmingLanguages() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/programming-languages.html',
    scope: {},
  };
}]);

Directives.directive('portfolio', ['Data', function portfolio(Data) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/portfolio.html',
    link: function portfolioLink(scope) {
    	scope.portfolio = Data.portfolio;
      scope.columns = Data.columns;
    },
    scope: {},
  };
}]);

Directives.directive('modal', ['Data', function modal(Data) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/modal.html',
    link: function modalLink(scope) {
      scope.portfolio = Data.portfolio;
      scope.columns = Data.columns;
    },
    scope: {},
  };
}]);
