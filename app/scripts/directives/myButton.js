(function() {
    function myButton($interval, MY_TIMES) {
        return {
            templateUrl: '/templates/myButton.html',
            restrict: 'E',
            replace: true,
            scope: { },
            link: function(scope, element, attributes) {
                //sets first timer to 25m . 
                scope.workTime = MY_TIMES.work;
                // sets default button as Start 
                scope.buttonText = "START";
                // 
                scope.onBreakreak = false; 
                // starts countdown from current work/break time 
                scope.timerText = "Work Timer";
                var timeSet;
                
                                
                var setBreak =  function() {
                    $interval.cancel(timeSet);
                    scope.workTime = MY_TIMES.break; 
                    scope.buttonText = "START";
                    scope.onBreak = true;  
                    scope.timerText = "Break Timer";
                };
                
                var setWork = function() {
                    $interval.cancel(timeSet);
                    scope.workTime = MY_TIMES.work;
                    scope.timerText = "Work Timer";
                    scope.buttonText = "START";   
                    scope.onBreak = false;
                    
                };
                
                scope.countdown = function() {
                   if(scope.workTime <= 0){
                       //if countdown reaches 0  and is on break , set time to 25m (work) 
                           if (scope.onBreak) {
                               setWork();
                               console.log("currently working");
                        // else set timer for 5m  and starts break timer.
                           } else {
                               setBreak();
                               console.log('currently on break');
                           };
                   }else{
                    //countdown 
                    scope.workTime--;
                    }
                };
                
                           
                scope.toggleTimer = function() {
                     if(scope.buttonText == "RESET") {
                         if (scope.onBreak) {
                             setBreak();
                             console.log("restart break Timer")
                                
                         } else {
                             setWork();
                             console.log( "restarted work timer");
                         };

                     } else {
                         timeSet = $interval(scope.countdown,1000);
                         scope.buttonText = "RESET";
                         console.log("start countdown");
                     };
                };
            }
        }  

    };

    angular
        .module('blocTime')
        .directive('myButton',['$interval', 'MY_TIMES', myButton])
        .constant("MY_TIMES", {
            "work": 60 * 25,
            "break": 60 * 5
        });
})();