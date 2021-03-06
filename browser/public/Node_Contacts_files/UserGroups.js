angular.module('myApp')

/// GET group factory

.factory('getGroupFactory', function($http){

  var fact = {}

  fact.getGroups = function() {
    return $http ({
      url: 'http://127.0.0.1:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

  fact.getGroupData = function(groupID) {
    return $http ({
      url:'http://127.0.0.1:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: groupID }
    })
  }

  fact.editGroup = function(contactID, toUpdate){
    return $http ({
    url: 'http://127.0.0.1:8080/contactInfo/' + contactID,
    dataType: 'JSON',
    method: "PUT", 
    data: toUpdate,
  })
  .success(function(contact) {
    console.log("contact edited!", contact)
  })
}

  fact.deleteGroup = function(groupID, singleGroup){
      return $http ({
      url: 'http://127.0.0.1:8080/groupInfo/' + groupID,
      dataType: 'JSON',
      method: "DELETE", 
      data: groupID,
    })
    .success(function(contact) {
      console.log("contact deleted!", singleGroup)
    })

  }

  return fact;
})