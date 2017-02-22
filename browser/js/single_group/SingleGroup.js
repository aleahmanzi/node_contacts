angular.module('myApp').controller('GroupDetailsCtrl', 
   function ($scope, getGroupFactory, $routeParams) {


/// - default values

$scope.singleGroup = '';
$scope.groupID = $routeParams.groupID;


/// - get single group

getGroupFactory.getGroupData($scope.groupID)
.success(function(data){
  $scope.singleGroup = data.groupInfo

  for(var i = 0; i < data.groupInfo.length; i += 1){
    var singleGroup = data.groupInfo[i];      console.log(singleGroup);

    if(singleGroup.id === $scope.groupID){
      console.log("here is the single contact", singleGroup);
      $scope.singleGroup = singleGroup;
      return singleGroup;

    }
  }
})
})