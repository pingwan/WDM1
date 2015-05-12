'use strict';

/**
 * @ngdoc function
 * @name wdm1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdm1App
 */
angular.module('wdm1App')
  .controller('MainCtrl', ['$scope', '$http', 'x2js', '$log', 'queryFactory', function ($scope, $http, x2js, $log, queryFactory) {

  queryFactory.executeMovieQuery('//movies/movie', function(data) {
        $scope.movies = data.movie;
    });


  $scope.applyFilter = function(event){

    /* year filter soort van */

    if($scope.yearOption === 'before'){
      queryFactory.executeMovieQuery('//movies/movie[year <' + $scope.yearValue  +']', function(data) {
        $scope.movies = data.movie;
      });
    }
    
    if($scope.yearOption === 'after'){
      queryFactory.executeMovieQuery('//movies/movie[year >' + $scope.yearValue  +']', function(data) {
        $scope.movies = data.movie;
      });
    }

    /*genre filtering soort van*/
    if($scope.genre !== undefined){
      queryFactory.executeMovieQuery('//movies/movie[genre =\"' + $scope.genre  +'\"]', function(data) {
        $scope.movies = data.movie;
        $scope.checkIfArray();
      });
    }
  }

  /*
  * deze function moet je hebben voor het geval deze resultaat maar uit 1 object bestaat,
  * dan moet je hem ff in een array gooien ;)
  */
  $scope.checkIfArray = function(){
    if(!angular.isArray($scope.movies)){
          $scope.movies = [$scope.movies];
        }
  }

}]);
