/**
 * @ngdoc constant
 * @module app.modals
 * @name modalConfigs
 * @description Defines small, medium, large modal configurations as constants
 */

(function(){
  'use strict';

  var modalConfigs = {
    base: {
      windowTemplateUrl: 'src/modals/cmModalWindow.html',
      backdrop: 'static'
    },
    dialog:{
      windowTemplateUrl: 'src/modals/cmDialogWindow.html',
      backdrop: 'static',
      windowClass: 'cm-modalPopUp'
    },
    small: {
      windowClass: 'cm-modal'
    },
    medium: {
      windowClass: 'cm-modal'
    },
    large:{
      windowClass: 'cm-modal cm-modalLarge'
    }
  };

  angular
    .module('app.modals')
    .constant('modalConfigs', modalConfigs);

}());

