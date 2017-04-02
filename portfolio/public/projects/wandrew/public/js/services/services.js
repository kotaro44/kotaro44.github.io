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
var Services = angular.module('wandrew.services', []);

window.onload = function () {
	
};


Services.service('SoundBank',function(){
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			MIDI.setVolume(0, 127);
		}
	});
	var _last = 0;

	var SoundBank = {
		play: function( note , letter ){
			if( _last )
				_last.stop();

			if( SoundBank.finished ){
				_last = MIDI.noteOn(0, note , 127, 0);
			}else{

				if( letter == SoundBank.song[SoundBank.actualNote] ){
					_last = MIDI.noteOn(0, note , 127, 0);

					if( ++SoundBank.actualNote >= SoundBank.song.length ){
						SoundBank.finish();
						return true;
					}else{
						SoundBank.nextNote();
					}
				}else{

				}
			}
			return false;
		},

		finish: function(){
			SoundBank.finished = true;
			$('.arrow').css('display','none');
			$('.card').addClass('show');
			$('.background').addClass('show');
		},

		song: ["G4","G4","A4","G4","C5","B4",
		       "G4","G4","A4","G4","D5","C5",
		       "G4","G4","G4","E5","C5","B4",
		       "A4","F5","F5","E5","C5","D5","C5"],

		actualNote: 0,

		nextNote: function(){
			$('.arrow').css('display','none');
			$('.' + SoundBank.song[SoundBank.actualNote] + ' .arrow').css('display','inline');
		}
	};

	return SoundBank;
});

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