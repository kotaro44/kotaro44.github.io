'use strict';

var Controllers = angular.module('stocks.controllers', []);

Controllers.controller('mainCtrl', ['$scope', 'Broker', 'Market', function mainCtrl($scope, Broker, Market){
  $scope.vm = {
    Market: Market,
    Broker: Broker,
    showChart: false,

    showCompanyChart: _showCompanyChart,
    closeCompanyChart: _closeCompanyChart,
    step: _step,
  };

  function _step() {
    Market.step();
    Broker.work();
  };

  function _showCompanyChart(company) {
  	$scope.vm.showChart = true;

  	window.Highcharts.chart('main-chart', {
	    title: {
	     text: company.name,
      },

      yAxis: {
        title: {
          text: 'Price',
        },
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        }
      },

      series: [{
        name: company.name,
        data: company.history,
      }],
    });
  };

  function _closeCompanyChart(company) {
    $scope.vm.showChart = false;
  };
}]);


