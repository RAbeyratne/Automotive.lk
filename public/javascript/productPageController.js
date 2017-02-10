/**
 * Automotive.lk
 */
var myApp = angular.module('productPage', []);

$minPriceAmount = '';
$maxPriceAmount = '';

myApp.filter('priceFilter',[function (){
    
    return function (item) {
        
        var newArray = [];
        
        if (item != null) {
            angular.forEach(item, function(value,index){                
                if (($minPriceAmount == '') || ($maxPriceAmount == '')){ 
                    if (($minPriceAmount != '') && ($minPriceAmount > value.price)){       
                           // continue;
                    } else if (($maxPriceAmount != '') && ($maxPriceAmount < value.price)){     
                            //continue;
                    } else {         
                        newArray.push(value); 
                    }
                } else {
                    if (($minPriceAmount <= value.price) && ($maxPriceAmount >= value.price)){
                          newArray.push(value);
                     }
                }   
            });
            return newArray;
            console.log($minPriceAmount);
        };
        
    };
}]);

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
        
        
    $scope.clearSearchFields = function () { 
        $scope.keyWords = '';   
    };
        
    $scope.updatePriceMinFilter = function () { 
        //console.log("me");
        $minPriceAmount = $scope.minFilter; 
    };
    
    $scope.updatePriceMinFilter = function () { 
        $minPriceAmount = $scope.minFilter; 
    };    
        
    $scope.updatePriceMaxFilter = function () { 
        $maxPriceAmount = $scope.maxFilter; 
    };
}]);


