angular.module('myApp').controller('Ctrl', 
   function ($scope, getContactsFactory, $routeParams) {

/// - default values

$scope.contacts = [];
$scope.contactID = '';
$scope.resultWrap = false;
$scope.detailsWrap = false;
$scope.singleContact = '';


///- return personal contacts

getContactsFactory.getContact()
  .success(function(result){

    $scope.resultWrap = true;
    $scope.postMessage = false;
    console.log(result);
    $scope.contacts = result.contactInfo;
  })


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
