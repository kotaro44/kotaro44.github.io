'use strict';

/* Controllers */
var controllers = angular.module('gameoflife.controllers', []);

/*This controller will show the presentation screen, when it finish the animation it will relocate the page to the Main view*/
controllers.controller('logoCtrl', ['$location',function($location) {
  /*Get the root div of the view*/
  var logoHolder = angular.element(document.getElementsByClassName('logoHolder')[0]);
  logoHolder.bind('oanimationend animationend webkitAnimationEnd', function(e) { 
    switch(e.animationName){
      case "logoInit":
          //set the CSS3 Animation to the holder
          logoHolder.css({"animation":"closeWindow 2s forwards","-webkit-animation":"closeWindow 2s forwards"});
        break;
      case "closeWindow":
          //Now the view is not viseble so we only have to relocate the page
          window.location = "#/main";
        break;
    }
  });
}]);


