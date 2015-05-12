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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    queryFactory.executeMovieQuery('//movies/movie/title', function(data) {
        $log.log(data);
    })
  }]);
