(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('contactInfoController', contactInfo);

    function contactInfo($scope, $http) {
        $scope.reviewText = '';
        $scope.reviews = [
        { text: 'learn angular', username: 'Hitesh Chhillar', avatar: 'profile.jpg' },
        { text: 'build an angular app', username: 'Ved Parkash', avatar: 'ved-parkash.jpg' }, ];

        //code to add update comments
        $scope.saveReview = function () {

            if (!$scope.reviewForm.$valid) {
                return;
            }
            else {
                var avatar = 'unknown.jpg';
                var text = 'Anonymous';
                if ($scope.reviewText.indexOf('aashima') !== -1)
                {
                    avatar = 'aashima.jpg';
                    text = 'Aashima';
                }
                if ($scope.reviewText.indexOf('anita') !== -1) {
                    avatar = 'anita.jpg';
                    text = 'Anita';
                }
                if ($scope.reviewText.indexOf('neha') !== -1) {
                    avatar = 'neha.jpg';
                    text = 'Neha';

                }
                if ($scope.reviewText.indexOf('savita') !== -1) {
                    avatar = 'savita.jpg';
                    text = 'Savita';
                }
                if ($scope.reviewText.indexOf('varun') !== -1) {
                    avatar = 'varun.jpg';
                    text = 'Varun';
                }
                $scope.reviews.push({ text: $scope.reviewText, username: text, avatar: avatar });
                $scope.reviewText = '';
            }
        };

    }
})();

