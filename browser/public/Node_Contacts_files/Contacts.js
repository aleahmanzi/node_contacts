angular.module('myApp').controller('Ctrl', 
   function ($scope, getContactsFactory, $routeParams) {



/// - default values

$scope.contactGrid = false;
$scope.resultWrap = false;
$scope.detailsWrap = false;
$scope.postMessage = false;


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


