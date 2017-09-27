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
            if (firebaseUser && firebaseUser.uid) {
                $scope.auth = firebaseUser;
                var ref = firebase.database().ref();
                var data = ref.child('users').child($scope.auth.uid);
                $scope.user = $firebaseObject(data);
                if ($window.location.href.indexOf('/account') === -1) {
                    $window.location.href += '/account';
                }
            }
            else {
                if ($scope.user) {
                    $scope.user = null;
                    var url = $window.location.href;
                    $window.location.href = url.replace('/account/', '');
                }
            }
        });

        $scope.login = function() {
            $firebaseAuth().$signInAnonymously()
                .then(function(firebaseUser) {

                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
        };

        $scope.registerForm = {
            firstName: '',
            lastName: '',
            age: null,
            city: '',
            state: '',
            phone: null,
            email: ''
        };

        $scope.register = function() {
            $firebaseAuth().$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function(firebaseUser) {
                    $scope.user = angular.copy($scope.registerForm);
                    $scope.user.$save();
                }).catch(function(error) {
                    $scope.error = error;
                });
        };

        $scope.logout = function() {
            $firebaseAuth().$signOut();
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
    }
]);
