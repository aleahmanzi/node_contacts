angular.module('myApp').controller('getGroupCtrl', 
   function ($scope, getGroupFactory, $routeParams) {

$scope.test = 'Angular is working!'

/// - GET group Ctrl

/// - default values

$scope.groupWrap = false;
$scope.detailsWrap = false;
$scope.groupGrid = false;
$scope.postMessage = false;

///- return personal groups

  getGroupFactory.getGroups()
    .success(function(result){
        $scope.groupWrap = true;
      console.log(result);
      $scope.groups = result.groupInfo;
      console.log("groups", $scope.groups)
    })


});

/// - POST new group NewGroupCtrl

myApp.controller('postGroupFactory', function ($scope, postGroupFactory, $routeParams) {
 
$scope.group = {
  name: '',
  contacts: ''
}

/// - show form to add group

$scope.addGroup = function(){
  $scope.groupGrid = true;
  $scope.postMessage = false;
  $scope.detailsWrap = false;
};

  /// - use data from form to create new group

$scope.createGroup = function(groupName, groupContacts) {
  console.log("data", $scope.groupName, $scope.groupContacts );
  var group = { name: $scope.groupName, contacts: $scope.groupContacts } 
    postGroupFactory.postGroup(group)
      .then(function(){
        console.log("this is the group", group)  

        $scope.postMessage = true;
        $scope.groupGrid = false;
        console.log("here is the new group", group);
     });
}


});
