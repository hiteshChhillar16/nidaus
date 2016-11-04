(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('contactInfoController', contactInfo);

    function contactInfo($scope, $http, ApiCall) {
        $scope.reviewText = '';

        $scope.reviews = [];

        $scope.rating = 5;

        $scope.rateFunction = function (rating) {
            //alert('Rating selected - ' + rating);
            //console.log('Rating selected: ' + rating);
        };



        var onCommentsComplete = function (data) {
            $scope.reviews = data;
        };

        ApiCall.getComments().then(onCommentsComplete);


        //code to add update comments
        $scope.saveReview = function () {

            if (!$scope.reviewForm.$valid) {
                return;
            }
            else {
                var data = { "UserId": "anonymous", "Text": $scope.reviewText, "Type": "REVIEW" };
                $http.post(webRoot + 'api/Comments/Save',
                    JSON.stringify(data),
                    {
                        header: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(function () {
                    //call get reviews again
                    toastr.success('Review saved successfully.');
                    ApiCall.getComments().then(onCommentsComplete);
                });
                $scope.reviewText = '';
            }
        };

    }
})();

