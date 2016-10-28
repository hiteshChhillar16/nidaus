(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('mapController', map);

    function map($scope, ApiCall, $http) {

        $scope.origin_place_id = null;
        $scope.destination_place_id = null;
        $scope.travel_mode = 'DRIVING';
        $scope.origin_input = document.getElementById('start');
        $scope.destination_input = document.getElementById('end');
        $scope.origin_autocomplete = new google.maps.places.Autocomplete($scope.origin_input);
        $scope.destination_autocomplete = new google.maps.places.Autocomplete($scope.destination_input);
        $scope.selected = 'DRIVING';;
        $scope.stopNames = [];
       
        (function () {
            $('.mdb-select').material_select();
            $('.datepicker').pickadate();
            $('.collapse').collapse();
        })();

        $scope.directionsDisplay;
        $scope.directionsService = new google.maps.DirectionsService();

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

        $scope.directionsDisplay.setPanel(document.getElementById('directionsList'));

   
        $scope.origin_autocomplete.addListener('place_changed', function () {
            var place = $scope.origin_autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, store its place ID and route if we have
            // the other place ID
            $scope.origin_place_id = place.place_id;
            $scope.route($scope.origin_place_id, $scope.destination_place_id, $scope.travel_mode,
                  $scope.directionsService, $scope.directionsDisplay);

        });

        $scope.destination_autocomplete.addListener('place_changed', function () {
            var place = $scope.destination_autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            
            // If the place has a geometry, store its place ID and route if we have
            // the other place ID
            $scope.destination_place_id = place.place_id;
            $scope.route($scope.origin_place_id, $scope.destination_place_id, $scope.travel_mode,
                  $scope.directionsService, $scope.directionsDisplay);
        });

        $scope.route = function (origin_place_id, destination_place_id, travel_mode,
                   directionsService, directionsDisplay) {
            if (!$scope.origin_place_id || !$scope.destination_place_id) {
                //alert($scope.origin_place_id);
                return;
            }
            
            $scope.directionsService.route({
                origin: { 'placeId': $scope.origin_place_id },
                destination: { 'placeId': $scope.destination_place_id },
                //waypoints: $scope.arrStops,
                travelMode: $scope.travel_mode
            }, function (response, status) {
                if (status === 'OK') {
                    $scope.directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }

                
            });
        }

        $scope.setMode = function (mode) {
            $scope.travel_mode = mode;

            if (!$scope.origin_place_id || !$scope.destination_place_id) {
                //alert($scope.origin_place_id);
                return;
            }

            var placeOr = $scope.origin_autocomplete.getPlace();
            if (!placeOr.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            var placeDe = $scope.destination_autocomplete.getPlace();
            if (!placeDe.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            $scope.origin_place_id = placeOr.place_id;
            $scope.destination_place_id = placeDe.place_id;
            $scope.route($scope.origin_place_id, $scope.destination_place_id, $scope.travel_mode,
                            $scope.directionsService, $scope.directionsDisplay)
        };

   }//End controller function

})();




