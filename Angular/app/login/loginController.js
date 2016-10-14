(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('loginController', login);

    function login($http,$rootScope) {
        //set 
        $rootScope.hideNavigation = true;
        //alert('login Controller')

    }
})();

