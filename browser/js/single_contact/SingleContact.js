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
$scope.editAddressGrid = false;
$scope.addressAdded = false;
$scope.addressSuccess = false;
$scope.allAddresses = [];
$scope.addressEdited = false;
$scope.allInfo = true;
var data;
$scope.oneAddress;

/// - get contact detail

getContactsFactory.getContactData($scope.contactID)
  .success(function(data){
    $scope.singleContact = data.contactInfo

    for(var i = 0; i < data.contactInfo.length; i++){
      var singleContact = data.contactInfo[i];      

      if(singleContact.id === $scope.contactID){
        $scope.singleContact = singleContact;
        console.log("single contact", $scope.singleContact)
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
            $scope.allAddresses.push(address);
            $scope.oneAddress = $scope.allAddresses[0];
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
} 

$scope.submitContactEdit = function(firstName, lastName, birthday, mobile, workNum, personal, workMail, company){

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
      company: $scope.company
    };   

    getContactsFactory.editContact($scope.singleContact.id, contact)
      .success(function(){
        console.log("here is the contact", contact)
        $scope.contactEdited = true;
        $scope.editGrid = false;
    })
};


/// - edit address

$scope.editAddress = function(oneAddress){
  console.log("single", $scope.oneAddress)

  $scope.editAddressGrid = true;
  $scope.street1 = $scope.oneAddress.street1;
  $scope.street2 = $scope.oneAddress.street2;
  $scope.city = $scope.oneAddress.city;
  $scope.state = $scope.oneAddress.state;
  $scope.zip = $scope.oneAddress.zip;
  $scope.country = $scope.oneAddress.country;
}

$scope.submitAddressEdit = function(street1, street2, city, state, zip, country){
  var address = {
    id: $scope.oneAddress.id,
    street1: $scope.street1,
    street2: $scope.street2,
    city: $scope.city,
    state: $scope.state,
    zip: $scope.zip,
    country: $scope.country
  }
  console.log("what were passing", address)
  getContactsFactory.editAddress($scope.oneAddress.id, address)
    .success(function(){
      console.log("here is the address", address)
      $scope.addressEdited = true;
      $scope.editAddressGrid = false;

    })
};


/// - add address to contact

$scope.newAddress = function(){
  console.log('were added an address!')
  $scope.addressAdded = true;
}

$scope.createAddress = function(firstName, lastName, birthday, mobile, workNum, personal, workMail, company, street1, street2, city, state, zip, country){
  var newData = {
    id: $scope.oneAddress.id,
    street1: $scope.street1,
    street2: $scope.street2,
    city: $scope.city,
    state: $scope.state,
    zip: $scope.zip,
    country: $scope.country,
    contact: $scope.singleContact.id
  }
  console.log("what were passing", newData)
  getContactsFactory.postAddress(newData)
    .success(function(result){
      console.log("here is the address ID", result)
      $scope.street1 = '';
      $scope.street2 = '';
      $scope.city = '';
      $scope.state = '';
      $scope.zip = '';
      $scope.country = '';
    
        var contact = {
          id: $scope.singleContact.id,
          address: [$scope.allAddresses.push(result)]
        };  

        getContactsFactory.editContact($scope.singleContact.id, contact)
          .success(function(){
            console.log("here is the contact with ADDRESS", contact)
        })
    })

}


/// - delete contact 
      

$scope.ShowConfirm = function () {
    if ($window.confirm("Are you sure that you want to delete this contact?")) {
      console.log("contactID", $scope.singleContact)
      getContactsFactory.deleteContact($scope.singleContact.id)
        .success(function(){
           $scope.contactDeleted = true;
           $scope.allInfo = false;

        });
    } 
}




/// - upload photo


document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById('clock').style.backgroundImage = "url(" + reader.result + ")";

    var contact = {
    id: $scope.singleContact.id,
    picture: [ reader.result ]
    }

  console.log("what were passing", contact)
  getContactsFactory.editContact($scope.singleContact.id, contact)
    .success(function(){
      console.log("here is the updated contact", contact)
      $scope.addressEdited = true;
    })

    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}

  
})