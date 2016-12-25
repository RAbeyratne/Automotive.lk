/**
 * Automotive.lk
 */
var myApp = angular.module('productPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Product page controller active ~~~');
    
    $http.get('/product/').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Received product catalog data from server ~~~");
            $scope.productList = response;   
        }        
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });

    
    $scope.displayItemDetails = function (productId) { 
        window.location = '/item.html?pid=' + productId; 
    };
        
    
}]);