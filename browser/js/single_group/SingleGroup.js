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
    var singleGroup = data.groupInfo[i];      

    if(singleGroup.id === $scope.groupID){
      console.log("here is the single group", singleGroup);
    }
  }
  
    for(var a=0; a < singleGroup.contacts.length; a++){
    
    getGroupFactory.getContact(singleGroup.contacts[a])
    .success(function(result){
      console.log(result);
      $scope.singleGroup = singleGroup;
    });
  }
})


/// - delete group 
      
$scope.ShowGroupConfirm = function () {
    if ($window.confirm("Are you sure you want to delete this group?")) {
      console.log("single group", $scope.singleGroup)

      getGroupFactory.deleteGroup($scope.singleGroup.id)
        .success(function(){
           $scope.groupDeleted = true;
        });
    } 
}


/// - edit group

$scope.updateGroup = function(){
  $scope.editGroupGrid = true;
  $scope.editGroupButtons = false;
  $scope.groupDetails = false;
  $scope.groupName = $scope.singleGroup.name;
  $scope.contacts = $scope.singleGroup.contacts;

    getGroupFactory.getContact()
    .success(function(result){
      console.log(result);
      $scope.contacts = result.contactInfo;
    });
}

$scope.submitEdit = function(groupName, contacts){

  console.log("testing", Object.keys($scope.selected))
  var group = {
    id: $scope.singleGroup.id,
    name: $scope.groupName,
    contacts: Object.keys($scope.selected)
  }
  console.log("here is the group before the request", group)
  
  getGroupFactory.editGroup($scope.singleGroup.id, group)
    .success(function(){
      console.log("here's the updated group", group)
      $scope.editGroupGrid = false;
      $scope.groupEdited = true;
    })
}


})