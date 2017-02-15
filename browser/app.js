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

////////// FACTORIES ////////////////


/// GET contacts factory

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

/// POST contact factory

myApp.factory('postContactFactory', function($http){

  return function(){
      return $http ({
        url: 'http://localhost:8080/createContact',
        dataType: 'JSON',
        method: "POST", 
        data: $scope.contact,
      })

      .success(function(addData) {
        console.log("new contact added!", addData)
      })
    }
})

////////////// CONTROLLERS /////////////////

/// - GET contact Ctrl

myApp.controller('Ctrl', function ($scope, getContactsFactory, $routeParams) {
$scope.test = 'Angular is working!'

/// - default values
$scope.contacts = [];
$scope.postMessage = false;
$scope.resultWrap = false;

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

}); 



/// - POST new contact NewContactCtrl

myApp.controller('NewContactCtrl', function ($scope, postContactFactory, $routeParams) {
$scope.test = 'Angular is working!'
 
/// - default values
$scope.contactGrid = false;
$scope.postMessage = false;
$scope.resultWrap = false;

$scope.contact = {
   firstName: '',
   lastName: '',
   PersonalEmail: '',
   phoneNumber: ''
   };

/// - show form to add contact

  $scope.addContact = function(){
    $scope.contactGrid = true;
    $scope.resultWrap = false;
    $scope.postMessage = false;
  };

  /// - use data from form to create new contact

  $scope.createContact = function(contact){
    console.log("Contact was created");
    $scope.postMessage = true;
    $scope.resultWrap = false;
    $scope.contactGrid = false;
    postContactFactory().success(function(contact){
      console.log("here is the new contact", contact);
    })
  };

}); 

