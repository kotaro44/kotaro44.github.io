'use strict';

/* Filters */
var Filters = angular.module('portfolio.filters', []);

Filters.filter('groupBy',function(){
	return function(data,columns){
		var result = [] , t = []; 
		for( var i = 0 ; i < Math.ceil( data.length/columns ) ; i++ ){
			for( var j = i*columns ; j < i*columns + columns ; j++ ){
				if( data[j] ) { 
					t.push( data[j] );
				}
			}
			result.push(t);
			t = [];
		}
		return result;
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
		return i18n[text] || text;
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