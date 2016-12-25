/**
 * Automotive.lk
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
            $http.post('/users/userRegistration', userDetails).success(function(response, statusCode) {
                if (statusCode == 200){        
                    $scope.notificationText = 'Registration successful. You will be automatically redirected to the sign-in page.';  

                    function redirectToPage() {
                        setTimeout(function(){
                            window.location = "/signIn.html"; 
                        }, 3000);
                    }
                    redirectToPage();
                    console.log(statusCode + ' : ' + response);
                }
            }).error(function(response, statusCode) {
                if (statusCode == 500){
                    $scope.notificationText = response;
                }
                if (statusCode == 409){
                    $scope.notificationText = 'The user email already exists. Please use another email id.';
                }
                console.log(statusCode + ' : ' + response);
                $scope.passwordField1 = '';
                $scope.passwordField2 = '';
            });
        } else {
            console.log('Password mismatch');
            $scope.notificationText = 'Password mismatch.';
            $scope.passwordField1 = '';
            $scope.passwordField2 = '';
        }
    }
}]);