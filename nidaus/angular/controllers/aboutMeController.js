(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('aboutMeController', aboutMe);

    function aboutMe($scope, ApiCall) {

        var onComplete = function (data) {
            $scope.adminInfo = data;
        }
        ApiCall.getAdminInfo().then(onComplete);
    }

})();

