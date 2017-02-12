var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('Store', function(){
  return { user: null };
});

myApp.service('AuthService', function($http, $rootScope, $q, Store){

  this.getLoggedInUser = function(){
    //return $http.get('/session').then(onSuccessfullLogin)
  };
  this.isAuthenticated = function(){
    return !!Store.user;
  };

  function onSuccessfullLogin(response){
    Store.user = response;
    return response;
  }

});

myApp.factory('getContacts', function($http){
  return function(){
    return $http ({
      url: 'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'}
    });
  }
});


myApp.controller('Ctrl', function ($scope, $rootScope, getContacts) {
$scope.test = 'Angular is working!'

/// - default values
$scope.contacts = [];

///- return personal contacts
 
 $scope.getContacts = function(){
    console.log("empty contact list", $scope.contacts)
     getContacts().success(function(result){
          $scope.contacts = result;
          console.log("response from GET request for contacts", $scope.contacts);
      })
  };



}); /// Ctrl

