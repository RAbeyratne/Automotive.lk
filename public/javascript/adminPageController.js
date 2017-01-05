/**
 * Automotive.lk
 */
var myApp = angular.module('adminPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Admin page controller active ~~~');    
        
    // Get all product details
    $http.get('/product/').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Received product catalog data from server ~~~");
            $scope.productList = response;   
        }        
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });

          
    // Get all order details
    $http.get('/order/').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Received order details data from server ~~~");
            $scope.orderList = response;   
        }        
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });

            
    $scope.addProduct = function (newItemDetails) { 
        if (newItemDetails == ''){

        } else {
            if (newItemDetails.pid == ''){

            } else {
                console.log(newItemDetails);   
            }    
        }

    };
        
}]);