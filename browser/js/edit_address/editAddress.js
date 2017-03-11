angular.module('myApp').controller('Ctrl', 
   function ($scope, getContactsFactory, $routeParams) {


/// - default values

$scope.allAddresses = $routeParams.allAddresses;






function(street1, street2, city, state, zip, country){

  var address = {
    street2: $scope.street2,
    city: $scope.city,
    state: $scope.state,
    zip: $scope.zip,
    country: $scope.coutry
  }
  getContactsFactory.editAddress($scope.allAddresses.id, address)
    .success(function(){
      console.log("here is the address", address)
    })
};


});