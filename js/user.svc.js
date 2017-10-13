/* global app, firebase */

app.service('userService', ['$firebaseAuth', '$firebaseObject', '$window', function($firebaseAuth, $firebaseObject, $window) {

    var user = {
        auth: $firebaseAuth().$getAuth(),
        data: null
    };
    
    $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        user.auth = firebaseUser;
        var ref = firebase.database().ref();
        var data = ref.child('users').child(user.auth.uid);
        user.data = $firebaseObject(data);
    });

    this.login = function() {
        $firebaseAuth().$signInAnonymously()
            .then(function(firebaseUser) {
                $window.location.href += '/account';
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
    };

    this.register = function() {

    };

    this.logout = function() {

    };
    
    console.log(user);
    
    return user;

}]);
