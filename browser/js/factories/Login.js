angular.module('myApp')


.factory('Store', function(){
  return { user: null };
});

myApp.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejector) {
    if(rejector === 'not authenticated'){
      $location.path('/');
    }
  })
});

myApp.service('AuthService', function($http, $rootScope, $q, Store){

  this.getLoggedInUser = function(){
    return $http.get('/session').then(onSuccessfullLogin)
  };

  this.isAuthenticated = function(){    
    if(!!Store.user) {
      console.log("user", Store.user)
      return Store.user;
    } else {
      $q.reject("not authenticated");
      return null;
    }
  };

  function onSuccessfullLogin(response){
    Store.user = response;
    return response;
  }

});

myApp.run(function(AuthService){
  return AuthService.getLoggedInUser();
});