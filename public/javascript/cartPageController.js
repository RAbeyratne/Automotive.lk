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
            
             $http.get('/cart/totalAmount').success(function (response, statusCode) {        
                if (statusCode == 200){
                    console.log(response);
                    $scope.totalCartAmount = response;
                }
             });
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
        
    $http.get('/users/sessionDataAvailability').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Session data available");
            window.location = '/checkout.html';
        }            
    }).error(function (response, statusCode) {  
        if (statusCode == 409){
            console.log("Session data NOT available"); 
            $scope.notificationText = 'Please login to checkout from the cart!!!';         
            function redirectToPage() {
                    setTimeout(function(){
                        window.location = "/signIn.html"; 
                    }, 2200);
                }
            redirectToPage();   
        } else {
            console.log(statusCode + ' : ' + response);
            $scope.notificationText = 'Server error!!! Please try again later!!!';      
        }     
    });
        

    };
        
    
}]);