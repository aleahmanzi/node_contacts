angular.module('myApp').controller('ContactDetailsCtrl', 
   function ($scope, getContactsFactory, $routeParams) {


/// - default values

$scope.singleContact = '';
$scope.contactID = $routeParams.contactID;
$scope.contactAddress;
$scope.addressDetails = false;
$scope.contactDeleted = false;
$scope.contactEdited = false;
$scope.editGrid = false;


/// - get contact detail

getContactsFactory.getContactData($scope.contactID)
.success(function(data){
  $scope.singleContact = data.contactInfo
  
  for(var i = 0; i < data.contactInfo.length; i++){
    var singleContact = data.contactInfo[i];      
    console.log(singleContact);

    if(singleContact.id === $scope.contactID){
      console.log("here is the single contact", singleContact);
      $scope.singleContact = singleContact;
      $scope.contactAddress = singleContact.address[0];
      return singleContact;
    }
  }
})

/// - get address detail 

$scope.showAddress = function(contactAddress){

  getContactsFactory.getAddressData($scope.contactAddress)
  .success(function(data){
    $scope.addressOptions = data.addressInfo
    $scope.addressDetails = true;

    for(var i = 0; i < data.addressInfo.length; i++){
      var address = data.addressInfo[i]; 
      var addressId = address.id 

      if(addressId === $scope.contactAddress){
        console.log("here is the address", address);
        $scope.address = address;
        $scope.contactAddress = address.address;
        console.log("here is the address", $scope.contactAddress)
        console.log("here's street1", address.street1)
        return address;
      }
    }
  })
}

/// - edit contact details

$scope.updateContact = function(singleContact) {
  console.log("contactID", $scope.singleContact)

    $scope.firstName = $scope.singleContact.name.firstName;
    $scope.lastName = $scope.singleContact.name.lastName;
    $scope.mobile = $scope.singleContact.phoneNumber.mobile;
    $scope.personal = $scope.singleContact.email.personal;
    $scope.editGrid = true;
} 

$scope.submitEdit = function(firstName, lastName, mobile, personal){
  console.log("data", $scope.firstName, $scope.lastName, $scope.mobile, $scope.personal );

  var contact = {
      id: $scope.singleContact.id,
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
  };

  getContactsFactory.editContact($scope.singleContact.id, contact)

    .success(function(){
      console.log("here is the contact", contact)
      $scope.contactEdited = true;
      $scope.editGrid = false;
    })
}

/// - delete contact 
      
$scope.deleteContact = function(singleContact) {

  console.log("contactID", $scope.singleContact)
  
  getContactsFactory.deleteContact($scope.singleContact.id)
    .success(function(){
       $scope.contactDeleted = true;
    });
};

  
})