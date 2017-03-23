myApp.directive('loginBar', function(AuthService, Store, $location, $rootScope){  
  return {
    restrict: 'E',
    templateUrl: 'browser/directives/loginBar.html',
    link: function(scope) {
      
      scope.isAuthenticated = false;
      $rootScope.newName;

      if(AuthService.isAuthenticated()){
        scope.isAuthenticated = true;
        scope.user = Store.user;
        $rootScope.userData = scope.user.data.user;
        console.log("userData", $rootScope.userData)
        $location.path("/contactInfo")
      } else {
        AuthService.getLoggedInUser()
          .then(function(res){
            console.log("getting res user from backend", res);
            if(res.data.user) {
              scope.isAuthenticated = true;
              scope.user = res.data.user;
              $location.path("/contactInfo")
            }
          })
      }
    }
  }
});