'use strict';

/**
 * @ngdoc function
 * @name wdm1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdm1App
 */
angular.module('wdm1App')
    .controller('MainCtrl', ['$scope', '$http', 'x2js', '$log', 'queryFactory', '$location', function ($scope, $http, x2js, $log, queryFactory, $location) {
        $scope.movies = [];
        //fill initial list
        queryFactory.executeMovieQuery('//movies/movie', function(data) {
            setResult(data);
        });

        $scope.applyFilter = function(event){
            $scope.movies = [];
            if($scope.titleKeywords && $scope.titleKeywords != '') {
                queryFactory.executeMovieQuery('//movies/movie[title[contains(text(),\'' + $scope.titleKeywords  +'\')]]', function(data) {
                    setResult(data);
                });
            }

            if($scope.yearOption === 'before' && $scope.yearValue && $scope.yearValue != ''){
                queryFactory.executeMovieQuery('//movies/movie[year <' + $scope.yearValue  +']', function(data) {
                    setResult(data);
                });
            }

            if($scope.yearOption === 'after' && $scope.yearValue && $scope.yearValue != ''){
                queryFactory.executeMovieQuery('//movies/movie[year >' + $scope.yearValue  +']', function(data) {
                    setResult(data);
                });
            }

            if($scope.genre !== undefined){
                queryFactory.executeMovieQuery('//movies/movie[genre =\"' + $scope.genre  +'\"]', function(data) {
                    setResult(data);
                });
            }

            if($scope.summaryKeywords && $scope.summaryKeywords != ''){
                queryFactory.executeMovieQuery('//movies/movie[summary[contains(text(),\'' + $scope.summaryKeywords  +'\')]]', function(data) {
                    setResult(data);
                });
            }
        };

        $scope.gotoDetail = function(movie) {
            $log.log('#/details/' + movie.title);
            $location.path('details/' + movie.title);
        }

        /*
         * deze function moet je hebben voor het geval deze resultaat maar uit 1 object bestaat,
         * dan moet je hem ff in een array gooien ;)
         */
        var setResult = function(data){
            if($scope.movies.length == 0) {
                if(!angular.isArray(data.movie)) {
                    $scope.movies = [data.movie];
                }
                else {
                    $scope.movies = data.movie;
                }
            }
            else {
                if (!angular.isArray(data.movie)) {
                    var arr = [[data.movie], $scope.movies];
                }
                else {
                    var arr = [data.movie, $scope.movies];
                }

                $log.log(arr);
                var res = [];
                for(var i = 0; i < arr[0].length; i++) {
                    for(var j = 0; j < arr[1].length; j++) {
                        if(arr[0][i].title == arr[1][j].title) {
                            res.push(arr[0][i]);
                        }
                    }
                }

                $scope.movies = res;
            }
        }

    }])
    .controller('DetailCtrl', ['$scope', '$http', 'x2js', '$log', 'queryFactory', '$routeParams', function ($scope, $http, x2js, $log, queryFactory, $routeParams) {
        queryFactory.executeMovieQuery('//movies/movie[title =\"' + $routeParams.title  +'\"]', function(data) {
            $log.log(data.movie);
            $scope.movie = data.movie;
        });
    }]);
