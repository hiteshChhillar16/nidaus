/// <reference path="C:\Users\hchhillar.PBCGOV\Source\Repos\nidaus\nidaus\Content/mdb/mdb-lightbox-ui.html" />
/// <reference path="C:\Users\hchhillar.PBCGOV\Source\Repos\nidaus\nidaus\Content/mdb/mdb-lightbox-ui.html" />
/// <reference path="C:\Users\hchhillar.PBCGOV\Source\Repos\nidaus\nidaus\Content/mdb/mdb-lightbox-ui.html" />
(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('tripController', trip);

    function trip($scope, ApiCall, $http, getMapDirPoints, listYoutube) {

        (function () {
            $('.mdb-select').material_select();
            $('.datepicker').pickadate();
            $('.collapse').collapse();
            // SideNav init
            ////$(".button-collapse").sideNav();

            // Custom scrollbar init
            //var el = document.querySelector('.custom-scrollbar');
            //Ps.initialize(el);

        })();
        $scope.show = 1;

        var inputId_div = $('#stopName');
        $scope.stop_place_id = null;
        $scope.travel_mode = 'DRIVING';
        $scope.stop_input = document.getElementById('stopName');
        $scope.stop_autocomplete = new google.maps.places.Autocomplete($scope.stop_input);
        $scope.destination_place_id = null;
        $scope.tripMap = null;
        $scope.stopName = "";
        $scope.stopLocation = null;
        $scope.stopDate = null;
        $scope.stopDescription = null;
        $scope.stopNames = [];
        $scope.OriginId = null;
        $scope.DestinationId = null;
        $scope.markers = [];
        $scope.totalTime = null;
        $scope.totalDistance = null;
        $scope.showDirections = false;

        var cleanStopName = function () {

            inputId_div.blur();
            setTimeout(function () {
                inputId_div.val('')
                inputId_div.focus();
            }, 10);
        }

        $scope.directionsDisplayTrip;
        $scope.directionsServiceTrip = new google.maps.DirectionsService();

        $scope.directionsDisplayTrip = new google.maps.DirectionsRenderer();

        $scope.distanceMatrixService = new google.maps.DistanceMatrixService();

        $scope.homeLatLong = { lat: 26.823186, lng: -80.152306 };

        var canvas = document.getElementById('tripMap');
        $scope.mapOptions = {
            zoom: 7,
            center: $scope.homeLatLong
        }

        $scope.tripMap = new google.maps.Map(canvas, $scope.mapOptions);

        $scope.directionsDisplayTrip.setMap($scope.tripMap);

        $scope.directionsDisplayTrip.setPanel(document.getElementById('directionsList'));
        ////start stop change
        $scope.stop_autocomplete.addListener('place_changed', function () {
            var stopPlace = $scope.stop_autocomplete.getPlace();
            if (!stopPlace.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            $scope.homeLatLong = stopPlace.geometry.location;
            $scope.marker = new google.maps.Marker({
                position: $scope.homeLatLong,
                map: $scope.tripMap,
                title: stopPlace.name,
                //icon: stopPlace.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 })
            });

            $scope.markers.push($scope.marker)

            //alert(JSON.stringify($scope.markers))

            $scope.tripMap.setCenter($scope.marker.getPosition());
        });//stop change listener function

        //save stop in an array start
        $scope.addStop = function () {
            var stopPlace1 = $scope.stop_autocomplete.getPlace();
            if (!stopPlace1.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            cleanStopName();
            $scope.stopName = stopPlace1.formatted_address;
            $scope.stopId = stopPlace1.place_id;
            $scope.whole = JSON.stringify(stopPlace1)
            var data = { stopName: $scope.stopName, stopId: $scope.stopId, stopLocation: stopPlace1.geometry.location, url: stopPlace1.url, photos: stopPlace1.photos };

            $scope.stopNames.push(data);
            //create route

            $scope.updateRouteData($scope.stopNames);


            //var legs = $scope.directionsServiceTrip.routes[0].legs;
            //alert(JSON.stringify(legs))
            toastr.success('Stop added successfully.');
            cleanStopName();
        };
        //end stop save


        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            clearMarkers();
            $scope.markers = [];
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(map);
            }
        }

        $scope.updateRouteData = function (stopNames) {
            $scope.OriginId = getMapDirPoints.getOriginId(stopNames);
            $scope.DestinationId = getMapDirPoints.getDestinationId(stopNames);

            var WayPoints = getMapDirPoints.getWayPoints(stopNames);

            // gets total time and distance between two stops and the whole trip
            if (stopNames.length > 1) {
                $scope.distanceMatrixService.getDistanceMatrix({
                    origins: [stopNames[0].stopName, ],
                    destinations: [stopNames[stopNames.length - 1].stopName],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.IMPERIAL,//google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function (response, status) {
                    if (status == 'OK' && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                        $scope.totalDistance = (response.rows[0].elements[0].distance.value / 1000).toFixed(2);
                        $scope.totalTime = (response.rows[0].elements[0].duration.value / 60).toFixed(0);
                        $scope.showDirections = true;
                        $scope.$apply();
                    } else {
                        alert("Unable to find the distance via road.");
                    }
                });
            }

            if (!$scope.OriginId || !$scope.DestinationId) {
                return;
            }

            deleteMarkers();

            $scope.directionsServiceTrip.route({
                origin: { 'placeId': $scope.OriginId },
                destination: { 'placeId': $scope.DestinationId },
                waypoints: WayPoints,
                travelMode: 'DRIVING',
                //departure_time: new Date()
            }, function (response, status) {
                if (status === 'OK') {
                    $scope.directionsDisplayTrip.setDirections(response);

                } else {
                    window.alert('Directions request failed due to ' + status);
                }


            });
        };
        //end update Route Data

        //start div drag and drop
        $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.stopNames[index];
            var otherIndex = $scope.stopNames.indexOf(obj);
            $scope.stopNames[index] = obj;
            $scope.stopNames[otherIndex] = otherObj;

            $scope.updateRouteData($scope.stopNames);

            toastr.info('Route changed successfully.');

        }


        $scope.photoUrls = [];
        $scope.showPhotos = function (option, stopInfo) {
            $scope.show = option;

            var stopPlaceInfo = $scope.stop_autocomplete.getPlace();
            angular.forEach(stopInfo.photos, function (value, $index) {
                $scope.photoUrls.push({ url: value.getUrl({ 'maxWidth': 544, 'maxHeight': 300 }) })
            });
        }

        $scope.showWeather = function (option, stopInfoWeather) {
            //$scope.show = option;
            var latpl = stopInfoWeather.stopLocation["lat"](0);
            var lngpl = stopInfoWeather.stopLocation["lng"](0);
            ////alert(latpl+' '+lngpl)

            //listYoutube.getFlickrPhotos(latpl, lngpl).then(function successCallback(data) {
            //    //$scope.weatherInfoShow = data;
            //    $scope.whole1 = data;
            //    alert(JSON.stringify(data))
            //    //toastr.info('View searched results.');
            //});


            listYoutube.getWeatherInfo(latpl, lngpl).then(function successCallback(data) {
                $scope.weatherInfoShow = data;
                //$scope.whole1 = data;
                //alert(JSON.stringify(data))
                //toastr.info('View searched results.');
            });

        }





        $scope.showMap = function (option) {
            $scope.show = option;
            $scope.photoUrls = [];
        }
        

    };/*<--!--//function end-->>>*/
    
})();




