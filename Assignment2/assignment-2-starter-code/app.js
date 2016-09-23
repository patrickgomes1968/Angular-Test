(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyListController)
.controller('AlreadyBoughtShoppingController', BoughtListController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

Config .$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.toBuyList = [
      {name: "apples", quantity: '2 lbs'},
      {name: "bananas", quantity: '2 doz'},
      {name: "oranges", quantity: '3 lbs'},
      {name: "peaches", quantity: '1 lb'},
      {name: "watermelon", quantity: '1 pc'}];
  ShoppingListProvider.defaults.boughtList = [];
}

ToBuyListController.$inject = ['ShoppingList'];
function ToBuyListController(ShoppingList) {
  var list1 = this
  list1.items = ShoppingList.getToBuyItems();
  console.log(list1.items.length)

  list1.removeItem = function (itemIndex) {
    ShoppingList.removeItem(itemIndex);
    // if list1.items.length == 0 {var EverythingBought = true };
  };
}

BoughtListController.$inject = ['ShoppingList'];
function BoughtListController(ShoppingList) {
  var list2 = this;
  list2.items = ShoppingList.getBoughtItems();
}


function ShoppingListService(BothLists) {
  console.log("Inside ShoppingListService")
  // 
  var service = this;

  var itemsToBuy = BothLists.toBuyList;
  console.log(itemsToBuy)
  var boughtItems = BothLists.boughtList

  // As per requirements, we only remove from the ToBuyList
  service.removeItem = function (itemIndex) {
    var removedItem = itemsToBuy[itemIndex]
    console.log(removedItem)
    itemsToBuy.splice(itemIndex, 1)
    boughtItems.push(removedItem)
    console.log(boughtItems)
  };

  service.getToBuyItems = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}


function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    toBuyList: [],
    boughtList: []
  };

  provider.$get = function () {
    // console.log("About to create intance of ShoppingList from inside Provider")
    var ShoppingList = new ShoppingListService(provider.defaults);
    return ShoppingList;
  };
}

})();




  // list.addItem = function () {
  //   try {
  //     ShoppingList.addItem(list.itemName, list.itemQuantity);
  //   } catch (error) {
  //     list.errorMessage = error.message;
  //   }
  // }


  // //The following is for possible future use
  // list2.removeItem = function (itemIndex) {
  //   ShoppingList.removeBoughtItem(itemIndex);
  // };