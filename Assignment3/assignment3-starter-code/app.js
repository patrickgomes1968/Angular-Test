(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller(NarrowItDownAppController', NarrowItDownAppController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownAppController.$inject = ['MenuSearchService'];
function MenuCategoriesController(MenuCategoriesService) {
  var list = this;

  list.found = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // var foundItems = []
  service.getMatchedMenuItems = function (searchTerm) {
    var foundItems = [];
    //get all menu items off the bat
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      // params: {
      //   category: shortName
      // }
    });
    for (item in response.data) {
      if item.description(searchTerm) 
        foundItems.push(item)
      }
    }
    console.log(foundItems)
    return response;
  };

}

})();
