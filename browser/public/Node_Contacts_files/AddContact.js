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

  return fact;

})
