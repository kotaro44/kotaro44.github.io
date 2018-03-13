'use strict';

/* Directives */


angular.module('gameoflife.directives', []).directive('about',function(){
	return {
		restrict: 'E',
		template: '<div class="about"><a href="http://en.wikipedia.org/wiki/Conway\'s_Game_of_Life">Wikipedia - Conway\'s Game of life</a></div>',
		link: function($scope,$element){
			console.log("linked!");
		}
	};
});