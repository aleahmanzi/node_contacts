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
$scope.currentBirthday = [];



/// - birtday comparison to current date

	getContactsFactory.getContact()
	  .success(function(result){

	  	$scope.singleContact = result.contactInfo

    	for ( i = 0; i < $scope.singleContact.length; i++){
    		singleContact = result.contactInfo[i];
    		console.log("result", result.contactInfo[i])
    		$scope.singleBirthday = singleContact.birthday.date;

    		birthday = new Date($scope.singleBirthday);
    		var birthdayMonth = birthday.getMonth()+1
    		var birthdayDay = birthday.getDate()
    		console.log("day/month", birthdayDay, birthdayMonth)


	    	if( birthdayMonth === currentMonth && birthdayDay >= currentDay){	

	    		console.log("BIRTHDAY COMING!!!!!", singleContact.birthday.date, singleContact.id)
					$scope.currentBirthday.push(singleContact)
					console.log("birthday array", $scope.currentBirthday);

	    	} 
	    	else if ( birthdayMonth ===  currentMonth +1 && (currentDay - birthdayDay > 15)) {
	    		console.log("MORE BIRTHDAYYYYYYSSSS!!!!", singleContact.birthday.date, singleContact.id)
					$scope.currentBirthday.push(singleContact)
				}
    	}
	  })



})

