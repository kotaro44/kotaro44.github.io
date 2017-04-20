'use strict';

Services.service('Analytics',['$http',function($http){
	/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', ["\x55\x41\x2D\x36\x35\x35\x34\x37\x34\x34\x39\x2D\x31"][0], 'auto');*/

	this.analyzePage = function( pagename ){
		//ga('send', 'pageview' , pagename );
	};
}]);


  

  
