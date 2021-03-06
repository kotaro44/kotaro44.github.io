'use strict';

/*The canvas Controller is used for the animation on the background, It will resize the canvas with the window*/
controllers.controller('canvasCtrl',['$scope','$element','$window',function($scope,$element,$window){
	$scope.initMagiCanv = function(){
		/*Variables*/
		$scope.circles = [];
		$scope.maxR = 15;
		$scope.minR = 3;
		$scope.maxT = 20000;
		$scope.minT = 1000;
		$scope.cont = 0;

		/*Functions*/
		//refresh function on the magiccanv interval
		$scope.myCanv = magiccanv("logoCanvas",function(){
			//if we have less than N fireflies, create a new one
			if( $scope.circles.length < 20 )
			{
				//create new circle
				var circle = new magic_circle(
					{
						x: Math.random()*$window.innerWidth, 
						y: Math.random()*$window.innerHeight
					} , {
						fill: "#A3A285",
						r: 0,
						opacity: 0,
						stroke_width: 5,
						stroke: "#EEEC75"
				});

				//create a unique Id for this firefly
				circle.oid = "c" + $scope.cont++;
				circle.dir = Math.PI*2*Math.random();
				circle.speed =   Math.random()*2 - 1;
				circle.lR = $scope.minR + Math.floor(Math.random()*$scope.maxR);
				circle.animTime = $scope.minT +  Math.floor(Math.random()*$scope.maxT);
				$scope.circles.push(circle);

				//add the firefly to the world
				$scope.myCanv.addElement(circle.oid,circle);

				//increase the radius in the animation, The X,Y position will be controlled outside
				circle.transition({ style: { r: circle.lR , opacity: 0.6 } },circle.animTime,function(){
					//now that the radius is big let's reduce it until it disappears
					circle.transition({ style: { opacity: 0 , r: 0 } },circle.animTime,function(){
						//remove the element form the world for the new 
						$scope.myCanv.removeElement(circle.oid);
						$scope.circles.splice( $scope.circles.indexOf(circle),1);
					});
				});
			}

			//move the flies!
			$scope.circles.map(function(e){
				e.position.y += e.speed;
				e.position.x += 3*(Math.sin(e.position.y/60) - Math.cos(e.position.y/30));
			});

		});
	};
	$scope.initMagiCanv();

	//resize function
	$scope.window = $window;
	$scope.resizeCanvas = function(){
		$element.attr({
			width: $window.innerWidth + "px",
			height: $window.innerHeight + "px"
		});
	};

	//resize the canvas with the window
	angular.element(window).bind('resize',function(){
		$scope.resizeCanvas();
	});
}]);