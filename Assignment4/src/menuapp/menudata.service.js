(function() {
    'use strict';

    angular.module('data')
    
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;
        var items =[];

        service.getAllCategories = function() {
            return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/categories.json")
            }).then(function(result) {
                return result.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
            params: {"category": categoryShortName}
            }).then(function(result) {
                items = result.data.menu_items;
                console.log(items);
                return items
            });
        };

        service.getItem = function(itemId) {
            console.log(itemId);
            console.log(items);
            return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items/" + itemId +".json")
                 }).then(function(result) {
                    return result.data;
            });
        };
    }
})();