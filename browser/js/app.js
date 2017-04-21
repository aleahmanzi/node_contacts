var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'ui.bootstrap'])


	angular.module('myApp').controller('CollapseDemoCtrl', function ($scope, $rootScope) {
	  $scope.isNavCollapsed = true;
	  $scope.landing_page = true;
	  $rootScope.mini_nav = true;
	  $rootScope.landing_page = $scope.landing_page;
	  $rootScope.addBtn = true;
	  $scope.loginData = $rootScope.userData;




	});
