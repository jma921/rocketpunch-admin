'use strict';

angular.module('rocketAdminApp')
  .controller('TodosCtrl', function ($scope, $location, Auth, $http, toastr) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.todos = [];
    var toasts = ['Nice work! ', 'Keep it up! ', 'Sweet! ', 'Awesome job! '];

    $http.get('/api/todos').success(function(allTodos) {
      $scope.todos = allTodos;
      console.log($scope.todos);
    });

    $scope.createTodo = function() {
      if($scope.newTodo === '') {
        return;
      }
      $scope.todos.push($scope.newTodo);
      var now = new Date();
      $http.post('/api/todos', {name: $scope.newTodo, createdDate: now})
        .success(function(todo) {
          $scope.todos.pop();
          $scope.newTodo = '';
          $scope.todos.push(todo);
        })

    };

    $scope.removeTodo = function(todo) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
      toastr.error('You deleted ' + todo.name, 'Warning', {
        closeButton: true
      });
      $http.delete('/api/todos/' + todo._id)
        .success(function(data) {
          console.log('Removed: ' + todo.name);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.completedTodo = function(todo) {
      if (!todo.completed) {
          var randomToast = toasts[Math.floor(Math.random() * toasts.length)];
          todo.completed = true;
          toastr.success(randomToast + 'You finished ' + todo.name, 'Completed', {
            closeButton: true
          });
          todo.updatedDate = new Date();
          $http.put('/api/todos/' + todo._id, {completed: true, updatedDate: todo.updatedDate});
      } else {
        todo.completed = false;
        todo.updatedDate = '';
        $http.put('/api/todos/' + todo._id, {completed: false});
      }
    };

  });
