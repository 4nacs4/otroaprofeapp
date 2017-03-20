/**
 * @ngdoc factory
 * @module app.modals
 * @name cmModal
 * @description Defines Modals to be used across the application. All modal modifications
 * are from ui.bootstrap modals.
 * @returns Returns an object with different modal configurations
 */

(function(){
  'use strict';

  angular
    .module('app.modals')
    .factory('cmDialog', cmDialog);

  /* @ngInject */
  function cmDialog(modalConfigs, $modal){
    var service = {
      open: open
    };

    return service;

    function open(config){
      angular.extend(config, modalConfigs.dialog);
      return $modal.open(config);
    }
  }
}());
