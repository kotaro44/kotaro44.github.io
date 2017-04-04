'use strict';

/* Directives */
var Directives = angular.module('visa.directives', []);

Directives.directive("appStart", [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/visa.html',
        link: function (scope, element, attributes) {
        	grayScaleInit();
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);


Directives.directive("navigation", [function() {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/navigation.html',
        link: function (scope, element, attributes) {

        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);

Directives.directive("frontPage", ['Data',function(Data) {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/front-page.html',
        link: function (scope, element, attributes) {
        	scope.front_page = {
        		"Data": Data,
        		"country_value": "",
                "origin_selected": false
        	};

        	scope.$watch('front_page.country_value', function() {
		        Data.origin_country = scope.front_page.country_value.trim();
                if( Data.origin_country )
                    scope.front_page.origin_selected = true;
		    });
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);

Directives.directive("travel", ['Data',function(Data) {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/travel.html',
        link: function (scope, element, attributes) {

        	scope.travel = {
        		"countries": [],
        		"country_value": ""
        	};

        	scope.$watch('front_page.Data.origin_country', function() {
        		var index = Data.countries.indexOf(Data.origin_country);
        		if( index != -1){
        			scope.travel.countries = Data.countries.slice();
        			scope.travel.countries.splice(index,1);
        		}
		    });

		    scope.$watch('travel.country_value', function() {
		        Data.destiny_country = scope.travel.country_value.trim();
		    });

        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);

Directives.directive("requirements", ['Data','$http',function(Data,$http) {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/requirements.html',
        link: function (scope, element, attributes) {

        	scope.requirements = {
        		"text": "Select Origin country and Destiny country!"
        	};

        	scope.$watch('front_page.Data.destiny_country', function() {
        		if( scope.front_page.Data.destiny_country != "" ){
			        $http.get('./data.json').success(function(response) {
                        if( response[scope.front_page.Data.origin_country] ){
                            var resp = response[scope.front_page.Data.origin_country];
                            if( resp[scope.front_page.Data.destiny_country] ){
                                var result = resp[scope.front_page.Data.destiny_country];
                                scope.requirements.text = result.req + (result.desc?(', ' + result.desc):'');
                            }else{
                                scope.requirements.text = "No information found for destiny country...";
                            }
                        }else{
                            scope.requirements.text = "Origin Country not found...";
                        }

                        return response.data;
                    });
			    }
		    });
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);

Directives.directive("contact", ['Data',function(Data) {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/contact.html',
        link: function (scope, element, attributes) {

        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){

        }]
    }
}]);