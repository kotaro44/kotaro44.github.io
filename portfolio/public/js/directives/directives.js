'use strict';

/* Directives */
var Directives = angular.module('portfolio.directives', []);

Directives.directive("portfolio", [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/portfolio.html',
        link: function (scope, element, attributes) {
        
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);