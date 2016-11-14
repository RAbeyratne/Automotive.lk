/**
 * Created by Ramitha on 11/7/2016.
 */
var myApp = angular.module('productPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Product page controller active ~~~');
    
    $http.get('/fullProductList').success(function (req, res) {
        console.log("Received product catalog data from server ~~~");
        $scope.productList = req;
    });

}]);