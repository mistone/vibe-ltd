/* global app, angular */

app.controller('accountCtrl', ['$scope', '$location', '$window','userService', function($scope, $location, $window, userService) {

    $scope.user = userService.data;

    $scope.cancel = function() {
        $window.location.reload();
    };
    
    $scope.logout = userService.logout;

}]);
