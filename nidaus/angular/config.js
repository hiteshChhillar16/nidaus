

angular.module('appTube').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: webRoot + '/angular/views/login.html',
            controller: 'loginController'
        })
        .when("/aboutme", {
            templateUrl: webRoot + '/angular/views/aboutMe.html',
            controller:'aboutMeController'
        })
        .when("/playtube", {
            templateUrl: webRoot + '/angular/views/playtube.html',
            controller:'playtubeController'
        })
        .when("/course", {
            templateUrl: webRoot + '/angular/views/course.html',
            controller:'courseController'
        })
        .when("/map", {
            templateUrl: webRoot + '/angular/views/map.html',
            controller: 'mapController'
        })
        .when("/trip", {
            templateUrl: webRoot + '/angular/views/trip.html',
            controller: 'tripController'
        })
        .when("/contactinfo", {
            templateUrl: webRoot + '/angular/views/contactInfo.html',
            controller:'contactInfoController'
        })
        .otherwise({ redirectTo: "/login" });
    //$locationProvider.html5Mode(true);
}]);
