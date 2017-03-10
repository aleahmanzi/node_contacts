angular.module('myApp') 

/// - CONFIG

 .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: './browser/js/login/loginBar.html',
        controller: 'LoginCtrl'
    })
    .when('/home', {
        templateUrl: './browser/js/home/home.html',
        controller: 'HomeCtrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/contactInfo', {
        templateUrl: './browser/js/contacts/Contacts.html',
        controller: 'Ctrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/contactInfo/:contactID', {
        templateUrl: './browser/js/single_contact/SingleContact.html',
        controller: 'ContactDetailsCtrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/groupInfo', {
        templateUrl: './browser/js/groups/Groups.html',
        controller: 'getGroupCtrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/groupInfo/:groupID', {
        templateUrl: './browser/js/single_group/SingleGroup.html',
        controller: 'GroupDetailsCtrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/contactUpload', {
        templateUrl: './browser/js/upload/upload.html',
        controller: 'contactUpload',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/addContact', {
        templateUrl: './browser/js/add_contact/add.html',
        controller: 'NewContactCtrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })
 }]); 



