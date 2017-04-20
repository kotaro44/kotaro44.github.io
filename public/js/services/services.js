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
var Services = angular.module('portfolio.services', []);

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

Services.service('Data',[function(){
	var Data = {
		"columns": 3,
		"portfolio": [{
			"title": "Do I need Visa?",
			"category": "Web Application",
			"img": "visa.png",
			"url": "./public/html/doineedvisa/visa.html",
			"desc": "A Webpage for any person to be able to consult if they require a visa to travel to an specific country, this project was developed in AngularJS and Bootstrap."
		},{
			"title": "Tetris JS",
			"category": "Web Game",
			"img": "tetris.png",
			"url": "./public/html/tetris/tetris.html?w=10&h=20",
			"desc": "A fully functional Tetris Game developed by Carlos only on Javascript, No JQuery, Angular JS or Other Library/Framework just Pure JavaScript"
		},{
			"title": "Cluster Validation: Improving Stability Measurement",
			"category": "Master Thesis",
			"img": "cluster.png",
			"url": "./public/html/ClusterValidation.pdf",
			"desc": "Carlos Research paper to fullfil the requirements of his Master Degree at 國立清華大學."
		},{
			"title": "SAP - Innovation Center Silicon Valley",
			"category": "SAP Labs Palo Alto",
			"img": "inno-sap.png",
			"video": "sap.mp4",
			"url": "https://icn.sap.com/home.html",
			"desc": "SAP is a huge company, and the Innovation Center Silicon Valley was the team with Carlos collaborated for more than 1 year.",
			"labels": [{
				"img": "sap.png",
				"url": "https://www.sap.com/index.html"
			}]
		},{
			"title": "SAP - eBay",
			"category": "Web Application",
			"img": "ebay-insight.png",
			"video": "ebay.mp4",
			"url": "https://www.sap.com/about/customer-testimonials/high-tech/ebay.html",
			"desc": "A POC developed at SAP Lab's Palo Alto, California USA, Carlos was the lead developer and designer of the app.",
			"labels": [{
				"img": "ebay.png",
				"url": "http://www.ebay.com/"
			},{
				"img": "sap.png",
				"url": "https://www.sap.com/index.html"
			}]
		},{
			"title": "SAP - Consumer Insight 365",
			"category": "Web Application",
			"img": "365.png",
			"video": "365.mp4",
			"url": "https://www.sapconsumerinsight365.com/",
			"desc": "Carlos worked as Lead Developer of the project Consumer Insight 365 for SAP.",
			"labels": [{
				"img": "sap.png",
				"url": "https://www.sap.com/index.html"
			}]
		},{
			"title": "SAP - Burberry",
			"category": "Web Application",
			"img": "Burberry-app.png",
			"video": "Burberry.mp4",
			"url": "http://news.sap.com/burberry-ulta-beauty-mobilize-clienteling/",
			"desc": "One of the first Projects where Carlos was assigned to help as developer at SAP Palo Alto California, this project was presented at SAPPHIRE 2012 in Madrid, Spain. This POC became a mockup for all the following projects at Innovation Center Silicon Valley.",
			"labels": [{
				"img": "sap.png",
				"url": "https://www.sap.com/index.html"
			},{
				"img": "burberry.png",
				"url": "https://www.burberry.com/"
			}]
		},{
			"title": "All TAX Platform",
			"category": "Web Application",
			"img": "timp.png",
			"video": "timp.mp4",
			"url": "http://alltaxplatform.com/",
			"desc": "Agile Solutions biggest Project with more than 10 different Modules, where Carlos was Manager of several of them such as BRB, BFB, BPMA, Calendar etc.",
			"labels": [{
				"img": "agile.png",
				"url": "http://agilesolutions.com/"
			}]
		},{
			"title": "Data Mining Project",
			"category": "Web Application",
			"img": "dm.png",
			"url": "./public/html/DM/tree/tree.html",
			"desc": "A small Web App that process Association Rules output and presents a deep analysis of the rules with D3 Graphics. This App was developed to fullfil the requirements of the Course \"Data Mining\" at 國立清華大學 for Carlos Master Degree in Information Systems and Applications."
		},{
			"title": "Agile Consultant Knowledge Tree",
			"category": "Agile Project",
			"img": "agile-tree.png",
			"url": "./public/html/agileconsultant/agile-consultant.html",
			"desc": "An SVG Tree that shows all technologies that can be manage by a proffesional consultant or software engineer at Agile Solutions."
		},{
			"title": "JS Responsive Test",
			"category": "Web Example",
			"img": "resp.png",
			"url": "./public/html/test/test.html",
			"desc": "A simple Javascript Animation Test with responsive behavior. Used in Agile Solutions for Interview Tests."
		},{
			"title": "SOS (Spanish)",
			"category": "Web Example",
			"img": "sos.png",
			"url": "./public/html/SOS/SOS.html",
			"desc": "A Basic SOS web Game, experimenting with Drag & Drop."
		},{
			"title": "Clever designs",
			"category": "Web Example",
			"img": "clever.png",
			"url": "./public/html/cleverdesigns/clever.html",
			"desc": "A basic webpage showing the art from Designer Carmen Lagos."
		},{
			"title": "IMG to Binary Visualization",
			"category": "Web Application",
			"img": "binimg.png",
			"url": "./public/html/binimg/binimg.html",
			"desc": "A basic webpage that reads any file and try to conert it as image to find patterns on the HEX code."
		},{
			"title": "Food Game",
			"category": "Web Game",
			"img": "food.png",
			"url": "./public/html/games/foodgame/food.html",
			"desc": "A basic Game sample developed by an HTML5 Game Engine developed by Carlos, the GAme Engine Supports the use of joystick, mouse or Keyboard as inputs for any game."
		},{
			"title": "Birthday Piano App",
			"category": "Web Application",
			"img": "wandrew.png",
			"url": "./public/html/wandrew/piano.html",
			"desc": "A basic webpage as a Small Gift for Carlos Girlfriend who is a Musician."
		},{
			"title": "Prime Number Pattern Finder",
			"category": "Web Application",
			"img": "prime.png",
			"url": "./public/html/prime/prime.html",
			"desc": "A basic webpage that offers tools for finding patterns in Prime Numbers."
		},{
			"title": "Social Computing Survey",
			"category": "Web Application",
			"img": "social.png",
			"url": "./public/html/socialcomputing/social.html",
			"desc": "A Survey Experiment built as a Web App to fullfil the requirements of the Course \"Social Computing\" at 國立清華大學 for Carlos Master Degree in Information Systems and Applications."
		},{
			"title": "SVG Animation",
			"category": "Web Example",
			"img": "svg1.png",
			"url": "./public/html/pack/index.min.html",
			"desc": "A Cool SVG Animation made for AGILE app's Background."
		},{
			"title": "SVG Animation #2",
			"category": "Web Example",
			"img": "svg2.png",
			"url": "./public/html/cv/cv.html",
			"desc": "A Cool SVG Animation made for more Interactive Resume made by Carlos."
		},{
			"title": "Xuul Kab",
			"category": "3D Videogame",
			"img": "xuulcab.png",
			"video": "xuulcab.mp4",
			"url": "https://compete.imagine.microsoft.com/en-us/category/0?skillLevel=0",
			"desc": "A 3D game for PC that Carlos worked as a Develoepr with Kanny Davila, Xenia Oliva and Willy Guevara to participate in Imagine Cup."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 1)",
			"category": "Web Application",
			"img": "lec1un1.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%201/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 2, Un. 1)",
			"category": "Web Application",
			"img": "lec2un1.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%201/leccion2.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 3, Un. 1)",
			"category": "Web Application",
			"img": "lec3un1.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%201/leccion3.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 4, Un. 1)",
			"category": "Web Application",
			"img": "lec4un1.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%201/leccion4.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 5, Un. 1)",
			"category": "Web Application",
			"img": "lec5un1.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%201/leccion5.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 2)",
			"category": "Web Application",
			"img": "lec1un2.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%202/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 2, Un. 3)",
			"category": "Web Application",
			"img": "lec1un3.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%203/leccion2.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 4)",
			"category": "Web Application",
			"img": "lec1un4.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%204/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 6)",
			"category": "Web Application",
			"img": "lec1un6.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%206/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 7)",
			"category": "Web Application",
			"img": "lec1un7.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%207/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Escuela Digital (Lec. 1, Un. 8)",
			"category": "Web Application",
			"img": "lec1un8.png",
			"url": "./public/html/escueladigital/escueladigital/Unidad%208/leccion1.html",
			"desc": "A Lesson from the App \"Escuela Digital\" presented for Carlos Bachelor Thesis."
		},{
			"title": "Look for It!",
			"category": "Android Game",
			"img": "lookforit.png",
			"url": "https://m.downloadatoz.com/look-for-it/kotaro.lookforit/",
			"desc": "An Android videogame with artistic graphics made for the company Squadventure at the company early stages, This was Carlos second game for android, and he was the only developer and game designer with a Graphics designer help in the entire project.",
			"labels": [{
				"img": "android.png",
				"url": "https://play.google.com/store?hl=es"
			},{
				"img": "squadventure.png",
				"url": "http://squadventure.com/"
			}]
		},{
			"title": "Cookis & Bombs",
			"category": "Android Game",
			"img": "cookiesnbombs.png",
			"url": "https://m.downloadatoz.com/cookies-bombs/kotaro.cookiesnbombs/",
			"desc": "An Android videogame made for the company Squadventure at the company early stages, Carlos was the only developer and game designer with a Graphics designer help in the entire project.",
			"labels": [{
				"img": "android.png",
				"url": "https://play.google.com/store?hl=es"
			},{
				"img": "squadventure.png",
				"url": "http://squadventure.com/"
			}]
		},{
			"title": "Find Carlos on LinkedIn!",
			"category": "LinkedIn",
			"img": "linkedin.png",
			"url": "https://www.linkedin.com/in/carlos-amilcar-sanchez-rosa-0aa88b122",
			"desc": "Carlos Personal LinkedIn Profile."
		},{
			"title": "Find Carlos on Facebook!",
			"category": "Facebook",
			"img": "fb.png",
			"url": "https://www.facebook.com/kotaro.san",
			"desc": "Carlos Personal Facebook."
		},{
			"title": "Numero Dos",
			"category": "Metal Band",
			"img": "num2.png",
			"url": "https://www.facebook.com/groups/2016nthuecho/",
			"desc": "Carlos Play the Bass-Guitar in NTHU Band \"Numero Dos\"."
		},{
			"title": "All Around The World",
			"category": "Travel",
			"img": "map.png",
			"url": "https://www.facebook.com/kotaro.san",
			"desc": "Carlos traveled, work and live in several countries such as USA, Honduras, Nicaragua, Guatemala, El Salvador, Taiwan, Japan, Brazil, Chile, Cambodia and Thailand."
		}]
	};
	return Data;
}]);