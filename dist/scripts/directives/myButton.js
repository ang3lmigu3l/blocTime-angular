//(function() {
//    function myButton($interval) {
//        return {
//            templateUrl: '/templates/myButton.html',
//            restrict: 'E',
//            replace: true,
//            scope: { },
//            link: function(scope, element, attributes) {
//                scope.workTime = 1500;
//                scope.buttonText = "START";
//                scope.startTimer = function {
//                    if (scope.buttonText == "RESET") {
//                        
//                    }
//                }
//            };
//        }
//            
//    }
//
//    angular
//        .module('blocTime')
//        .directive('myButton', ['$interval', myButton]);
//})();