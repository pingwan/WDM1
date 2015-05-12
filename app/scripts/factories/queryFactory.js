'use strict';

angular.module('wdm1App.factory.query', [])
    .factory('queryFactory', ['$http', '$log', 'x2js', function($http, $log, x2js){
        var executeExistQuery = function(xml, query, callback) {
            //query = 'movies_alone.xml?_query=//movies/movie/title';
            $http.get('http://localhost:8080/exist/rest/db/apps/demo/data/' + xml + '?_query=' + query,
                {
                    transformResponse: function(data) {
                        var json = x2js.xml_str2json(data);
                        return json.result;
                    }
                }
            )
                .success(function(data) {
                    callback(data);
                })
        };

        return {
            executeMovieQuery: function(query, callback) {
                executeExistQuery('movies_alone.xml', query, callback);
            }
        };
    }]);