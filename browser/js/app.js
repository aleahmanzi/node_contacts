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

angular.module('myApp').controller('NewContactCtrl', 
  function ($scope, postContactFactory, $routeParams) {
 
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
  $scope.contactButton = true;


/// - show form to add contact

$scope.addContact = function(){
  $scope.resultWrap = false;
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
        $scope.contactGrid = false;
        console.log("here is the new contact", contact);
     });
}


});



