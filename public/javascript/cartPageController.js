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
            
            for(var itemInCart in response){
                console.log(JSON.stringify(itemInCart));
            }      
        }      
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });

    
    $scope.removeItemFromCart = function (productId) { 
        console.log('remove ' + productId);
        $http.delete('/cart/removeItem/' + productId).success(function(response, statusCode) {
            if (statusCode == 200){
                console.log(response);
                alert('Successfuly removed item from the cart');
                location.reload();
            } else {
                console.log('Item removal failed');
                alert('Item removal failed');
                location.reload();
            }
            
        });
        
    };
    
    $scope.checkout = function () { 
        console.log('Checkout ');        
    };
        
    
}]);