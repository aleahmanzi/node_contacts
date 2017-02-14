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

myApp.factory('getContactsFactory', function($http){
  return function(){
    return $http ({
      url: 'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    });
  }
});

myApp.factory('')


myApp.controller('Ctrl', function ($scope, $rootScope, getContactsFactory) {
$scope.test = 'Angular is working!'

/// - default values
$scope.contacts = [];
$scope.contactGrid = false;
$scope.postMessage = false;
$scope.resultWrap = false;

$scope.contact = {
   firstName: '',
   lastName: '',
   PersonalEmail: '',
   phoneNumber: ''
   };


///- return personal contacts
 
 $scope.getContacts = function(){
    console.log("empty contact list", $scope.contacts)
    $scope.resultWrap = true;
    $scope.postMessage = false;
     getContactsFactory().success(function(result){
          $scope.contacts = result;
          console.log("response from GET request for contacts", $scope.contacts);
      })
  };

  $scope.addContact = function(){
    console.log("We're adding a new contact here");
    $scope.contactGrid = true;
    $scope.resultWrap = false;
    $scope.postMessage = false;

  };

  $scope.createContact = function(){
    console.log("Contact was created");
    $scope.postMessage = true;
    $scope.resultWrap = false;
    $scope.contactGrid = false;
  };


}); /// Ctrl

