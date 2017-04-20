'use strict';

/* Directives */
var Directives = angular.module('wandrew.directives', []);

Directives.directive("wandrew", [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/wandrew.html',
        link: function (scope, element, attributes) {
        	
        },
        controller: ['$scope','$http','$window','SoundBank',function($scope,$http,$window,SoundBank){
        	setTimeout(function(){
        		SoundBank.nextNote();
        	},1500);
			
        }]
    }
}]);

Directives.directive("keyboard", [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/keyboard.html',
        link: function (scope, element, attributes) {
        
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);

Directives.directive("note", ['SoundBank',function (SoundBank) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
        	element.click(function(){
        		SoundBank.play( attributes.note , element.attr('class').match(/[ABCDEFG]\#?[345]/)[0] );
        	});
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);