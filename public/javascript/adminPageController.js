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

    // Requesting to add a product to the catalogue        
    $scope.addProduct = function (newItemDetails) { 
        // Checking if there is any data in the new product object
        if (newItemDetails == undefined){
            console.log('item null');
        } else {
            // Checking if there is all the required data in the new product object
            console.log('item not null');
            if ((newItemDetails.pid == undefined)||(newItemDetails.productName == undefined)||(newItemDetails.category == undefined)||(newItemDetails.description == undefined)||(newItemDetails.price == undefined)){
                console.log('Missing fields of the new product.');
            } else {
                console.log(newItemDetails);
                
                // Checking if a similar product id exists in the catalogue
                $http.get('product/item/' + newItemDetails.pid).success(function(response, statusCode) {
                    
                    if (statusCode == 200){ 
                        // Sending the new item details of the product id is not matched
                        $http.post('product/addProduct', newItemDetails).success(function(response, statusCode) {
                            if (statusCode == 200){       
                                alert(response);
                                window.location = "/admin.html"; 
                            }
                            console.log(statusCode + ' : ' + response);
                        }).error(function(response, statusCode) {            
                            alert(response);
                            console.log(statusCode + ' : ' + response);
                        });

                    } 
                    // Product id exists in the catalogue
                    if (statusCode == 204){
                        console.log('Product ID already exists.');   
                        alert('Product ID already exists.');
                    }
                    console.log(statusCode + ' : ' + response);
                }).error(function(response, statusCode) {  
                    alert('There was an error. Please try again.');
                    console.log(statusCode + ' : ' + response);
                });
            }    
        }

    };
        
}]);