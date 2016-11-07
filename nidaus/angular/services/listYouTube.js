(function () {
    'use strict';

    var listYoutube = function ($http) {

        var getYoutubeList = function (searchText) {
            return $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: {
                    key: 'AIzaSyCWHB819EpggLHIxfg-WAoni5YlhyjnbSI',
                    type: 'video',
                    maxResults: 3,
                    part: 'id,snippet',
                    fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
                    q: searchText,
                }
            }).then(function(response) {
                return response.data;
            });
        };

        var getWeatherInfo = function (lat, long) {

            // weather.com api ab02eee7ad907240
            //open weather api 7770373a1df40e0ffae7794fe796fbe0

            var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lat + '&lon=' + long + '&APPID=7770373a1df40e0ffae7794fe796fbe0';
            //alert(urlWeather)
            return $http({
                method: 'GET',
                url: urlWeather
            }).then(function (response) {
                return response.data;
            });
        };

        var getFlickrPhotos = function (lat, long) {

            //9f4a3b6d1c8f72f7api_keye95753e2ee089d23dcbb9aea6f3eb3d9permsread
            var auth = 'http://flickr.com/services/auth/?api_key=e95753e2ee089d23dcbb9aea6f3eb3d9&perms=read&api_sig=[api_sig]';

            var urlFlickr = 'https://api.flickr.com/services/rest/?&method=flickr.photos.geo.photosForLocation&lat=26.7153424&lon=-80.05337459999998&api_key=e95753e2ee089d23dcbb9aea6f3eb3d9&format=json';

            //var urlFlickr = 'http://api.flickr.com/services/rest/?method=flickr.test.echo&name=value=' + 26.7153424 + '&lon=' + -80.05337459999998 + '&Key=e95753e2ee089d23dcbb9aea6f3eb3d9';
            alert(urlFlickr)
            return $http({
                method: 'GET',
                url: urlFlickr
            }).then(function (response) {
                alert(response.data)
                return response.data;
            });
        };

        return {
            getYoutubeList: getYoutubeList,
            getWeatherInfo: getWeatherInfo,
            getFlickrPhotos: getFlickrPhotos
        };
    };

    var module = angular.module('appTube');

    //register service with angular
    module.factory("listYoutube", listYoutube);

})();