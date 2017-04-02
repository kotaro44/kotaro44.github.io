'use strict';

/* Directives */
var Directives = angular.module('carlos.directives', []);

Directives.directive('carlos', [function () {
    return {
        restrict: 'E',
        templateUrl: 'public/partials/carlos.html',
        link: function (scope, element, attributes) {
        
        },
        controller: ['$scope','$http','$window',function($scope,$http,$window){
        	$scope.animation_paused = false;
        	$scope.step = 0;

        	$scope.play = function(){
        		switch( $scope.step ){
        			case 0:
        					$scope.america = $scope.svg_square.append('image').attr('x',-30).attr('y',0)
			        		.attr('width',100).attr('height',100).attr('xlink:href','public/img/america.svg')
			        		.attr('opacity', 0);
			        		
			        		$scope.america.transition()
							.duration(2000)
							.attr('opacity', 1)
							.each("end", function(){
								$scope.america
								.transition()
								.duration(6000)
								.attr("transform", "translate(-50,-165)scale(4,4)")
							});
						      

			        		$scope.step = 1;
        				break;
        		}

        		$scope.$digest();
        		
        	};


        	$scope.svg = d3.select('.carlos')
        		.append('svg').attr('viewBox','0 0 100 100').attr('preserveAspectRatio','none');
        	$scope.svg_square = d3.select('.carlos')
        		.append('svg').attr('viewBox','0 0 100 100').classed('square-svg',true);


        	/*draw ruler*/
        	$scope.svg.append('line')
        		.attr('x1', 50).attr('y1', 0).attr('x2', 50).attr('y2', 100)
        		.classed('ruler',true);

        	$scope.svg.append('line')
        		.attr('x1', 0).attr('y1', 50).attr('x2', 100).attr('y2', 50)
        		.classed('ruler',true);

        	$scope.svg.append('rect')
        		.attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 100)
        		.classed('ruler',true);


        	$scope.svg_square.append('rect')
        		.attr('x', 0 ).attr('y', 0 ).attr('width', 100 ).attr('height', 100 )
        		.classed('ruler',true);

        	$scope.svg_square.append('path')
        		.attr('d', 'M 50,0 A 50,50 0 0 1 50,0')
        		.classed('ruler',true);


        	//draw circle for play
			$scope.play_btn_g = $scope.svg_square
			        .append('g')
			        .attr('transform', 'translate(50,50)')
			        .classed('play-btn-g',true);
			        
			var pie = d3.layout.pie().sort(null);
			var arc = d3.svg.arc().innerRadius(10).outerRadius(11);

			var path = $scope.play_btn_g.selectAll("path")
			    .data(pie([1]))
			    .enter().append("path")
			    .attr("fill", '#FFFFFF')
			    .transition()
			    .delay(function(d, i) {
			      return i * 1000;
			    }).attrTween('d', function(d) {
			    	var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
			    	return function(t) {
			       		d.endAngle = i(t);
			       		return arc(d);
			    	}
				}
			);

			$scope.play_btn = $scope.svg_square.append('circle')
				.attr('cx',50).attr('cy',50)
				.attr('r',12).classed('play-btn',true)
				.on('click',function(){
					// /start animation
					$scope.play_btn_g.remove();
					$scope.play_btn_triangle.remove();
					$scope.play_btn.remove();
					$scope.play();
				});

			$scope.play_btn_triangle = $scope.svg_square.append('path')
				.attr('d','M47,45 L55,50 L47,55 Z')
				.attr('fill','#FFFFFF');


        	/*Resize controller*/
        	$scope.resize = function(){
        		$scope.svg.attr('width', window.innerWidth )
        		          .attr('height', window.innerHeight );
        		$scope.svg_square.attr('width', window.innerWidth )
        		          .attr('height', window.innerHeight );
        	};

        	window.onresize = $scope.resize;
        	setTimeout(function(){
        		window.dispatchEvent(new Event('resize'));
        	},0);

        }]
    }
}]);