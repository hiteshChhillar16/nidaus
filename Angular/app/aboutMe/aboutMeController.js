(function () {
    'use strict';

    angular
        .module('appTube')
        .controller('aboutMeController', aboutMe);

    function aboutMe($scope, $http) {





        $scope.name = 'Hitesh Chhillar';

        $scope.image = 'Content/images/profile.jpg';

        $scope.text1 = 'Sometimes it takes me all day to get nothing done.';

        $scope.text2 = 'Liking your own status is like high fiving yourself in public. Life is scary; at least the salary is funny. I work to buy a car to go to work.';

        $scope.socialInfos = [
                        { url: '', icon:'fa fa-home', classInfo:'email-ic' },
                        { url: 'https://www.facebook.com/hitesh.chhillar', icon: 'fa fa-facebook', classInfo: 'fb-ic' },
                        { url: 'https://www.twitter.com/', icon: 'fa fa-twitter', classInfo: 'tw-ic' },
                        { url: 'https://www.plus.google.com/', icon: 'fa fa-google-plus', classInfo: 'gplus-ic' },
                        { url: 'https://www.linkedin.com/', icon: 'fa fa-linkedin', classInfo: 'li-ic' },
        ];
    }

})();

