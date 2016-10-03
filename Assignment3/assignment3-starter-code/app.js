(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsTemplate.html',
    scope: {
      items: '<',
      onRemove: '&',
      errorMsg: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'Dlist',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var Dlist = this;
  console.log(this)
  Dlist.isEmpty = function() {
    console.log(Dlist.items)
    return (Dlist.items == 'undefinded' || Dlist.items.length === 0);
  }
}  

function FoundItemsDirectiveLink(scope, element, attribute, controller) {
  console.log("Element is:" + element)
  scope.$watch('Dlist.isEmpty()', function(newValue, oldValue){
    console.log("old and new values of isEmpty are: " + oldValue + " and " + newValue);   
    if(newValue === true) {
      displayNoResultsMessage();
    } else {
      removeNoResultsMessage();
    }
  });

  function displayNoResultsMessage() {
    element.find("span.error").slideDown(900);
  }

  function removeNoResultsMessage() {
    element.find("span.error").slideUp(900);
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.itemName = "";
  list.items = [];
  list.errorMsg="";

  list.found = function () {
    list.items = [];
    list.errorMsg="";
    
    // getMatchedMenuItems returns a promise, so can be .thenED
    if (list.itemName.trim() !== "") {
      // search for string
      MenuSearchService.getMatchedMenuItems(list.itemName)
      .then(function (response) {
        list.items = response.foundItems;
        console.log(list.items.length)
        if (list.items.length === 0) {list.errorMsg="Nothing found"}
       })
      .catch(function (error) {
        list.errorMsg="Something Went Wrong" + error;
        list.items = [];
        console.log(error);
      })
    } else {
      list.errorMsg="Please enter something to search for";
      // list.items=[]
      console.log(list.errorMsg + " and number of items: " + list.items.length)
    }

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
