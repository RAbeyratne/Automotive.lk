/**
 * Created by Ramitha on 11/15/2016.
 */
var myApp = angular.module('signInPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Sign in page controller active ~~~');
    
    $scope.proceed = function () {
        console.log($scope.email);
        console.log($scope.password);
     }
}]);