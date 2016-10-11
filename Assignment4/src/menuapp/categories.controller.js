(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);

CategoryListController.$inject = ['Catitems'];
function CategoryListController(items) {
    var categoriesListCtrl = this;

    categoriesListCtrl.catitems = items;
    console.log("Cat items inside Cat.Controller: " + categoriesListCtrl.catitems)
}

})();