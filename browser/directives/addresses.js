myApp.directive('addressSqr', function(ContactDetailsCtrl){  
  return {
    restrict: 'E',
    templateUrl: 'browser/directives/addresses.html',
    link: function(scope) {
      
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
              console.log("here's street1", address.street1)
            }
          }
        })

    }
  }
});