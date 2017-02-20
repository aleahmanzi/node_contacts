angular.module('myApp').controller('getGroupCtrl', 
   function ($scope, getGroupFactory, $routeParams) {

$scope.test = 'Angular is working!'

/// - GET group Ctrl


/// - default values

$scope.groupWrap = false;
$scope.detailsWrap = false;

///- return personal groups

  $scope.getGroups = function(){
    console.log("we're getting Groups");
    getGroupFactory.getGroups()
    .success(function(result){
        $scope.groupWrap = true;
      console.log(result);
      $scope.groups = result.groupInfo;
      console.log("groups", $scope.groups)
    })
  }

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
}
)