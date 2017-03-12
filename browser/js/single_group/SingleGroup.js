angular.module('myApp').controller('GroupDetailsCtrl', 
   function ($scope, getGroupFactory, $routeParams, $window) {


/// - default values

$scope.singleGroup = '';
$scope.groupID = $routeParams.groupID;
$scope.groupDeleted = false;
$scope.groupEdited = false;
$scope.editGroupGrid = false;
$scope.editGroupButtons = true;
$scope.groupDetails = true;
$scope.selected = {};
$scope.contacts;




/// - get single group

getGroupFactory.getGroupData($scope.groupID)
.success(function(data){
  $scope.singleGroup = data.groupInfo

  for(var i = 0; i < data.groupInfo.length; i += 1){
    var singleGroup = data.groupInfo[i];      console.log(singleGroup);

    if(singleGroup.id === $scope.groupID){
      console.log("here is the single group", singleGroup);
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


/// - edit group

$scope.updateGroup = function(){
  $scope.editGroupGrid = true;
  $scope.editGroupButtons = false;
  $scope.groupDetails = false;
  $scope.groupName = $scope.singleGroup.groupName;
  $scope.contacts = $scope.singleGroup.contacts;

    getGroupFactory.getContact()
    .success(function(result){
      console.log(result);
      $scope.contacts = result.contactInfo;
    });
}

$scope.submitEdit = function(groupName, contacts){
   for (var i = 0; i < $scope.contacts.length - 1; i++) {
          var item = $scope.contacts[i];

          $scope.selected[$scope.contacts.id] = true;
          $scope.idToAdd = Object.keys($scope.selected);
        }
        console.log("testing", Object.keys($scope.selected))

  var group = {
    id: $scope.singleGroup.id,
    name: $scope.groupName,
    contacts: $scope.idToAdd
  }
  console.log("here is the group before the request", group)
  
  getGroupFactory.editGroup($scope.singleGroup.id, group)
    .success(function(){
      console.log("here's the updated group", group)
    })
}


})