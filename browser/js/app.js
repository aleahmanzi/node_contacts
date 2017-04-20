var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'ui.bootstrap'])


	angular.module('myApp').controller('CollapseDemoCtrl', function ($scope, $rootScope) {
	  $scope.isNavCollapsed = true;
	  $rootScope.mini_nav = true;
	  $rootScope.addBtn = true;
	  $scope.loginData = $rootScope.userData;




	});
