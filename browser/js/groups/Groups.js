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

  $scope.getGroupDetails = function(groupID) {
  $scope.groupWrap = false; 
  $scope.detailsWrap = true;
  console.log("the groupID is still available", groupID)
  getGroupsFactory.getGroupData(groupID)
  .success(function(data){
    $scope.singleGroup = data.groupInfo

    for(var i = 0; i < data.groupInfo.length; i += 1){
      var singleGroup = data.groupInfo[i];      console.log(singleGroup);

      if(singleGroup.id === groupID){
        console.log("here is the single contact", singleGroup);
        $scope.singleGroup = singleGroup;
        return singleGroup;

      }
    }
  })
}
})

/// - POST new group NewGroupCtrl

myApp.controller('postGroupFactory', function ($scope, postGroupFactory, $routeParams) {
 
$scope.group = {
  name: ''
}

/// - show form to add group

$scope.addGroup = function(){
  $scope.groupGrid = true;
  $scope.postMessage = false;
};

  /// - use data from form to create new group

$scope.createGroup = function(groupName) {
  console.log("data", $scope.groupName );
  var group = { name: $scope.groupName } 
    postGroupFactory.postGroup(group)
      .then(function(){
        console.log("this is the group", group)  

        $scope.postMessage = true;
        $scope.groupGrid = false;
        console.log("here is the new group", group);
     });
}


});
