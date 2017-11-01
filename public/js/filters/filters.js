'use strict';

/**
 * ********** Filters *************
 */
var Filters = angular.module('portfolio.filters', []);

Filters.filter('cluster', function cluster() {
  return function clusterFlter(data, columns) {
    var result = [];
    var temp = []; 
    var index = 0;
    var indexj = 0;
    for (index = 0 ; index < Math.ceil( data.length/columns ) ; index++) {
      for (indexj = index*columns ; indexj < index*columns + columns ; indexj++) {
        if (data[indexj]) { 
          temp.push( data[indexj] );
        }
      }
      result.push(temp);
      temp = [];
    }
    return result;
  };
});

Filters.filter('UpperCase', function UpperCase() {
  return function UpperCaseFilter(text) {
    return text.toUpperCase();
  };
});

Filters.filter('Math', function Math() {
  return function MathFilter(text, func) {
    return Math[func](text);
  };
});

Filters.filter('i18n', ['i18n', function i18n(i18n) {
  return function i18nFilter(text) {
    i18n._registerScope(this);
    return i18n[text] || text;
  };
}]);

Filters.filter('date', [function date() {
  return function dateFilter(text) {
    return (new Date(text)).toLocaleString();
  };
}]);

Filters.filter('removeLast', [function removeLast() {
  return function removeLastLink(array) {
    return array.filter(function filterArray(element, index) {
      return (index !== array.length-1);
    });
  };
}]);

Filters.filter('removeFirst', [function removeFirst() {
  return function removeFirstFilter(array) {
    return array.filter(function arrayFilter(element, index) {
      return index;
    });
  };
}]);

Filters.filter('gsort', function gsort() {
  return function gsortFilter(objArray, attr) {
    return objArray.sort(function arraySort(element, elementb) {
      if (attr) {
        return elementb[attr] - element[attr];
      }

      return elementb - element;
    });
  };
});

Filters.filter('lsort', function lsort() {
  return function lsortFilter(objArray, attr) {
    return objArray.sort(function arrySort(element, elementb) {
      if (attr) {
        return element[attr] - elementb[attr];
      }

      return element - elementb;
    });
  };
});
