'use strict';

/**
 * @ngdoc overview
 * @name wdm1App
 * @description
 * # wdm1App
 *
 * Main module of the application.
 */
angular
  .module('wdm1App', [
    'ngRoute',
    'xml',
    'wdm1App.factory.query'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
