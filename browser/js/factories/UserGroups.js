angular.module('myApp')

/// GET group factory

.factory('getGroupFactory', function($http){

  var fact = {}

  fact.getGroups = function() {
    return $http ({
      url: 'http://localhost:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK'},
      maxResult: '10'
    })
  }

  fact.getGroupData = function(groupID) {
    return $http ({
      url:'http://localhost:8080/groupInfo',
      method: 'GET',
      params: {callback: 'JSON_CALLBACK',
      id: groupID }
    })
  }

  return fact;
})