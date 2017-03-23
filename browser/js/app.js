var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'ui.bootstrap'])


	angular.module('myApp').controller('CollapseDemoCtrl', function ($scope, $rootScope) {
	  $scope.isNavCollapsed = true;
	  $rootScope.login_msg = true;
	  $rootScope.mini_nav = false
	  $rootScope.addBtn = false;
	  $scope.loginData = $rootScope.userData;

	  $scope.hideMsg = function(){
	  	$rootScope.login_msg = false;
	  	$rootScope.mini_nav = true;
	  	$rootScope.addBtn = true;

	  }



	});
