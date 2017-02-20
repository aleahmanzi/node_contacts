angular.module('myApp').controller('ContactDetailsCtrl', 
   function ($scope, getContactsFactory, $routeParams) {


/// - default values

$scope.singleContact = '';
$scope.contactID = $routeParams.contactID;


/// - get contact detail

getContactsFactory.getContactData($scope.contactID)
.success(function(data){
  $scope.singleContact = data.contactInfo
  
  for(var i = 0; i < data.contactInfo.length; i += 1){
    var singleContact = data.contactInfo[i];      
    console.log(singleContact);

    if(singleContact.id === $scope.contactID){
      console.log("here is the single contact", singleContact);
      $scope.singleContact = singleContact;
      return singleContact;
    }
  }
})

$scope.getContact = function() {

 } 


})