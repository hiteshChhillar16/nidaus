(function () {
    'use strict';

    // Post Add Trip
    var ApiCall = function ($http) {

        var getComments = function () {
            return $http.get(webRoot + "api/Comments/GetComments")
                        .then(function (response) {
                            return response.data;
                        });
        };

        var getAdminInfo = function () {
            return $http.get(webRoot + "api/Comments/GetAdminInfo")
                        .then(function (response) {
                            return response.data;
                        });
        };


        return {
            getComments: getComments,
            getAdminInfo: getAdminInfo
        };

    };


    var module = angular.module('appTube');

    //register service with angular
    module.factory("ApiCall", ApiCall);

})();