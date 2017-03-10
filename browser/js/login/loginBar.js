angular.module('myApp').controller('LoginCtrl', 
  function ($scope, getContactsFactory, $routeParams, AuthService, Store) {

  return {
    restrict: 'E',
    templateUrl: 'browser/js/loginBar.html',
    link: function(scope) {
      scope.isAuthenticated = false;

      if(AuthService.isAuthenticated()){
        scope.isAuthenticated = true;

        scope.user = Store.user;
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

  };







});