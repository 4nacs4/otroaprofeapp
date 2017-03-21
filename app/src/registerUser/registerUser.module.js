(function () {
  'use strict';

  angular
    .module('app.registerUser', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
      .state('shell.registerUser', {
        url: '/registerUser',
        title: 'Afiliacion',
        nav: 'subNavMessage',
        navTitle: 'Register an User',
        navOrder: 1,
        resolve: {
           allFilters: function(cmFilters){
               return cmFilters.returnFilterCriteria();
           }
        },
        views: {
          'content@shell': {
            templateUrl: 'src/registerUser/registerUser.html',
            controller: 'registerUser as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'src/shell/messageSubNavBar.html',
            controller: 'messageSubNavBar as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'src/shell/topNavBar.html',
            controller: 'TopNavBar as vm'
          }
        }
      })
  }
}());
