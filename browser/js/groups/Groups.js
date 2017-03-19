angular.module('myApp').controller('getGroupCtrl', 
   function ($scope, getGroupFactory, $routeParams, $route) {

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
        $scope.groups = result.groupInfo;
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

  $scope.createGroup = function(groupName) {

      console.log("testing", Object.keys($scope.selected))

      var group = { 
        name: $scope.groupName, 
        contacts: Object.keys($scope.selected)
      } 
      console.log("group were adding", group)
      getGroupFactory.postGroup(group)
        .then(function(){

          $scope.groupSuccess = true;
          $scope.addGroupGrid = false;
          console.log("here is the new group", group);
       });

      $route.reload();
    }


});

