angular.module('myApp').controller('GroupDetailsCtrl', 
   function ($scope, getGroupFactory, $routeParams, $window) {


/// - default values

$scope.singleGroup = '';
$scope.groupID = $routeParams.groupID;
$scope.groupDeleted = false;
$scope.groupEdited = false;


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


/// - delete group 
      
$scope.ShowGroupConfirm = function () {
    if ($window.confirm("Are you sure you want to delete this group?")) {
      console.log("single group", $scope.singleGroup)

      getGroupFactory.deleteGroup($scope.singleGroup.id)
        .success(function(){
           $scope.contactDeleted = true;
        });
    } 
}


})