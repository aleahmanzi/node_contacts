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

myApp.factory('postContactFactory', function($http){

  var fact = {}

  fact.postContact = function(contact) {
    return $http ({
      url: 'http://localhost:8080/contactInfo',
      dataType: 'JSON',
      method: "POST", 
      data: contact,
    })
    .success(function(contact) {
      console.log("new contact added!", contact)
    })
}
    return fact;
})

/// GET group factory

myApp.factory('getGroupFactory', function($http){

  var fact = {}

  fact.getGroups = function() {
    return $http ({
      url: 'http://localhost:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

    fact.getGroupData = function(groupID) {
    return $http ({
      url:'http://localhost:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: groupID }
    })
  }

  return fact;
})

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
$scope.singleContact = '';



///- return personal contacts

$scope.getContacts = function(){
  console.log("then were here");
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
    $scope.singleContact = data.contactInfo

    for(var i = 0; i < data.contactInfo.length; i += 1){
      var singleContact = data.contactInfo[i];      console.log(singleContact);

      if(singleContact.id === contactID){
        console.log("here is the single contact", singleContact);
        $scope.singleContact = singleContact;
        return singleContact;

      }
    }
  })
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

// - GET group Ctrl

myApp.controller('getGroupCtrl', function ($scope, getGroupFactory, $routeParams) {
$scope.test = 'Angular is working!'

/// - default values

$scope.groupWrap = false;
$scope.detailsWrap = false;

///- return personal groups

  $scope.getGroups = function(){
    console.log("we're getting Groups");
    getGroupFactory.getGroups()
    .success(function(result){
        $scope.groupWrap = true;
      console.log(result);
      $scope.groups = result.groupInfo;
      console.log("groups", $scope.groups)
    })
  }

  $scope.getGroupDetails = function(groupID) {
  $scope.groupWrap = false; 
  $scope.detailsWrap = true;
  console.log("the groupID is still available", groupID)
  getGroupsFactory.getGroupData(groupID)
  .success(function(data){
    $scope.singleGroup = data.groupInfo

    for(var i = 0; i < data.groupInfo.length; i += 1){
      var singleGroup = data.groupInfo[i];      console.log(singleGroup);

      if(singleGroup.id === groupID){
        console.log("here is the single contact", singleGroup);
        $scope.singleGroup = singleGroup;
        return singleGroup;

      }
    }
  })
}
})



