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

  var movieOne = {
    title: "Harry Potter",
    year: '2008',
    country : 'USA',
    genre : 'Drama',
    director: 'Steven Spielberg',
    actors: ['Christian den boer','Ping Wan','Roeland Oosterloo']
  }

  var movieTwo = {
    title: "Lost",
    year: '2012',
    country : 'Japan',
    genre : 'Love',
    director: 'Abba',
    actors: ['Christian den boer','Ping Wan','Roeland Oosterloo']
  }

  $scope.movies  = [movieOne,movieTwo];

    queryFactory.executeMovieQuery('//movies/movie/title', function(data) {
        $log.log(data);
    })
  }]);
