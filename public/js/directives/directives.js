'use strict';

/* Directives */
var Directives = angular.module('cvsimple.directives', []);

Directives.directive("cvSimple", [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/cv-simple.html',
        link: function (scope, element, attributes) {
        
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);