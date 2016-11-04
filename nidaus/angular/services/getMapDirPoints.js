(function () {
    'use strict';

    var getMapDirPoints = function ($http) {

        var origin = function (arrayStops) {
            if (arrayStops.length != 0)
                return arrayStops[0].stopId;
        };

        var destination = function (arrayStops) {
            if (arrayStops.length > 1)
                return arrayStops[arrayStops.length - 1].stopId;
        };

        var waypts = function (arrayStops) {
            var points = [];

            angular.forEach(arrayStops, function (value, $index) {

                if ($index != 0 && $index != arrayStops.length - 1)
                    points.push({
                        location: value.stopName,
                        stopover: true
                    });
            });

            return points;
        };

      

        return {
            getOriginId: origin,
            getDestinationId: destination,
            getWayPoints: waypts
        };
    };

    var module = angular.module('appTube');

    //register service with angular
    module.factory("getMapDirPoints", getMapDirPoints);

})();