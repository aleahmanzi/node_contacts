angular.module('myApp').controller('getGroupCtrl', 
   function ($scope, getGroupFactory, $routeParams) {

$scope.test = 'Angular is working!'

/// - GET group Ctrl

/// - default values

$scope.groupWrap = false;
$scope.detailsWrap = false;
$scope.addGroupGrid = false;
$scope.groupSuccess = false;
$scope.groupResult = true;
$scope.groupContacts = [];

///- return personal groups

  getGroupFactory.getGroups()
    .success(function(result){
        $scope.groupWrap = true;
      console.log(result);
      $scope.groups = result.groupInfo;
      console.log("groups", $scope.groups)
    })


/// - POST new group NewGroupCtrl

 
$scope.group = {
  name: '',
  contacts: ''
}

/// - show form to add group

$scope.addGroup = function(){
  $scope.groupResult = false;
  $scope.addGroupGrid = true;
  $scope.postMessage = false;
  $scope.detailsWrap = false;

  getGroupFactory.getContact()
    .success(function(result){

      console.log(result);
      $scope.contacts = result.contactInfo;

    });
};

  /// - use data from form to create new group

$scope.createGroup = function(groupName, groupContacts, data) {
  console.log("data", $scope.groupName, $scope.groupContacts);

    for(var i in data){
      if(data[i] === '1'){
        console.log("pushing", data)
        groupContacts.push(data[i].id);
      }
    }

    var group = { 
      name: $scope.groupName, 
      contacts: $scope.groupContacts 
    } 

    getGroupFactory.postGroup(group)
      .then(function(){
        console.log("this is the group", group)  

        $scope.groupSuccess = true;
        $scope.addGroupGrid = false;
        console.log("here is the new group", group);
     });
}

});

