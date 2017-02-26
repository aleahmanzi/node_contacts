angular.module('myApp').controller('contactUpload', 
   function ($scope, $routeParams) {

// - default values
$scope.file = '';


$scope.handleFile = function(e){

  var fileReader = new FileReader();

  fileReader.onload = function(file){

    console.log("onload event triggered, context is \n", file);
    $scope.file = file.currentTarget.result;

  };
  
  console.log("event: ", e);

  console.log("Get Text", fileReader.readAsText(e[1]))

}

});