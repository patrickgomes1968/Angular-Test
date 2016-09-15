(function () {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope','$timeout'];

function LunchCheckerController($scope, $timeout) {
    $scope.lunchItems = "";
    $scope.feebackMsg = "Go on...";

    $scope.CountItems = function () {
        // console.log($scope.lunchItems);
        if ($scope.lunchItems == "") { //Nothing entered
            $scope.feebackMsg = "Please enter data first.";
            $scope.lunchItems = "";
        } else {
            //Caluclate the items
            var NoOfItems = CountItems($scope.lunchItems);
            // console.log(NoOfItems);
            if (NoOfItems < 4) {
                $scope.feebackMsg = "Enjoy!";
            } else {
                $scope.feebackMsg = "Too much!";
            }    	
        }
	    function CountItems(ItemString) {
            var items = ItemString.split(',');
            var ItemsTotal = 0;
            for (var i = 0; i < items.length; i++) { 
                // console.log(items[i]);
                // console.log(ItemsTotal);
                if (items[i].trim().length != 0) {
                    ItemsTotal = ItemsTotal + 1;
                }
            }
            return ItemsTotal; 
        }
    }
}	

})();
