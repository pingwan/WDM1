'use strict';

/**
 * @ngdoc function
 * @name wdm1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdm1App
 */
angular.module('wdm1App')
    .controller('MainCtrl', ['$scope', '$http', 'x2js', '$log',  function ($scope, $http, x2js, $log) {
        $scope.songs = [];

        $http.get("http://localhost?method=all", {
          transformResponse: function (data) {
            var json = x2js.xml_str2json(data);
            return json.result;
          }
        }).success(function (data) {
            $scope.songs = data.songs.score;
          });
        for( var i = 0 ; i < $scope.songs.length; i++ ) {
          var instuments = $scope.songs[i].instuments.instrument;
          $scope.songs[i].instuments = [];
          if(instuments && angular.isArray(instuments)) {
            for (var j = 0; j < instuments.length; j++) {
              $scope.songs[i].instuments.push({name: instuments[j]});
            }
          }
          else if (instuments && !angular.isArray(instuments)) {
            $scope.songs[i].instuments.push({name:instuments})
          }
        }
        $scope.applyFilter = function() {
          var query = "?method=filter"
          if($scope.titleKeywords) {
            query += "&title=" + $scope.titleKeywords;
          }
          if($scope.componistKeywords) {
            query += "&componist=" + $scope.componistKeywords;
          }
          $http.get("http://localhost" + query, {
            transformResponse: function (data) {
              var json = x2js.xml_str2json(data);
              return json.result;
            }
          }).success(function (data) {
            $scope.songs = data.songs.score;
          });
        };
    }]);
