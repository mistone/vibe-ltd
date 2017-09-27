/* global angular, firebase */

var app = angular.module('vibe', ['firebase','ngRoute']);

app.config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode();
}]);

app.controller('appCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', '$window',
    function($scope, $firebaseAuth, $firebaseObject, $window) {

        $scope.auth = $firebaseAuth().$getAuth();
        
        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser && firebaseUser.uid) {
                $scope.auth = firebaseUser;
                var ref = firebase.database().ref();
                var data = ref.child('users').child($scope.auth.uid);
                $scope.user = $firebaseObject(data);
            }
            else {
                if ($scope.user) {
                    $scope.user = null;
                    var url = $window.location.href;
                    $window.location.href = url.replace('/account/', '');
                }
            }
        });

        $scope.logout = function() {
            $firebaseAuth().$signOut();
        };

        $scope.cancel = function() {
            $window.location.reload();
        };
        $scope.save = function() {
            $scope.user.$save();
        };
        $scope.subscription = function() {
            $scope.user.subscription = !$scope.user.subscription;
        };
    }
]);
