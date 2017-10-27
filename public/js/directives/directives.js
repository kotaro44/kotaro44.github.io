'use strict';

/* Directives */
var Directives = angular.module('portfolio.directives', []);

Directives.directive("start", ['Analytics',function(Analytics) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/start.html',
        link: function (scope, element, attributes) {
        	setTimeout(function(){
                creative();
                Analytics.report('Start');
            },500);
        },
        scope: {}
    }
}]);

Directives.directive("about", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/about.html',
        scope: {}
    }
}]);

Directives.directive("navigation", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/navigation.html',
        scope: {}
    }
}]);

Directives.directive("appHeader", ['i18n',function (i18n) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/app-header.html',
        scope: {}
    }
}]);

Directives.directive("contact", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/contact.html',
        scope: {}
    }
}]);

Directives.directive("programmingLanguages", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/programming-languages.html',
        scope: {}
    }
}]);

Directives.directive("portfolio", ['Data','i18n',function(Data,i18n) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/portfolio.html',
        link: function (scope, element, attributes) {
        	scope.portfolio = Data.portfolio;
            scope.columns = Data.columns;
        },
        scope: {}
    }
}]);

Directives.directive("modal", ['Data','i18n',function (Data,i18n) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'public/partials/modal.html',
        link: function (scope, element, attributes) {
            scope.portfolio = Data.portfolio;
            scope.columns = Data.columns;
        },
        scope: {}
    }
}]);