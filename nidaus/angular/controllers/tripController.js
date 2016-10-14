(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('tripController', trip);

    function trip($scope, ApiCall, $http) {

        $scope.textJson = "";

        $scope.arrStops = [
                            { location: 'palm beach gardens, FL', stopover: true },
                            { location: 'Oklahoma City, OK', stopover: true }
        ];

        $scope.origin_place_id = null;
        $scope.destination_place_id = null;
        $scope.travel_mode = 'DRIVING';
        $scope.origin_input = document.getElementById('start');
        $scope.destination_input = document.getElementById('end');
        $scope.origin_autocomplete = new google.maps.places.Autocomplete($scope.origin_input);
        $scope.destination_autocomplete = new google.maps.places.Autocomplete($scope.destination_input);

       
        (function () {
            $('.mdb-select').material_select();

        })();

        $scope.directionsDisplay;
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.map;

        $scope.directionsDisplay = new google.maps.DirectionsRenderer();



        var homeLatLong = { lat: 26.823186, lng: -80.152306 };

        var canvas = document.getElementById('map');
        $scope.mapOptions = {
            zoom: 7,
            center: homeLatLong
        }

        $scope.map = new google.maps.Map(canvas, $scope.mapOptions);

        

        $scope.marker = new google.maps.Marker({
            position: homeLatLong,
            map: $scope.map
        });


        $scope.directionsDisplay.setMap($scope.map);

        $scope.directionsDisplay.setPanel(document.getElementById('right-panel'));

        $scope.infoWindow = new google.maps.InfoWindow({
            map: $scope.map
        });


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                $scope.infoWindow.setPosition(pos);
                $scope.infoWindow.setContent('what are you doing here');
                $scope.map.setCenter(pos);
            }, function() {
                handleLocationError(true, $scope.infoWindow, $scope.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, $scope.infoWindow, $scope.map.getCenter());
        }
    
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



        //Save trip 
        $scope.saveTrip = function () {
            if (!$scope.origin_place_id || !$scope.destination_place_id) {
                return;
            }
            alert($scope.destination_input)
            var data = { "Origin": $scope.origin_place_id, "Destination": $scope.destination_place_id, "Name": "Forth Trip" };
            $http.post(webRoot + 'api/Trip/Save',
                JSON.stringify(data),
                {
                    header: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function () {
                toastr["info"]("Trip created successfully!")
                //call get reviews again
                //ApiCall.getComments().then(onCommentsComplete);
            });
            //$scope.reviewText = '';
        }

    }

})();




