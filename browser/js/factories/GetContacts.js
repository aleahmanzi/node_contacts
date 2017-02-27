angular.module('myApp')

/// GET contacts factory

.factory('getContactsFactory', function($http){

  var fact = {}

  fact.getContact = function() {
    return $http ({
      url: 'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

  fact.getContactData = function(contactID) {
    return $http ({
      url:'http://localhost:8080/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: contactID }
    })
  }

  fact.getAddressData = function(contactAddress) {
    return $http ({
      url:'http://localhost:8080/addressInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: contactAddress }
    })  
  }

    fact.editContact = function(contact){
      return $http ({
      url: 'http://localhost:8080/contactInfo',
      dataType: 'JSON',
      method: "PUT", 
      data: contact,
    })
    .success(function(contact) {
      console.log("contact edited!", contact)
    })
  }

  fact.deleteContact = function(contactID){
      return $http ({
      url: 'http://localhost:8080/contactInfo/' + contactID,
      dataType: 'JSON',
      method: "DELETE", 
      data: contactID,
    })
    .success(function(contact) {
      console.log("contact deleted!", contactID)
    })

  }
  
  return fact;
})