angular.module('myApp').controller('Ctrl', 
   function ($scope, getContactsFactory, $routeParams, $rootScope) {

/// - default values

$scope.contactGrid = false;
$scope.resultWrap = false;
$scope.detailsWrap = false;
$scope.postMessage = false;
$rootScope.login_msg = false;
$rootScope.mini_nav = true;
$rootScope.addBtn = true;
$scope.contacts = [];
$scope.contactID = [];
$scope.contactID = ''
$scope.singleContact = '';


///- return personal contacts

getContactsFactory.getContact()
  .success(function(result){

    $scope.resultWrap = true;
    $scope.postMessage = false;
    $scope.contactButton = true;
    console.log(result);
    $scope.contacts = result.contactInfo;

  });

});


