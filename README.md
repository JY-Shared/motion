# angular-motion

#How do I add this to my project?

You can download angular-motion by:

*bower.json  arrtibute devDependencies add motion:https://github.com/JY-Shared/motion.git
* (prefered) Using bower and running `bower install angular-md5 --save`

````html
<div motion="callback()"></div>
<script>
  angular.module('YOUR_APP', ['jf.plugins.motion','controllers']);
  angular.module('controllers', [])
    .controller('MainCtrl', ['$scope', 'md5', function($scope, md5) {

        $scope.callback = 'motion';

    }]);
</script>

````
