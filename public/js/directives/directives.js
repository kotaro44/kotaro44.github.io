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
        window.creative();
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

Directives.directive('news', [function about() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'public/partials/news.html',
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
      var allItems = JSON.parse(JSON.stringify(Data.portfolio));
      var count = 0;

    	scope.portfolio = Data.portfolio;
      scope.columns = Data.columns;
      scope.limit = true;


      scope.filters = ['All', 'Web Apps', 'Professional', 'Android', 'Social', 'Native Apps', 'Games', 'Education', 'Backend'];
      scope.selectedFilter = 'All';

      scope.applyFilter = function applyFilter(filter){
        scope.selectedFilter = filter;
        scope.portfolio.map(function(item){
          item.show = false;
        })
      };

      scope.showItem = function showItem(item){
        item.show = scope.selectedFilter === 'All' || item.tags.indexOf(scope.selectedFilter) !== -1
        if (scope.limit && scope.portfolio.filter(function(a){return a.show}).length > 6) {
          item.show = false;
        }

        return item.show;
      };

      scope.removeLimit = function removeLimit() {
        scope.limit = false;
      };

      scope.setLimit = function setLimit() {
        scope.limit = true;
      };

      scope.isLimited = function isLimited(){
        return scope.limit && scope.portfolio.filter(function(a){return a.show}).length >= 6;
      };

      scope.isNotLimited = function isNotLimited(){
        return !scope.limit && scope.portfolio.filter(function(a){return a.show}).length >= 6;
      };

      
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

Directives.directive('textAnim', [function textAnim() {
  return {
    restrict: 'A',
    scope: {
      textAnim: '@textAnim',
    },
    templateUrl: 'public/partials/text-anim.html',
  };
}]);

