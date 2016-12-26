/**
 * Automotive.lk
 */
var myApp = angular.module('itemPage', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    console.log('Item page controller active ~~~');
    
    // Getting the product id sent with the URL
    var paramValue = location.search.substring(1).split("&");
    var temp = paramValue[0].split("=");
    var pid = unescape(temp[1]);
    console.log(pid);
    
     $http.get('/product/item/' + pid).success(function (response, statusCode) {        
        if (statusCode == 200){
            console.log("Received the item data from server ~~~");
            console.log(response);
            $scope.selectedItemDetails = response;
        }        
    }).error(function (response, statusCode) {  
        console.log(statusCode + ' : ' + response);       
    });
    
        
    $scope.sendItemDetailsToServer = function (quantity) { 
        var itemData = {
                        item: $scope.selectedItemDetails,
                        qty: quantity
                       }
         console.log(itemData);

         $http.post('cart/additem', itemData).success(function(response, statusCode) {
            if (statusCode == 200){ 
                alert('Successfuly added item to the cart');
                window.location = "/products.html"; 
            } else {
                alert('Item addition failed');
            }
            console.log(statusCode + ' : ' + response);
        }).error(function(response, statusCode) {            
            if (statusCode == 400){
                alert('Item addition failed');
            };
            console.log(statusCode + ' : ' + response);
        });
        
        
    };
}]);