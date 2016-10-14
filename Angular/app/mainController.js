(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('MainController', main);

    function main($scope, $http, YT_event) {
        var vm = this;
        var results = [];
        
        $scope.showView = 3;

        $scope.showViewFn = function (obj) {
            $scope.showView = obj;
        }

    }
})();