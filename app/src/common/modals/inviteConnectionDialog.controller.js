/**
 * @ngdoc controller
 * @module app.common
 * @name InviteConnectionModal
 * @description Controller for the Invite Connection Modal Instance
 */

(function(){
  'use strict';

  angular
    .module('app.common')
    .controller('InviteConnectionDialog', InviteConnectionDialog);

  /* @ngInject */
  function InviteConnectionDialog($modalInstance, connectionDetails){
    var vm = this;
    vm.connectionId = connectionDetails.connectionId;
    vm.connetiondisplayName = connectionDetails.connectionDisplayName;
    vm.close = close;
    function close(){
        $modalInstance.dismiss('cancel');
    }
  }
}());

