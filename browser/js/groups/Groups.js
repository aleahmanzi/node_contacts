angular.module('myApp').controller('getGroupCtrl', 
   function ($scope, getGroupFactory, $routeParams) {

  /// - default values

  $scope.groupWrap = false;
  $scope.detailsWrap = false;
  $scope.addGroupGrid = false;
  $scope.groupSuccess = false;
  $scope.groupResult = true;
  $scope.groupContacts = [];
  $scope.selected = {};
  $scope.contacts;


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

  $scope.createGroup = function(groupName, groupContacts) {

    for (var i = 0; i < $scope.contacts.length - 1; i++) {
        var item = $scope.contacts[i];

        $scope.selected[$scope.contacts.id] = true;
        $scope.idToAdd = Object.keys($scope.selected);
      }
      console.log("testing", Object.keys($scope.selected))

      var group = { 
        name: $scope.groupName, 
        contacts: $scope.idToAdd
      } 
      console.log("group were adding", group)
      getGroupFactory.postGroup(group)
        .then(function(){

          $scope.groupSuccess = true;
          $scope.addGroupGrid = false;
          console.log("here is the new group", group);
       });
  }


});

