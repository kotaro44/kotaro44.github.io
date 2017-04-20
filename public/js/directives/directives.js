'use strict';

/* Directives */
var Directives = angular.module('portfolio.directives', []);

Directives.directive("start", [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/start.html',
        link: function (scope, element, attributes) {
        	setTimeout(function(){creative();},500);
        }
    }
}]);

Directives.directive("about", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/about.html'
    }
}]);

Directives.directive("navigation", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/navigation.html'
    }
}]);

Directives.directive("appHeader", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/app-header.html'
    }
}]);

Directives.directive("contact", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/contact.html'
    }
}]);

Directives.directive("programmingLanguages", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/programming-languages.html'
    }
}]);

Directives.directive("portfolio", ['Data',function(Data) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/portfolio.html',
        link: function (scope, element, attributes) {
        	scope.portfolio = Data.portfolio;
            scope.columns = Data.columns;
        }
    }
}]);

Directives.directive("modal", ['Data',function (Data) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/modal.html',
        link: function (scope, element, attributes) {
            scope.portfolio = Data.portfolio;
            scope.columns = Data.columns;
        }
    }
}]);