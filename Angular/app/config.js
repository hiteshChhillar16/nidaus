

angular.module('appTube').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'app/login/login.html',
            controller: 'loginController'
        })
        .when("/aboutme", {
            templateUrl: 'app/aboutMe/aboutMe.html',
            controller:'aboutMeController'
        })
        .when("/playtube", {
            templateUrl: 'app/playtube/playtube.html',
            controller:'playtubeController'
        })
        .when("/course", {
            templateUrl: 'app/course/course.html',
            controller:'courseController'
        })
        .when("/contactinfo", {
            templateUrl: 'app/contactInfo/contactInfo.html',
            controller:'contactInfoController'
        })
        .otherwise({ redirectTo: "/playtube" });
    //$locationProvider.html5Mode(true);
}]);
