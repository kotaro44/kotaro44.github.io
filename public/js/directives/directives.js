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


      scope.filters = ['All', 'Working On', 'Web Apps', 'Professional', 'Android', 'Social', 'Native Apps', 'Games', 'Education', 'Backend'];
      scope.pagination = {
        page: 0,
        pages: 0,
        itemsPerPage: 6,
        totalItems: 0,
      };

      scope.haveFilter = function haveFilter(item, filter) {
        return filter === 'All' || item.tags.indexOf(filter) !== -1;
      };
      
      scope.totalItems = function totalItems(filter) {
        return scope.portfolio.filter(function filterItems(item){
          return scope.haveFilter(item, filter);
        }).length;
      };

      scope.applyFilter = function applyFilter(filter) {
        var index = 0;
        var pageCount = 0;
        var itemCount = 0;

        scope.selectedFilter = filter;
        scope.portfolio.map(function mapItems(item){
          item.show = scope.haveFilter(item, scope.selectedFilter);
        });

        scope.pagination.page = 0;
        scope.pagination.totalItems = scope.portfolio.filter(function(a){return a.show}).length;
        scope.pagination.pages = [];

        for( index = 0 ; index < Math.ceil(scope.pagination.totalItems / scope.pagination.itemsPerPage) ; index++ ) {
          scope.pagination.pages.push(true);
        }

        scope.portfolio.forEach(function forEachItem(item) {
          if (item.show) {
            if (itemCount++ >= scope.pagination.itemsPerPage) {
              itemCount = 1;
              pageCount++;
            }

            item.page = pageCount;
          }
        });
      };

      scope.applyFilter(scope.filters[0]);
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

