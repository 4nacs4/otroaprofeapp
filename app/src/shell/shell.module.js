/**
 * @ngdoc module
 * @module app.shell
 * @name app.shell
 * @description Module to contain shell/layout components
 */

(function(){
  'use strict';

  angular
    .module('app.shell', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
    $stateProvider
      .state('shell', {
        abstract: true,
        url:'',
        views: {
          '@': {
            templateUrl:'src/shell/shell.html',
            controller: 'Shell as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'src/shell/topNavBar.html',
            controller: 'TopNavBar as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'src/shell/subNavBar.html',
            controller: 'SubNavBar as vm'
          },
          'marketingBanner@shell':{
            templateUrl: 'src/shell/marketingBanner.html'
          }
        }
      });
  }
}());
