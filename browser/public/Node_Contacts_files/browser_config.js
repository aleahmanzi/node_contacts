angular.module('myApp') 

/// - CONFIG

 .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: './browser/js/home/home.html',
        controller: 'HomeCtrl'
    })

    .when('/contactInfo', {
        templateUrl: './browser/js/contacts/Contacts.html',
        controller: 'Ctrl',
        resolve: ['AuthService', function(AuthService){ return AuthService.isAuthenticated(); }]
    })

    .when('/contactInfo/:contactID', {
        templateUrl: './browser/js/single_contact/SingleContact.html',
        controller: 'ContactDetailsCtrl'
    })

    .when('/groupInfo', {
        templateUrl: './browser/js/groups/Groups.html',
        controller: 'getGroupCtrl'
    })

    .when('/groupInfo/:groupID', {
        templateUrl: './browser/js/single_group/SingleGroup.html',
        controller: 'GroupDetailsCtrl'
    })

    .when('/contactUpload', {
        templateUrl: './browser/js/upload/upload.html',
        controller: 'contactUpload'
    })

    .when('/addContact', {
        templateUrl: './browser/js/add_contact/add.html',
        controller: 'NewContactCtrl'
    })
 }]); 



