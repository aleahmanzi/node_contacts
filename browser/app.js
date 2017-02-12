var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('Store', function(){
  return { user: null };
});

myApp.service('AuthService', function($http, $rootScope, $q, Store){

  this.getLoggedInUser = function(){
    return $http.get('/session').then(onSuccessfullLogin)
  };
  this.isAuthenticated = function(){
    return !!Store.user;
  };

  function onSuccessfullLogin(response){
    Store.user = response;
    return response;
  }

});

myApp.controller('Ctrl', function ($scope) {

  $scope.test = 'Angular is working!'

}); /// Ctrl

