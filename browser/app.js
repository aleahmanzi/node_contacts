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

  var fact = {}

  fact.getContact = function() {
    return $http ({
      url: 'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

  fact.getContactData = function(contactID) {
    return $http ({
      url:'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: contactID }
    })
  }
  
  return fact;
})


/// POST contact factory

/*myApp.factory('postContactFactory', function($http){

  var fact = {}

  fact.postContact = function(data) {
    return $http ({
      url: '/',
      dataType: 'JSON',
      method: "POST", 
      data: data,
    })

    .success(function(addData) {
      console.log("new contact added!", addData)
    })
}
    return fact;
})*/

////////////// CONTROLLERS /////////////////

/// - GET contact Ctrl

myApp.controller('Ctrl', function ($scope, getContactsFactory, $routeParams) {
$scope.test = 'Angular is working!'

/// - default values

$scope.contacts = [];
$scope.contactID = '';
$scope.postMessage = false;
$scope.resultWrap = false;
$scope.detailsWrap = false;


///- return personal contacts

$scope.getContacts = function(){
  getContactsFactory.getContact()
  .success(function(result){

    $scope.resultWrap = true;
    $scope.postMessage = false;
    console.log(result);
    $scope.contacts = result.contactInfo;
  })
}


/// - get contact details

$scope.getContactDetails = function(contactID) {
  $scope.resultWrap = false; 
  $scope.detailsWrap = true;
  console.log("the contactID is still available", contactID)
  getContactsFactory.getContactData(contactID)
  .success(function(data){
    console.log("here is the new data", data);
    $scope.contacts = data.contactInfo;
    console.log(data.contactInfo)
  })

}
 

});  


/// - POST new contact NewContactCtrl

/* myApp.controller('NewContactCtrl', function ($scope, postContactFactory, $routeParams) {
$scope.test = 'Angular is working!'
 
/// - default values
$scope.contactGrid = false;
$scope.postMessage = false;

$scope.contact = {
   firstName: '',
   lastName: '',
   PersonalEmail: '',
   phoneNumber: ''
   };

/// - show form to add contact

  $scope.addContact = function(){
    $scope.contactGrid = true;
    $scope.postMessage = false;
  };

  /// - use data from form to create new contact

  postContactFactory.postContact()
      .then(function(contact){
        $scope.postMessage = true;
        $scope.resultWrap = false;
        $scope.contactGrid = false;
        console.log("here is the new contact", contact);
  });

}); */

