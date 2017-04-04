'use strict';

window.getService = function(service){
	return angular.element('body').injector().get( service );
};

window.consoleF = function(){
	for( var i = 0 ; i < arguments.length ; i++ ){
		console.log(  i + ':' , arguments[i] );
	}
};


/* Services */
var Services = angular.module('visa.services', []);

Services.service('Data',['$http',function($http){
	var Data = {
		"origin_countries": ["Honduras","Taiwan","Nicaragua","Germany","China"],
		"countries": ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Republic of the Congo","Democratic Republic of the Congo","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","North Korea","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"],
		origin_country: "",
		destiny_country: ""
	};

	return Data;
}]);

Services.service('i18n',function(){
	var observers = [];
	var langs = {
		'en': {
			'Type your Name': 'Type your Name',
			'Enter': 'Enter'
		},
		'es': {
			'Type your Name': 'Ingresa tu Nombre',
			'Enter': 'Enter'
		}
	};

	var i18n = {
		_lang: '',
		_supportedLangs: ['en','es','pt'],
		_registerScope: function( $scope  ){
			if( observers.indexOf( $scope ) == -1 )
				observers.push( $scope );
		},
		_setLanguage: function( lang ){
			if( typeof lang == "number" )
				i18n._lang = i18n._supportedLangs[lang];
			else
				i18n._lang = lang;
			localStorage.setItem('lang',i18n._lang);
		},
		_readLang: function(){
			Object.keys(langs[i18n._lang]).map(function( key ){
				i18n[key] = langs[i18n._lang][key];
			});
		}
	};

	var lang = i18n._supportedLangs[i18n._supportedLangs.indexOf(
		(navigator.language||navigator.systemLanguage).toLowerCase().split(/\-/)[0])] || i18n._supportedLangs[0];

	var _lang = localStorage.getItem('lang');

	if( _lang ){
		i18n._supportedLangs.map(function( l ){
			if( l == _lang )
				lang = _lang;
		});
	}

	i18n._setLanguage(lang);
	i18n._readLang();
	return i18n;
});