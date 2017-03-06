var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('Store', function(){
  return { user: null };
});

myApp.service('AuthService', function($http, $rootScope, $q, Store){

  this.getLoggedInUser = function(){
    return $http.get('/session').then(onSuccessfullLogin)
  };
  this.isAuthenticated = function(){
    if(Store.user){
      return true
    } else {
      return $q.reject('Not Authenticated');
    }
  };

  function onSuccessfullLogin(response){
    Store.user = response;
    return response;
  }

});


