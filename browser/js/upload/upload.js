angular.module('myApp').controller('UploadCtrl', 
   function ($scope, postContactFactory, $routeParams) {

// - default values
$scope.file = '';
$scope.CSVToArray;
$scope.fileSuccess = false;
var addressOutput;
var contactOutput;
var output;
var data;


$scope.handleFile = function(e){

  var fileReader = new FileReader();

  fileReader.onload = function(file){

    console.log("onload event triggered, context is \n", file);
    $scope.file = file.currentTarget.result;
  };

  console.log("event: ", e);
  console.log("Get Text", fileReader.readAsText(e[0]))
 
}


$scope.csvJson = function(file) {
	var file = $scope.file.split(/\n/);
	var mainFile = file[1].split(/\r/);
	var jsonObj = [];
	var headers = file[0].split(',');
	$scope.fileSuccess = true;

	for(var i = 0; i < mainFile.length; i++) {
	  var data = mainFile[i].split(',');
	  var obj = {};
	  $scope.jsonData = JSON.stringify(obj);

	  var inputObj = JSON.parse($scope.jsonData);
		var contactOutput = {
	  'name': {
	      'firstName': data[0],
	      'lastName': data[1],
	    },
	   'birthday': {
	   		'date': data[2],
	   },
	   'phoneNumber':{
	   		'mobile': data[3],
	   		'work': data[4]
	   },
	   'email':{
	   		'personal': data[5],
	   		'work' : data[6]
	   },
	   'company': data[7]
	 }

	 var addressOutput = {
	    'street1': data[8],
	    'street2': data[9],
	    'city': data[10],
	    'state': data[11],
	    'zip': data[12],
	    'country': data[13]
	  }
	  var jsonContact = JSON.stringify(contactOutput);
	  var jsonAddress = JSON.stringify(addressOutput);
		console.log("single json request", contactOutput, addressOutput)

/// - POST Request from csv file

  postContactFactory.postAddress(jsonAddress)
    .success(function(result) {
      console.log("resultID", result.id)
    }); 
    postContactFactory.postContact(jsonContact)
      .then(function(){
      	console.log("DONE!")
    }); 



	}	
}


});


