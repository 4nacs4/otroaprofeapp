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
		.factory('cmModal', cmModal);

  /* @ngInject */
  function cmModal(modalConfigs, $modal){
    var service = {
      openSm: openSm,
      openMed: openMed,
      openLg: openLg
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name openSm
     * @description Opens are modal with 'small' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openSm(config){
      return open('small', config);
    }

    /**
     * @ngdoc method
     * @name openMed
     * @description Opens are modal with 'medium' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openMed(config){
      return open('medium', config);
    }

    /**
     * @ngdoc method
     * @name openLg
     * @description Opens are modal with 'large' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openLg(config){
      return open('large', config);
    }

    /**
     * @ngdoc method
     * @name open
     * @description Opens a ui bootstrap modal according to the configurations and size
     * @param {string} size size in either small, medium or large
     * @param {object} config Configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function open(size, config){
      angular.extend(config, modalConfigs.base, modalConfigs[size]);
      return $modal.open(config);
    }
	}
}());

