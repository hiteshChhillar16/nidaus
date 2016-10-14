(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('commentController', comment);

    function comment($scope, $http) {
        $scope.commentText = '';
        $scope.comments = [
        { text: 'learn angular', name: 'Hitesh Chhillar', time: 'Jun 12, 2016 05:26:27 AM' },
        { text: 'build an angular app', name: 'Ved Parkash', time: 'Aug 10, 2016 06:18:56 PM' }, ];

        //code to add update comments


        $scope.saveComment = function () {
            if (!$scope.commentForm.$valid) {
                return;
            }
            else {
                $scope.comments.push({ text: $scope.commentText, name: 'Anonymous', time: new Date() });
                $scope.commentText = '';
            }
        };

    }
})();

