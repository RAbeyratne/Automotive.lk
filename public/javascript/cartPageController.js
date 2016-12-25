/**
 * Automotive.lk
 */
var myApp = angular.module('cartPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Cart page controller active ~~~');
    
    $http.get('/cart/').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Received cart items from server ~~~");
            console.log(JSON.stringify(response));
            $scope.cartItems = response;
        }      
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });

    
//    $scope.displayItemDetails = function (productId) { 
//        window.location = '/item.html?pid=' + productId; 
//    };
        
    
}]);