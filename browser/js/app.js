var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'ui.bootstrap'])


	angular.module('myApp').controller('CollapseDemoCtrl', function ($scope, $rootScope) {
	  $scope.isNavCollapsed = true;
	  $rootScope.login_msg = true;

	  $scope.hideMsg = function(){
	  	$rootScope.login_msg = false;
	  }


	});
