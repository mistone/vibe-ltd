/* global angular, firebase */

var app = angular.module('vibe', ['firebase']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('appCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', '$window',
    function($scope, $firebaseAuth, $firebaseObject, $window) {

        $scope.auth = $firebaseAuth().$getAuth();

        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            $scope.auth = firebaseUser;
            var ref = firebase.database().ref();
            var data = ref.child('users').child($scope.auth.uid);
            $scope.user = $firebaseObject(data);
        });

        $scope.login = function() {
            $firebaseAuth().$signInAnonymously()
                .then(function(firebaseUser) {
                    $window.location.href += '/account';
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
        };

        $scope.register = function() {
            $firebaseAuth().$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function(firebaseUser) {
                }).catch(function(error) {
                    $scope.error = error;
                });
        };

        $scope.logout = function() {
            $scope.auth.$signOut();
            $scope.user = {};
            window.location.href -= '/account';
        };

        var account = angular.copy($scope.user); // original data

        $scope.cancel = function() {
            $scope.user = angular.copy(account);
        };
        $scope.save = function() {
            $scope.user.$save().then(function(res) {
                account = angular.copy($scope.user); // reset original data to new
            });
        };
        $scope.subscription = function() {
            $scope.user.subscription = !$scope.user.subscription;
        };
    }
]);
