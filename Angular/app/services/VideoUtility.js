
angular.module('appTube').directive('youtube', function ($window, YT_event) {
    return {
        restrict: "E",

        scope: {
            height: "@",
            width: "@",
            videoid: "@",
            addVideo:"@",
        },

        template: '<div></div>',

        link: function (scope, element) {
            var player;
            if (typeof (YT) == 'undefined' || typeof (YT.Player) == 'undefined') {


                var tag = document.createElement('script');
                //alert(tag)
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                //alert('after insert')
                //setTimeout(function () { }, 10000);
                

                $window.onYouTubeIframeAPIReady = function () {
                    //setTimeout(function () { }, 10000);
                    //alert('on ready')
                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 0,
                            html5: 1,
                            theme: "light",
                            modesbranding: 0,
                            color: "white",
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 1
                        },

                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid,

                        events: {
                            'onStateChange': function (event) {

                                var message = {
                                    event: YT_event.STATUS_CHANGE,
                                    data: ""
                                };

                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = "PLAYING";
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = "ENDED";

                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = "NOT PLAYING";
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = "PAUSED";
                                        break;
                                }

                                scope.$apply(function () {
                                    scope.$emit(message.event, message.data);
                                });
                            }
                        }


                    });
                };
            }
            else {

                //alert('undefined not treu YT')
                player = new YT.Player(element.children()[0], {
                    height: '300',
                    width: '600',
                    videoId: scope.videoid,
                    playerVars: { controls: 1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 },
                    events: {
                        'onStateChange': function (event) {

                            var message = {
                                event: YT_event.STATUS_CHANGE,
                                data: ""
                            };

                            switch (event.data) {
                                case YT.PlayerState.PLAYING:
                                    message.data = "PLAYING";
                                    break;
                                case YT.PlayerState.ENDED:
                                    message.data = "ENDED";

                                    break;
                                case YT.PlayerState.UNSTARTED:
                                    message.data = "NOT PLAYING";
                                    break;
                                case YT.PlayerState.PAUSED:
                                    message.data = "PAUSED";
                                    break;
                            }

                            scope.$apply(function () {
                                scope.$emit(message.event, message.data);
                            });
                        }
                    }
                });
            }

            scope.$watch('videoid', function (newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }
                player.cueVideoById(scope.videoid);
            });

            scope.$watch('height + width', function (newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }

                player.setSize(scope.width, scope.height);

            });

            scope.$on(YT_event.STOP, function () {
                player.seekTo(0);
                player.stopVideo();
            });

            scope.$on(YT_event.PLAY, function () {
                player.playVideo();
            });

            scope.$on(YT_event.PAUSE, function () {
                player.pauseVideo();
            });

            //scope.$on(playList1, function () {

            //});

        }
    };
});


