angular.module('myApp').controller('NewContactCtrl', 
  function ($scope, postContactFactory, $routeParams) {
 
$scope.contact = {
  name: {
    firstName: '',
    lastName: ''
  },
  birthday: {
    date: ''
  },
  phoneNumber: {
    mobile: '',
    work: ''
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
  $scope.contactCreated = false;
};

  /// - use data from form to create new contact

$scope.createContact = function(firstName, lastName, birthday, mobile, workNum, personal, workMail, company) {
  var contact = {
  name: {
      firstName: $scope.firstName,
      lastName: $scope.lastName
    },
    birthday: {
      date: $scope.birthday
    },
    phoneNumber: {
      mobile: $scope.mobile,
      work: $scope.workNum
    },
    email: {
      personal: $scope.personal,
      work: $scope.workMail
    },
    company: $scope.company
  } 
    postContactFactory.postContact(contact)
      .then(function(){
        console.log("this is the contact", contact)  
        $scope.contactCreated = true;
        console.log("here is the new contact", contact);
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.mobile = '';
        $scope.personal = '';
        $scope.birthday = '';
        $scope.workNum = '';
        $scope.workMail = '';
        $scope.company = '';

     });
}


});




