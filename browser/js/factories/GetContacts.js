angular.module('myApp')

/// GET contacts factory

.factory('getContactsFactory',  function($http){

  var fact = {}

  fact.getContact = function(userId) {
    return $http ({
      url: '/contactInfo/' + userId,
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
    })
  }

  fact.getContactData = function(contactID) {
    return $http ({
      url:'/contactInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: contactID }
    })
  }

  fact.getAddressData = function(contactAddress) {
    return $http ({
      url:'/addressInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: contactAddress }
    })  
  }

  fact.editContact = function(contactID, toUpdate){
    return $http ({
      url: '/contactInfo/' + contactID,
      dataType: 'JSON',
      method: "PUT", 
      data: toUpdate
    })
  .success(function(contact) {
    console.log("contact edited!", contact)
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

fact.deleteContact = function(contactID, contact){
    return $http ({
    url: '/contactInfo/' + contactID,
    dataType: 'JSON',
    method: "DELETE", 
    data: contactID,
  })
  .success(function(contact) {
    console.log("contact deleted!", contact)
  })
}

  return fact;
})