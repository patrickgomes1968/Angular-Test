(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'CategoryListController',
    controllerAs: 'categoryListCtrl',
    resolve: {
      Catitems: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  
  // Item page
  .state('item', {
    url: '/item/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'ItemsController as itemsCtrl',
    // controllerAs: 'itemsCtrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
    }
  })

  //Added this nested view of item Desccription of my own accord
  .state('item.itemDescrip', {
    url: '/item-descrip/{itemId}',
    templateUrl: 'src/menuapp/templates/item-descrip.template.html',
    controller: "ItemDescripController as itemDescripCtrl"
  });
}

})();