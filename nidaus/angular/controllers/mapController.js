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
            $(".sticky").sticky({
                topSpacing: 90
                , zIndex: 2
                , stopper: "#YourStopperId"
            });
        })();

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

        $scope.directionsDisplay.setPanel(document.getElementById('directionsList'));

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
                $scope.infoWindow.setContent('<i class="fa fa-plus fa-2x"></i><strong>what are you doing here</strong>');
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

        $scope.planTrip = function () {
            //set zoom usa to 2 
        };

        //Start trip planner
        $scope.stopName = document.getElementById('stopName');
        $scope.stopName_autocomplete = new google.maps.places.Autocomplete($scope.stopName);
        $scope.stopId = null;
        $scope.stopLocation = null;
        $scope.stopDate = null;
        $scope.stopDescription = null;
        

        //start stop change
        $scope.stopName_autocomplete.addListener('place_changed', function () {
            var stopPlace = $scope.stopName_autocomplete.getPlace();
            if (!stopPlace.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            $scope.showAlert = JSON.stringify(stopPlace);
            
            $scope.stopLocation = stopPlace.geometry.location;
            $scope.stopName = stopPlace.formatted_address;
            $scope.stopId = stopPlace.place_id;


            var canvas = document.getElementById('map');
            $scope.mapOptions = {
                zoom: 7,
                center: $scope.stopLocation
            }
            $scope.map = new google.maps.Map(canvas, $scope.mapOptions);
            $scope.marker = new google.maps.Marker({
                position: $scope.stopLocation,
                map: $scope.map
            });
        });//stop change listener function

        //save stop in an array start
        $scope.saveStop = function () {
            var data = { stopName: $scope.stopName, stopId: $scope.stopId, stopLoction: $scope.stopLocation };
            var waypts = [];
            var origin = null;
            var end = null;

            //alert(data);
                $scope.stopNames.push(data);
                $scope.stopName = '';
                $scope.stopId = null;
                $scope.stopLocation = null;
                //create route
                if ($scope.stopNames.length > 1)
                {

                    angular.forEach($scope.stopNames, function (value, $index) {
                        if ($index == 0) {
                            origin = value.stopId;
                        }
                        else if ($index == $scope.stopNames.length - 1) {
                            end = value.stopId;
                        }
                        else {//if ($index != 0&&$index != $scope.stopNames.length - 1)
                            alert(value.stopName)
                            waypts.push({
                                location: value.stopName,
                                stopover: true
                            });
                        }

                    });
                    alert(origin)
                    alert(end)
                    alert(JSON.stringify(waypts))


                    //var i=0;
                    //for (i = 0; i < $scope.stopNames.length; i++)
                    //{
                    //    alert(i)
                    //    alert($scope.stopNames[i].stopId);
                    //    //if (i = 0) {
                    //    //    origin = $scope.stopNames[i].stopId;
                    //    //}
                    //    //else if (i = $scope.stopNames.length - 1) {
                    //    //    end = $scope.stopNames[i].stopId;
                    //    //}
                    //    //else {
                    //    //    waypts.push({
                    //    //        location: $scope.stopNames[i].stopName,
                    //    //        stopover:true
                    //    //    });
                    //    //}

                        
                    //}
                    //alert(origin)
                    //alert(end)
                    //alert(JSON.stringify(waypts))
                    //$scope.directionsService.route({
                    //    origin: { 'placeId': $scope.origin_place_id },
                    //    destination: { 'placeId': $scope.destination_place_id },
                    //    //waypoints: $scope.arrStops,
                    //    travelMode: $scope.travel_mode
                    //}, function (response, status) {
                    //    if (status === 'OK') {
                    //        $scope.directionsDisplay.setDirections(response);
                    //    } else {
                    //        window.alert('Directions request failed due to ' + status);
                    //    }


                    //});
                }
                //$scope.$apply();
                //alert(JSON.stringify($scope.stopNames))
        };
        //end stop save

    }//End controller function

})();




