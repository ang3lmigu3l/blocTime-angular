(function(){
    function Tasks($firebaseArray){
        var ref = firebase.database().ref();
        //downloads tasks into a sychronized array
        var tasks = $firebaseArray(ref);

        var createTask = function(task){
            tasks.$add({
                name: task
            });
        }
        
        var removeTask = function(task){
            tasks.$remove(task);
        }
        return {
            all: tasks,
            createTask: createTask,
            removeTask: removeTask 
            

        }
    }
    
    angular
        .module('blocTime')
        .factory('Tasks', ['$firebaseArray', Tasks]);
    
})();



