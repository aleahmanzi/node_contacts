myApp.directive('loginBar', function(AuthService, Store){  
  return {
    restrict: 'E',
    templateUrl: 'browser/directives/loginBar.html',
    link: function(scope) {
      
      scope.isAuthenticated = false;

      if(AuthService.isAuthenticated()){
        scope.isAuthenticated = true;
        scope.user = Store.user;
        scope.userData = scope.user.data.user;
        console.log("user", scope.userData)
      } else {
        AuthService.getLoggedInUser()
          .then(function(res){
            console.log("getting res user from backend", res);
            if(res.data.user) {
              scope.isAuthenticated = true;
              scope.user = res.data.user;
            }
          })
      }
    }
  }
});