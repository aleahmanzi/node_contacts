angular.module('myApp')

/// POST contact factory

.factory('postContactFactory', function($http){

  var fact = {}

  fact.postContact = function(contact) {
    return $http ({
      url: '/contactInfo',
      dataType: 'JSON',
      method: "POST", 
      data: contact,
    })
    .success(function(contact) {
      console.log("new contact added!", contact)
    })
  }

  fact.postAddress = function(address) {
    return $http ({
      url: '/addressInfo',
      dataType: 'JSON',
      method: "POST", 
      data: address,
    })
    .success(function(postedAddress) {
    })
  }

  fact.editAddress = function(addressID, addressUpdate){
    return $http ({
    url: '/addressInfo/' + addressID,
    dataType: 'JSON',
    method: "PUT", 
    data: addressUpdate,
  })
  .success(function(address) {
    console.log("address edited!", address)
  })
}

  return fact;

})
