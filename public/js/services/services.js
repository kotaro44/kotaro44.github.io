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
var Services = angular.module('cvsimple.services', []);

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