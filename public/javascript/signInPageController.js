/**
 * Created by Ramitha on 11/15/2016.
 */
var myApp = angular.module('signInPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Sign in page controller active ~~~');
    
    $scope.proceed = function () {
        console.log($scope.email);
        console.log($scope.password);
        
        var userLoginDetails = {'email' : $scope.email, 'password' : $scope.password};
        
        $http.post('users/userAuthentication', userLoginDetails).success(function(response, statusCode) {
            if (statusCode == 200){        
                $scope.notificationText = 'Authentication successful. You will be automatically redirected to the home page.';  

                function redirectToPage() {
                    setTimeout(function(){
                        window.location = "/"; 
                    }, 3000);
                }
                redirectToPage();                
            }
            console.log(statusCode + ' : ' + response);
        }).error(function(response, statusCode) {            
            if (statusCode == 400){
                $scope.password = '';
                $scope.notificationText = 'Invalid user name and password.';
            }
            console.log(statusCode + ' : ' + response);
        });
     }
}]);


// t@mail.com