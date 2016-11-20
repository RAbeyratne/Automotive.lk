/**
 * Created by Ramitha on 11/15/2016.
 */
var myApp = angular.module('signInPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Sign up page controller active ~~~');
    
    $scope.proceed = function () {
        console.log($scope.userName);
        console.log($scope.date);
        console.log($scope.email);
        console.log($scope.passwordField1);
        console.log($scope.passwordField2);
        if ($scope.passwordField1 == $scope.passwordField2){
            $scope.errorMessage = '';    
            var userDetails = {'fName' : $scope.userName,
                               'date'  : $scope.date, 
                               'email' : $scope.email, 
                               'password': $scope.passwordField1};
            $http.post('/users/userRegistration', userDetails).success(function(response) {
                console.log(response);
            });
        } else {
            console.log('Issue');
            $scope.errorMessage = '*Password mismatch!!!';
        }
    }
}]);