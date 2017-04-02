'use strict';

/* Filters */
var Filters = angular.module('dmtree.filters', []);

Filters.filter('capitalize',function(){
	return function(text){
		return text[0].toUpperCase() + text.substring(1).toLowerCase();
	};
});

Filters.filter('UpperCase',function(){
	return function(text){
		return text.toUpperCase();
	};
});

Filters.filter('Math',function(){
	return function(text,func){
		return Math[func](text);
	};
});

Filters.filter('i18n',['i18n',function(i18n){
	return function(text){
		i18n._registerScope(this);
		return i18n[text];
	};
}]);

Filters.filter('date',[function(){
	return function(text){
		return (new Date(text)).toLocaleString();
	};
}]);

Filters.filter('removeLast',[function(){
	return function(array){
		return array.filter(function(a,i){return (i!=array.length-1);});
	};
}]);

Filters.filter('removeFirst',[function(){
	return function(array){
		return array.filter(function(a,i){return i;});
	};
}]);

Filters.filter('gsort',function(){
	return function(objArray, attr ){
		return objArray.sort(function( a , b ){
			if( attr )
				return b[attr] - a[attr];
			return b - a;
		});
	};
});

Filters.filter('lsort',function(){
	return function(objArray, attr ){
		return objArray.sort(function( a , b ){
			if( attr )
				return a[attr] - b[attr];
			return a - b;
		});
	};
});

Filters.filter('transaction',function(){
	return function(transaction, attr ){
		return JSON.stringify(transaction).replace(/\"/g,' ').replace(/\[/g,'{').replace(/\]/g,'}');
	};
});

Filters.filter('filtertran',function(){
	return function(rules, text , min , max , support , total , showMax ){
		var reg = new RegExp(text);
		total = parseFloat(total);
		support = parseFloat(support);
		return rules.filter(function(a,i){
			var match = false;
			for( var i = 0 ; i < a.elements.length; i++){
				if( a.elements[i].match(reg) )
					match = true;
			}
			return match && a.elements.length>=min && a.elements.length<=max && (a.support/total)*100>=support;
		}).slice(0,showMax);
	};
});

Filters.filter('filterrule',function(){
	return function(rules, text , min , max , support , total , showMax , confidence , supportMax , confidenceMax ){
		var reg = new RegExp(text);
		total = parseFloat(total);
		support = parseFloat(support);
		return rules.filter(function(a,i){
			var match = false;
			for( var i = 0 ; i < a.when.length; i++){
				if( a.when[i].match(reg) )
					match = true;
			}
			if( a.then.match(reg) )
				match = true;

			var sup = (a.support/total)*100;
			var conf = parseFloat(a.confidencePer);

			return match && a.when.length>=min && a.when.length<=max && 
				sup>=support && conf>=confidence && sup <= supportMax && conf <= confidenceMax;
		}).slice(0,showMax);
	};
});
