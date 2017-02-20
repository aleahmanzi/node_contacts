angular.module('myApp') 

 .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/contactInfo', {
        templateUrl: './browser/js/contacts/Contacts.html',
        controller: 'Ctrl'
    })
    .when('/groupInfo', {
        templateUrl: './browser/js/groups/Groups.html',
        controller: 'getGroupCtrl'
    })
 }]); /// - config