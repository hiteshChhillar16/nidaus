(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('courseController', course);

    function course($scope, $http, uiGridConstants) {

        $scope.showDiv = 'true';

        $scope.data = {
            model: null,
            availableOptions: [
              { id: '1', name: 'Option A' },
              { id: '2', name: 'Option B' },
              { id: '3', name: 'Option C' }
            ]
        };

        $scope.myData = [
            {
                CourseName: "Advantage Crystal Reports",
                TrainProvider: "Information Systems Services",
                ActiveInd: "Y",
            },
            {
                CourseName: "Child Plus",
                TrainProvider: "Information Systems Services",
                ActiveInd: "N",
            },
            {
                CourseName: "Coextension Online Class Registration",
                TrainProvider: "Information Systems Services",
                ActiveInd: "Y",
            }
        ];

        //code to add update comments
        $scope.saveCourse = function () {
            $scope.courses.push({ CourseName: $scope.courseTitle, TrainProvider: 'Anonymous', ActiveInd:'Y' });
            $scope.courseTitle = '';
        };

    }
})();
