 'use strict';

/*This controller is the Main app, it will show */
controllers.controller('mainCtrl', ['$scope','$timeout',function($scope,$timeout) {
  /*Variables*/
  $scope.play = false;
  $scope.rows = 20;
  $scope.columns = 20;
  $scope.grid = false;
  $scope.generations = 0;
  $scope.temp = [];
  $scope.data = [];

  // create a Matrix with the same size as the models with random values
  for( var i = 0 ; i < $scope.rows ; i++ )
  {
    $scope.data[i] = [];
    for( var j = 0 ; j < $scope.columns ; j++ )
      $scope.data[i].push({val: Math.random()<0.1})
  }


  /*Functions*/
  $scope.refresh = function(){
    //save the rows value in another model for rendering
    $scope.lr = $scope.rows || 3;
    $scope.lc = $scope.columns || 3;

    //add more rows if neccessary
    while( $scope.lr > $scope.data.length )
      $scope.data.push(  [{val: 0}].repeat( $scope.data[0].length ) );
   //remove rows if neccessary
    while( $scope.lr < $scope.data.length )
      $scope.data.pop();
    //add more columns if neccessary
    while( $scope.lc > $scope.data[0].length )
      $scope.data.map(function(x,i){
        x.push({val: 0});
      });
    //remove columns if neccessary
    while( $scope.lc < $scope.data[0].length )
      $scope.data.map(function(x,i){
        x.pop();
      });


    if( $scope.play )
    {
      $scope.temp = objectize(getGeneration(deobjectize($scope.data),1));
      $scope.temp.map(function(x,i){
        x.map(function(y,j){
          $scope.data[i][j].val = y.val;
        });
      });

      $scope.rows = $scope.data.length;
      $scope.columns = $scope.data[0].length;
      $scope.generations++;
    }

    //set Interval to the refresh
    $timeout(function(){
      $scope.refresh();
    },500);
  }
  //init the refresh
  $scope.refresh();

  /*Events*/
  $scope.playBtnClick = function(){
    $scope.play = !$scope.play;
    //reset the counter to 0 if the animation starts
    if( $scope.play )
      $scope.generations = 0;
  };

  $scope.cellClick = function(e){
    //get the clicked element and his i,j position of the array
    var self = angular.element(e.srcElement), 
        i = parseInt(self.attr('x')), 
        j = parseInt(self.attr('y'));

    //invert the element value
    $scope.data[i][j].val = !$scope.data[i][j].val;
  };
}]);








