(function (angular, hsWechatDirectives) {

    /**
     * @ngdoc directive
     * @name hsWechat.directives.directive:MotionDirective
     *
     * @restrict A
     *
     * @description
     * MotionDirective
     * @example
     *  <div motion='scope.callback()'></div>
     */
    MotionDirective.$inject = ['$window'];
    function MotionDirective($window){
        return {
            restrict: 'A',
            replace:false,
            scope : {
                callback : '&motion'
            },
            controller: ['$scope','$element', '$attrs', function ($scope,$element, $attrs) {
                if (!$window.DeviceMotionEvent)   return; //你的设备不支持DeviceMotion事件

                //监听手机摇动事件
                $window.addEventListener('devicemotion', deviceMotionHandler, false);

                var SHAKE_THRESHOLD = 2000;
                var last_update = 0;
                var x, y, z,last_x,last_y,last_z;
                    x = y = z = last_x = last_y = last_z = 0;
                //摇一摇开关，1表示开，0表示关
                var canShake = 1;
                function deviceMotionHandler(eventData){
                    var acceleration = eventData.accelerationIncludingGravity;
                    var curTime = new Date().getTime();

                    //100ms监听一次，拒绝重复监听
                    if ((curTime - last_update) > 100 && canShake==1) {
                        var diffTime = curTime - last_update;
                        last_update = curTime;
                        x = acceleration.x;
                        y = acceleration.y;
                        z = acceleration.z;
                        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                        if (speed > SHAKE_THRESHOLD) {
                            $scope.$eval($scope.callback);
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }
                }

                $scope.$on('$destroy', function(e,getData,isRefresh){
                    $window.removeEventListener('devicemotion',deviceMotionHandler);
                });
            }],
            link: function(scope, element, attrs, ngModel) {
            }
        };
    }

    angular.module('jf.plugins.motion', []).directive('motion', MotionDirective);
})(angular, hsWechatDirectives);