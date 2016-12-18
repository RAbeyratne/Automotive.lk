/**
 * Created by Ramitha on 12/18/2016.
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
}]);