angular.module('myApp')

/// GET group factory

.factory('getGroupFactory', function($http){

  var fact = {}

  fact.getGroups = function() {
    return $http ({
      url: 'groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

  fact.getGroupData = function(groupID) {
    return $http ({
      url:'/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: groupID }
    })
  }

  fact.postGroup = function(group) {
    return $http ({
      url: '/groupInfo',
      dataType: 'JSON',
      method: "POST", 
      data: group,
    })
    .success(function(group) {
      console.log("new group added!", group)
    })
  }
  
  fact.getContact = function(userId) {
    return $http ({
      url: '/contactInfo/' + userId,
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
    })
  } 

  fact.editGroup = function(groupID, toUpdate){
    return $http ({
    url: '/groupInfo/' + groupID,
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
      url: '/groupInfo/' + groupID,
      dataType: 'JSON',
      method: "DELETE", 
      data: groupID,
    })
    .success(function(contact) {
      console.log("deleted group")
    })

  }

  return fact;
})