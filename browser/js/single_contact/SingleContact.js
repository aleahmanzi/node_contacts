angular.module('myApp').controller('ContactDetailsCtrl', 
   function ($scope, getContactsFactory, $routeParams, $window) {


/// - default values

$scope.singleContact = '';
$scope.contactAddress = '';
$scope.contactID = $routeParams.contactID;
$scope.contactAddress;
$scope.addressDetails = false;
$scope.contactDeleted = false;
$scope.contactEdited = false;
$scope.editGrid = false;
$scope.status = '  ';
$scope.customFullscreen = false;
$scope.allAddresses = [];


/// - get contact detail

getContactsFactory.getContactData($scope.contactID)
  .success(function(data){
    $scope.singleContact = data.contactInfo

    for(var i = 0; i < data.contactInfo.length; i++){
      var singleContact = data.contactInfo[i];      

      if(singleContact.id === $scope.contactID){
        $scope.singleContact = singleContact;
        console.log("here is the single contact", $scope.singleContact);
        $scope.contactAddresses = singleContact.address;
      }
    }
  })

/// - get address detail

      
  getContactsFactory.getAddressData($scope.contactAddress)
  .success(function(data){
    $scope.addressOptions = data.addressInfo
    $scope.addressDetails = true;

    for(var i = 0; i < $scope.addressOptions.length; i++){
        var address = data.addressInfo[i]; 
        var addressId = address.id ;

      for(var a = 0; a < $scope.contactAddresses.length; a++){
          if(addressId === $scope.contactAddresses[a]){
            console.log("address pushing", address)
            $scope.allAddresses.push(address);
            console.log($scope.allAddresses.length)
            console.log("allAddresses", $scope.allAddresses)
        }
      }
    }
  })


/// - edit contact details

$scope.updateContact = function(singleContact) {
  console.log("contactID", $scope.singleContact)
    
    $scope.editGrid = true;
    $scope.firstName = $scope.singleContact.name.firstName;
    $scope.lastName = $scope.singleContact.name.lastName;
    $scope.birthday = $scope.singleContact.birthday.date;
    $scope.mobile = $scope.singleContact.phoneNumber.mobile;
    $scope.workNum = $scope.singleContact.phoneNumber.work;
    $scope.personal = $scope.singleContact.email.personal;
    $scope.workMail = $scope.singleContact.email.work;
    $scope.company = $scope.singleContact.company;
    $scope.street1 = $scope.address.street1;
    $scope.street2 = $scope.address.street2;
    $scope.city = $scope.address.city;
    $scope.state = $scope.address.state;
    $scope.zip = $scope.address.zip;
    $scope.country = $scope.address.country;
} 

$scope.submitEdit = function(firstName, lastName, birthday, mobile, workNum, personal, workMail, company, street1, street2, city, state, zip, country){

  var address = {
    id: $scope.address.id,
    street2: $scope.street2,
    city: $scope.city,
    state: $scope.state,
    zip: $scope.zip,
    country: $scope.coutry
  }

  if($scope.singleContact.address.length === 0){
    console.log("singleContact address length", $scope.singleContact.address.length)
    
    getContactsFactory.postAddress(address)
      .success(function(result) {
        console.log("address", result)
        console.log("resultID", result.id)
        $scope.street1 = '';
        $scope.street2 = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
        $scope.country = '';

     var contact = {
      id: $scope.singleContact.id,
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
  };   

    getContactsFactory.editContact($scope.singleContact.id, contact)
      .success(function(){
        console.log("here is the contact", contact)
        $scope.contactEdited = true;
        $scope.editGrid = false;
    })
    }) 
  } else {
    getContactsFactory.editAddress($scope.address.id, address)
      .success(function(){
        console.log("here is the address", address)
      })
  }

};

/// - delete contact 
      

$scope.ShowConfirm = function () {
    if ($window.confirm("Are you sure that you want to delete this contact?")) {
      console.log("contactID", $scope.singleContact)
      getContactsFactory.deleteContact($scope.singleContact.id)
        .success(function(){
           $scope.contactDeleted = true;
        });
    } 
}

  
})