'use strict';

window.getService = function(service){
	return angular.element('body').injector().get( service );
};


/* Services */
var Services = angular.module('events.services', []);

Services.service('myService',function(){
	return {
		my: "service"
	};
});

Services.service('LoadedFile',function(){
	return {};
});
