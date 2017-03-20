/**
 * @ngdoc module
 * @module app.connections
 * @name app.connections
 * @description Module for connections feature
 */

(function(){
  'use strict';

  angular
    .module('app.connections', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider, backdrop){

    //add your state mappings here
    $stateProvider
      .state('shell.connections', {
        url:'/connections',
        title: 'Connections',
        nav: 'top',
        backdrop: backdrop.clearWhite,
        isPublic: true,
        views: {
          'content@shell':{
            templateUrl:'src/connections/home.html',
            controller: 'Home as vm'
          },
        }
      })
      .state('shell.connections.profile', {
      url:'/profile/:id',
      title: 'Profile',
      backdrop: backdrop.clearWhite,
      views: {
        'content@shell':{
          templateUrl:'src/connections/profile.html',
          controller:'Profile as vm'
        },
        'subNavBar@shell':{
          templateUrl: 'src/shell/backSubNavBar.html'
        }
      }
    });
  }
}());
