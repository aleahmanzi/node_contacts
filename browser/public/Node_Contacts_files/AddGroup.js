angular.module('myApp')

/// POST group factory 

myApp.factory('postGroupFactory', function($http){

  var fact = {}

  fact.postGroup = function(group) {
    return $http ({
      url: 'http://127.0.0.1:8080/groupInfo',
      dataType: 'JSON',
      method: "POST", 
      data: group,
    })
    .success(function(group) {
      console.log("new group added!", group)
    })
}
    return fact;
})