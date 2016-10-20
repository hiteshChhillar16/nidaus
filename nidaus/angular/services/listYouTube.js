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

        return {
            getYoutubeList: getYoutubeList
        };
    };

    var module = angular.module('appTube');

    //register service with angular
    module.factory("listYoutube", listYoutube);

})();