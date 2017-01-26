(function() {
    function LandingCtrl($scope, Tasks){
        $scope.tasks = Tasks.all;
        
      $scope.addTask = function() { 
        Tasks.createTask(
            $scope.task
        );
        $scope.task = "";
      };
        
    $scope.deleteTask = function(task){
        Tasks.removeTask(task);
    }
        
  }
    angular 
        .module('blocTime')
        .controller('LandingCtrl', ['$scope', 'Tasks', LandingCtrl]);
    
})();



