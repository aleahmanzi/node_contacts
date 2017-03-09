angular.module('myApp')

/// POST contact factory

.factory('postContactFactory', function($http){

  var fact = {}

  fact.postContact = function(contact) {
    return $http ({
      url: 'http://localhost:8080/contactInfo',
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
      url: 'http://localhost:8080/addressInfo',
      dataType: 'JSON',
      method: "POST", 
      data: address,
    })
    .success(function(postedAddress) {
    })
  }

  return fact;

})
