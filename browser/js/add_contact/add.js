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

$scope.address = {
  id: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  country: ''
}
$scope.addressID = '';
$scope.contactButton = true;

/// - show form to add contact

$scope.addContact = function(){
  $scope.resultWrap = false;
  $scope.contactCreated = false;
};

  /// - use data from form to create new contact

$scope.createContact = function(firstName, lastName, birthday, mobile, workNum, personal, workMail, company, street1, street2, city, state, zip, country) {

  var address = {
    street1: $scope.street1,
    street2: $scope.street2,
    city: $scope.city,
    state: $scope.state,
    zip: $scope.zip,
    country: $scope.coutry
  }  

  postContactFactory.postAddress(address)
    .success(function(result) {
      console.log("resultID", result.id)
      $scope.street1 = '';
      $scope.street2 = '';
      $scope.city = '';
      $scope.state = '';
      $scope.zip = '';
      $scope.country = '';


    var contact = {
      id: "",
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
        company: $scope.company,
        address: result.id
    }

    postContactFactory.postContact(contact)
      .then(function(contact){
        $scope.updatedContact = contact.contactInfo;
        console.log("contact", contact.data.id)
        $scope.contactCreated = true;
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.mobile = '';
        $scope.personal = '';
        $scope.birthday = '';
        $scope.workNum = '';
        $scope.workMail = '';
        $scope.company = '';
          
    var updatedAdd = {
      id: contact.data.address[0],
      contact: contact.data.id
    }

    postContactFactory.editAddress(contact.data.address, updatedAdd)
      .success(function(data) {              
        console.log("updatedAdd", data);
      });
     }); 
  });
};




});





