/* global angular, firebase */

var app = angular.module('vibe', ['firebase', 'ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: './html/views/home.html',
            controller: 'homeCtrl'
        })
        .when('/account', {
            templateUrl: './html/views/account.html',
            controller: 'accountCtrl',
            resolve: {
                authorize: authorize
            }
        });

    function authorize(userService, $location) {
        if (!userService.auth) $location.path('/');
    }

}]);

app.run(['$rootScope', 'userService', function($rootScope, userService) {
    $rootScope.user = userService.data;
}]);
