(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$http','ApiBasePath'];
function MenuDataService($q, $http, ApiBasePath) {
  var service = this;

  var categories = [];
  var categoryItems = [];

  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    var deferred = $q.defer();
    //get all menu items off the bat
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json"),
    })

    response.success(function(data) {
      var categories = data.categories;
      deferred.resolve({
        "foundItems" : categories
      })
    })
    .error(function(msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };

  service.getMatchedMenuItems = function (categoryShortName) {
    var deferred = $q.defer();
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
    })
    
    response.success(function(data) {
      var categoryItems = data.menu_items;
      deferred.resolve({
        "foundItems" : categoryItems
      })
    })
    .error(function(msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
}

})();
