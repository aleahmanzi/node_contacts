var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('Store', function(){
  return { user: null };
});

myApp.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejector) {
    if(rejector === 'not authenticated'){
      $location.path('/');
    }
  })
})

myApp.service('AuthService', function($http, $rootScope, $q, Store){

  this.getLoggedInUser = function(){
    return $http.get('/session').then(onSuccessfullLogin)
  };

  this.isAuthenticated = function(){
    if(!!Store.user) {
      return Store.user;
    } else {
      return $q.reject("not authenticated");
    }
  };

  function onSuccessfullLogin(response){
    Store.user = response;
    return response;
  }

});


