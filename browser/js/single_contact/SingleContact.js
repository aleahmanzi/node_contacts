angular.module('myApp').controller('ContactDetailsCtrl', 
   function ($scope, getContactsFactory, $routeParams) {


/// - default values

$scope.singleContact = '';
$scope.contactID = $routeParams.contactID;
$scope.contactAddress;
$scope.addressDetails = false;


/// - get contact detail

getContactsFactory.getContactData($scope.contactID)
.success(function(data){
  $scope.singleContact = data.contactInfo
  
  for(var i = 0; i < data.contactInfo.length; i += 1){
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

})