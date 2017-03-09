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
        console.log("here is the new contact", contact);
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.mobile = '';
        $scope.personal = '';

     });
}


});




