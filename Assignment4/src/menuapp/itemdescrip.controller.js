(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDescripController', ItemDescripController);


ItemDescripController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemDescrip = this;
  var item = items[$stateParams.itemId];
  itemDescrip.description = item.description;
  // itemDetail.quantity = item.quantity;
  // itemDetail.description = item.description;
}

})();