(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateURL: 'foundItemsTemplate.html',
    scope: {
      Items: "<",
      onRemove: '&'
    },

    controller: FoundItemsDirectiveController,
    controllerAs: 'Dlist',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  console.log(this)
  list.isEmpty = function() {
    return (list.items == 'undefinded' || list.items.length === 0);
  }
}

function FoundItemsDirectiveLink(scope, element, attribute, controller) {
  scope.$watch('list.isEmpty()', function(newValue, oldValue){
    if(newValue === true) {
      displayNoResultsMessage();
    } else {
      hideNoResultsMessage();
    }
  });

  function displayNoResultsMessage() {
    var messageElement = element.find("span.error");
    messageElement.slideDown(900);
  }

  function hideNoResultsMessage() {
    var messageElement = element.find("span.error");
    messageElement.slideUp(900);
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.itemName = "";
  list.items = [];

  list.found = function () {
    // getMatchedMenuItems returns a promise, so can be .thenED
    MenuSearchService.getMatchedMenuItems(list.itemName)
    .then(function (response) {
      list.items = response.foundItems;
     })
    .catch(function (error) {
      console.log(error);
    })
  };

  list.removeItem = function(itemIndex) {
    list.items.splice(itemIndex, 1);
  }
};


MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
function MenuSearchService($http, $q, ApiBasePath) {
  var service = this;
// MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];
// function MenuSearchService($http, ApiBasePath, $q) {
//   var service = this;
  service.foundItems = [];
  service.getMatchedMenuItems = function (searchTerm) {
    // var foundItems = [];
    var deferred = $q.defer();
    //get all menu items off the bat
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    })
    // check for search items
    response.success(function(data) {
      var allItems = data.menu_items;
      var f_items = [];
      for(var i = 0; i < allItems.length; i++) {
        if ( allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          f_items.push(allItems[i]);
        }
      }
      // console.log(f_items);
      deferred.resolve({
        "foundItems" : f_items
      })
    })
    .error(function(msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
}

})();
