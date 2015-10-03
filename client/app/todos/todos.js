'use strict';

angular.module('rocketAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todos', {
        url: '/todos',
        templateUrl: 'app/todos/todos.html',
        controller: 'TodosCtrl'
      });
  });