(function() {
    function LandingCtrl($scope, Tasks){
        $scope.tasks = Tasks.all;
        
      $scope.addTask = function() { 
        Tasks.createTask(
            $scope.task
        );
        $scope.task = "";
      };
        
  }
    angular 
        .module('blocTime')
        .controller('LandingCtrl', ['$scope', 'Tasks', LandingCtrl]);
    
})();



