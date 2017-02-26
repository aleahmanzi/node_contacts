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
  
  return fact;
})