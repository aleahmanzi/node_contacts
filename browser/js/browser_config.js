angular.module('myApp') 

 .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/#/', {
        templateUrl: './browser/js/index.html',
        controller: 'NewContactCtrl'
    })
    .when('/contactInfo', {
        templateUrl: './browser/js/contacts/Contacts.html',
        controller: 'Ctrl'
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
 }]); /// - config

