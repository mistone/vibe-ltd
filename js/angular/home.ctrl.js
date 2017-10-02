/* global app, angular */

app.controller('homeCtrl', ['$scope', 'userService', function($scope, userService) {

    $scope.registerForm = {
        firstName: '',
        lastName: '',
        age: null,
        city: '',
        state: '',
        phone: '',
        email: ''
    };
    
    $scope.login = userService.login;

    $scope.register = function() {
        userService.register($scope.registerForm);
    };

}]);
