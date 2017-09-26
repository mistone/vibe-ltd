/* global app, angular, firebase */

app.controller('accountCtrl', ['$scope', 'userService', function($scope, userService) {
    var account = angular.copy(userService.data); // original data
    $scope.account = userService.data;
    $scope.cancel = function() {
        $scope.account = angular.copy(account);
    };
    $scope.save = function() {
        $scope.account.$save().then(function(res) {
            account = angular.copy(userService.data); // reset original data to new
        });
    };
    $scope.subscription = function() {
        $scope.account.subscription = !$scope.account.subscription;
    };
}]);
