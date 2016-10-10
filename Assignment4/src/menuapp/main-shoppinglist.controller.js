(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['ShoppingListService', 'items'];
//items has already been fetched/resolved in the ui-state 'mainList'.
// Look inside routes.js to see it happen
function MainShoppingListController(ShoppingListService, items) {
  var mainlist = this;
  mainlist.items = items;
}

})();
