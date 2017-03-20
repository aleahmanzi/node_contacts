angular.module('myApp').controller('GroupDetailsCtrl', 
   function ($scope, getGroupFactory, $routeParams, $window) {


/// - default values

$scope.singleGroup;
$scope.groupID = $routeParams.groupID;
$scope.groupDeleted = false;
$scope.groupEdited = false;
$scope.editGroupGrid = false;
$scope.editGroupButtons = true;
$scope.groupDetails = true;
$scope.selected = {};
$scope.contacts;
$scope.groupContacts = [];
$scope.selection = [];




/// - get single group

getGroupFactory.getGroupData($scope.groupID)
.success(function(data){
  $scope.singleGroup = data.groupInfo

  for(var i = 0; i < data.groupInfo.length; i += 1){
    $scope.singleGroup = data.groupInfo[i];      

    if($scope.singleGroup.id === $scope.groupID){
      console.log("here is the single group", $scope.singleGroup);
    }
  }
      
    getGroupFactory.getContact()
    .success(function(result){
      var contactList = result.contactInfo

      for(var a=0; a < $scope.singleGroup.contacts.length; a++){
      var groupContact = $scope.singleGroup.contacts[a]

        for(var b=0; b < contactList.length; b++){
          
          if(groupContact === contactList[b].id){
            $scope.groupContacts.push(contactList[b]);
          }
        }
      }
    });
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
};



/// - edit group

$scope.updateGroup = function(){
  $scope.editGroupGrid = true;
  $scope.editGroupButtons = false;
  $scope.groupDetails = false;
  $scope.groupName = $scope.singleGroup.name;
  $scope.contacts = $scope.singleGroup.contacts;


    getGroupFactory.getContact()
    .success(function(result){
      $scope.contacts = result.contactInfo;

      $scope.checkedItem = function(id) {

        var checked = false;
        for(i=0; i < $scope.contacts.length; i++){
          if(id = $scope.groupContacts[i]){
            checked = true;
          }
        }
        return checked;
      }

    })      
};


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