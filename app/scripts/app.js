(function(){
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: 'templates/landing.html'
        });
        
    };
    function myButton($interval) {
        return {
            templateUrl: '/templates/myButton.html',
            restrict: 'E',
            replace: true,
            scope: { },
            link: function(scope, element, attributes) {
                scope.workTime = 1500;
                scope.buttonText = "Start";
                
                var timeSet;
                
                scope.countdown = function() {

                   if(scope.workTime === 0)
                   {
                       $interval.cancel(timeSet);
                       scope.workTime = 1500;
                       scope.buttonText = "Start";
                   }
                   else
                   {
                    scope.workTime--;
                   }
                }
                scope.startTimer = function() {
                     if(scope.buttonText == "Reset") {
                         scope.workTime = 1500;
                         $interval.cancel(timeSet);
                         scope.buttonText = "Start";
                         console.log( "test restarted");

                     } else {
                         timeSet = $interval(scope.countdown,1000);
                         scope.buttonText = "Reset";
                         console.log("test started");
                     }
                }
            }
        }

    };
    
    
    angular
        .module('blocTime', ['ui.router', 'firebase'])
        .config(config)
        .directive('myButton',['$interval', myButton]);

