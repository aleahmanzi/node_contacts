angular.module('myApp').controller('HomeCtrl', 
  function ($scope, getContactsFactory, $routeParams) {

/// - default values
var now = new Date()
var day = '';
var singleBirthday = '';
var start = new Date(now.getFullYear(), 0, 0);
var currentDate = new Date(now)
var currentMonth = currentDate.getMonth()+1
var currentDay = currentDate.getDate()


/// - birtday comparison to current date

	getContactsFactory.getContact()
	  .success(function(result){

	  	$scope.singleContact = result.contactInfo

    	for ( i = 0; i < $scope.singleContact.length; i++){
    		singleContact = result.contactInfo[i];
    		$scope.singleBirthday = singleContact.birthday.date;

    		birthday = new Date($scope.singleBirthday);
    		var birthdayMonth = birthday.getMonth()+1
    		var birthdayDay = birthday.getDate()
    		console.log("day/month", birthdayDay, birthdayMonth)


	    	if( birthdayMonth === currentMonth && birthdayDay >= currentDay){	
	    		console.log("BIRTHDAY COMING!!!!!", singleContact.birthday.date, singleContact.name.firstName)
	    	} else if ( birthdayMonth ===  currentMonth +1 && )
    	}
	  })



})

