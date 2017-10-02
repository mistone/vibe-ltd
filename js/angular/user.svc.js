/* global app, angular, firebase */

app.service('userService', ['$firebaseAuth', '$firebaseObject', '$location', function($firebaseAuth, $firebaseObject, $location) {

    $firebaseAuth().$getAuth();
    
    var user = this;
    
    $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser && firebaseUser.uid) {
            user.auth = firebaseUser;
            var ref = firebase.database().ref();
            var data = ref.child('users').child(user.auth.uid);
            user.data = $firebaseObject(data);
            $location.path('/account');
        }
        else {
            if (user.auth) {
                data = null;
                $location.path('/');
            }
        }
    });

    this.login = function() {
        $firebaseAuth().$signInAnonymously();
    };

    this.register = function(form) {
        $firebaseAuth().$createUserWithEmailAndPassword(form.email, form.password)
            .then(function(firebaseUser) {
                delete form.email, delete form.password;
                user = angular.copy(form);
                user.$save();
            });
    };

    this.logout = function() {
        $firebaseAuth().$signOut();
    };

}]);
