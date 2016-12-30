/**
 * Automotive.lk
 */
var myApp = angular.module('checkout', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Checkout controller active ~~~');
    
    // Checking  whether the user session data is available    
    $http.get('/users/sessionDataAvailability').success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Session data available");

            // Checking whether the cart data is available
            $http.get('/cart/cartDataAvailability').success(function (response, statusCode) {        
                if (statusCode == 200){
                    console.log("Cart data available");
                    
                    // Setting the data in the view
                    console.log(response);
                    
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!

                    var yyyy = today.getFullYear();
                    if(dd<10){
                        dd='0'+dd;
                    } 
                    if(mm<10){
                        mm='0'+mm;
                    } 
                    var dateToday = dd+'/'+mm+'/'+yyyy;
                    
                    $scope.date = dateToday;
                    $scope.checkoutData = response;
                    
                    console.log(dateToday);
                }            
            }).error(function (response, statusCode) {  
                if (statusCode == 409){
                    console.log("Cart data NOT available"); 
                    $scope.notificationText = 'Please add items to the cart before checking out!!!';         
                    function redirectToPage() {
                            setTimeout(function(){
                                window.location = "/products.html"; 
                            }, 2800);
                        }
                    redirectToPage();   
                } else {
                    console.log(statusCode + ' : ' + response);
                    $scope.notificationText = 'Server error!!! Please try again later!!!';      
                }     
            });
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
 
    
    $scope.proceed = function () { 
        console.log('Test');
        $http.post('order/', $scope.checkoutData).success(function(response, statusCode) {
            if (statusCode == 200){        
                $scope.notificationText = 'OK';  
            }
            console.log(statusCode + ' : ' + response);
        }).error(function(response, statusCode) {    
            console.log(statusCode + ' : ' + response);
        });
        console.log('Done');
    }   
    
}]);
