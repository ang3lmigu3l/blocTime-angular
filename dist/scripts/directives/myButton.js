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
                // var to check if on break/long-break
                scope.onBreak = false; 
                scope.onLongBreak = false;
                // starts countdown from current work/break time 
                scope.timerText = "Work Timer";
                
                scope.isPaused = false; 
                
                scope.pausedText = "PAUSE";
                
                var completedSessions = 0;
                
                var timeSet;
                
                var mySound = new buzz.sound("/assets/sounds/notify.mp3", {
                    preload: true 
                });
                
                var stopTimer = function() {
                    $interval.cancel(timeSet);
                };
                
                var startTimer = function() {
                    timeSet = $interval(scope.countdown,1000) ;
                }
                
                
                                
                var setBreak =  function() {
                    scope.workTime = MY_TIMES.break; 
                    scope.buttonText = "START";
                    scope.onBreak = true;  
                    scope.timerText = "Break Timer";
                };
                
                var setWork = function() {
                    scope.workTime = MY_TIMES.work;
                    scope.timerText = "Work Timer";
                    scope.buttonText = "START";   
                    scope.onBreak = false;
                    
                };
                
                var setLongBreak = function() {
                    scope.workTime = MY_TIMES.long_break; 
                    scope.buttonText = "START";
                    scope.onBreak = false; 
                    scope.onLongBreak = true;
                    scope.timerText = "Long Break Timer";
                    completedSessions = 0;
                };
                
                scope.$watch('workTime', function(value){
                    if (value <= 0 ) {
                        console.log("sound play sound")
                        mySound.play();
                    }     
                });
                
                scope.countdown = function() {
                   if(scope.workTime <= 0){ 
                       stopTimer();
                       scope.timerRunning = false;
                       //if countdown reaches 0  and is on break , set time to 25m (work) 
                       if (scope.onBreak) {
                           console.log("currently working");
                           setWork();
                       } else {
                           completedSessions += 1;
                           console.log(completedSessions);
                           // if 4 work sessions are completed and not on break set time to long break 
                           if (completedSessions === 4) {
                               setLongBreak();
                           } else {
                               setBreak();
                           };

                       };
                   }else{
                    //countdown 
                    scope.workTime--;
                    }
                };
                
                scope.pauseTimer = function(){
                    if (scope.isPaused){ 
                        console.log("Resume Timer")
                        scope.pausedText = "PAUSE";
                        scope.isPaused = false;
                        startTimer();
                        
                    } else {
                        console.log("Pause Timer")
                        scope.isPaused = true;
                        scope.pausedText = "RESUME" ;
                        stopTimer();
                        
                    }
                    
                }
                           
                scope.toggleTimer = function() {
                     if(scope.buttonText == "RESET") {
                         stopTimer();
                         if (scope.onBreak) {
                             setBreak();
                             console.log("restart break Timer") 
                         } else if (scope.onLongBreak){
                             setLongBreak();  
                         } else {
                             setWork();
                             console.log( "restarted work timer");
                         };
                     } else {
                         startTimer();
                         scope.timerRunning = true;
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
            "break": 60 * 5,
            "long_break": 60 * 30
        });
})();