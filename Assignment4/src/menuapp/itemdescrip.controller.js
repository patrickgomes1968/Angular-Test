(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDescripController', ItemDescripController);

ItemDescripController.$inject = ['item'];
function ItemDescripController(item) {
  console.log(item);
  this.item = item;
 }
 
})();