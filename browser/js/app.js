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


/// - POST new contact NewContactCtrl

myApp.controller('NewContactCtrl', function ($scope, postContactFactory, $routeParams) {
$scope.test = 'Angular is working!'
 
/// - default values
$scope.contactGrid = false;
$scope.postMessage = false;

$scope.contact = {
  name: {
    firstName: '',
    lastName: ''
  },
  birthday: {
    source: '',
    date: '',
    age: ''
  },
  phoneNumber: {
    mobile: '',
    work: '',
    other: ''
  },
  email: {
    personal: '',
    work: '' 
  },
  company: ''
}

/// - show form to add contact

$scope.addContact = function(){
  $scope.contactGrid = true;
  $scope.postMessage = false;
};

  /// - use data from form to create new contact

$scope.createContact = function(firstName, lastName, mobile, personal) {
  console.log("data", $scope.firstName, $scope.lastName, $scope.mobile, $scope.personal );
  var contact = {
  name: {
      firstName: $scope.firstName,
      lastName: $scope.lastName
    },
    birthday: {
      source: '',
      date: '',
      age: ''
    },
    phoneNumber: {
      mobile: $scope.mobile,
      work: '',
      other: ''
    },
    email: {
      personal: $scope.personal,
      work: '' 
    },
    company: ''
  } 
    postContactFactory.postContact(contact)
      .then(function(){
        console.log("this is the contact", contact)  

        $scope.postMessage = true;
        $scope.resultWrap = false;
        $scope.contactGrid = false;
        console.log("here is the new contact", contact);
     });
}


});



/// - POST new group NewGroupCtrl

myApp.controller('postGroupFactory', function ($scope, postGroupFactory, $routeParams) {
$scope.test = 'Angular is working!'
 
/// - default values
$scope.groupGrid = false;
$scope.postMessage = false;

$scope.group = {
  name: ''
}

/// - show form to add group

$scope.addGroup = function(){
  $scope.groupGrid = true;
  $scope.postMessage = false;
};

  /// - use data from form to create new group

$scope.createGroup = function(groupName) {
  console.log("data", $scope.groupName );
  var group = { name: $scope.groupName } 
    postGroupFactory.postGroup(group)
      .then(function(){
        console.log("this is the group", group)  

        $scope.postMessage = true;
        $scope.groupGrid = false;
        console.log("here is the new group", group);
     });
}


});




