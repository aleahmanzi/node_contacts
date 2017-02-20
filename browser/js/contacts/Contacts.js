angular.module('myApp').controller('Ctrl', 
   function ($scope, getContactsFactory, $routeParams) {

$scope.test = 'Angular is working!'

/// - default values

$scope.contacts = [];
$scope.contactID = '';
$scope.resultWrap = false;
$scope.detailsWrap = false;
$scope.singleContact = '';



///- return personal contacts

$scope.getContacts = function(){
  console.log("then were here");
  getContactsFactory.getContact()
  .success(function(result){

    $scope.resultWrap = true;
    $scope.postMessage = false;
    console.log(result);
    $scope.contacts = result.contactInfo;
  })
}


/// - get contact details

$scope.getContactDetails = function(contactID) {
  $scope.resultWrap = false; 
  $scope.detailsWrap = true;
  console.log("the contactID is still available", contactID)
  getContactsFactory.getContactData(contactID)
  .success(function(data){
    $scope.singleContact = data.contactInfo

    for(var i = 0; i < data.contactInfo.length; i += 1){
      var singleContact = data.contactInfo[i];      console.log(singleContact);

      if(singleContact.id === contactID){
        console.log("here is the single contact", singleContact);
        $scope.singleContact = singleContact;
        return singleContact;

      }
    }
  })
}
 

});  
