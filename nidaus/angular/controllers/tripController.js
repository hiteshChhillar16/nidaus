(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('tripController', trip);

    function trip($scope, ApiCall, $http) {

        (function () {
            $('.mdb-select').material_select();
            $('.datepicker').pickadate();
            $('.collapse').collapse();
            // SideNav init
            $(".button-collapse").sideNav();

            // Custom scrollbar init
            var el = document.querySelector('.custom-scrollbar');
            Ps.initialize(el);
        })();


        $scope.origin_place_id = null;
        $scope.travel_mode = 'DRIVING';
        $scope.origin_input = document.getElementById('stopName');
        $scope.origin_autocomplete = new google.maps.places.Autocomplete($scope.origin_input);

        $scope.homeLatLong = { lat: 41.421766, lng: -87.884623 };

        $scope.directionsDisplay;
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.map;

        $scope.directionsDisplay = new google.maps.DirectionsRenderer();

        $scope.homeLatLong = { lat: 26.823186, lng: -80.152306 };

        var canvas = document.getElementById('map');
        $scope.mapOptions = {
            zoom: 7,
            center: $scope.homeLatLong
        }

        $scope.map = new google.maps.Map(canvas, $scope.mapOptions);



        $scope.marker = new google.maps.Marker({
            position: $scope.homeLatLong,
            map: $scope.map
        });


        $scope.directionsDisplay.setMap($scope.map);
        //$scope.map = new google.maps.Map(canvas, $scope.mapOptions);

        //$scope.marker = new google.maps.Marker({
        //    position: $scope.homeLatLong,
        //    map: $scope.map
        //});
        
        
        //$scope.$apply();




    };/*<--!--//function end-->>>*/

})();




