/**
 * @ngdoc controller
 * @module app.shell
 * @name SubNavBar
 * @description Controller for the sub navigation bar in the application
 */


(function(){
  'use strict';

  angular
    .module('app.shell')
    .controller('SubNavBar', SubNavBar);

  /* @ngInject */
  function SubNavBar(){
    var vm = this;

    /////////////////////

    function testFunction (){
      console.info('This is a test function');
    }
  }
}());
