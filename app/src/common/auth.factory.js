/**
 * @ngdoc factory
 * @module app.common
 * @name auth
 * @description Encapsulates Authentication logic and modals
 */

(function(){
  'use strict';

  angular
    .module('app.common')
    .factory('auth', auth);

  /* @ngInject */
  function auth(cmModal, cmDialog){
    var service = {
      login: login,
      sendInvite: sendInvite,
      saveFilter: saveFilter,
      experienceInvitation: experienceInvitation,
      showMessage: showMessage
    };

    return service;

    ////////////////////
    /**
     * @ngdoc method
     * @name login
     * @description Opens a large cmModal instance
     * @returns Returns a promise to the cmModal opened
     */

    function login(){
      var config = {
        templateUrl: 'src/common/modals/loginModal.html',
        controller: 'LoginModal as vm'
      };

      return cmModal.openSm(config).result;
    }

    function saveFilter(filterAttributes){
        var config = {
            templateUrl: 'src/common/modals/saveFilterDialog.html',
            controller: 'SaveFilterDialog as vm'
        };
        return cmDialog.open(config).result;
    }

    function experienceInvitation(id){
        var config = {
            templateUrl: 'src/common/modals/experienceInvitationDialog.html',
            controller: 'experienceInvitation as vm',
            resolve: {
                experienceDetails: function(){
                    return{
                        experienceId: id
                    };
                }
            }
        };
        return cmDialog.open(config).result;
    }

    function sendInvite(id, displayName){
      var config = {
        templateUrl: 'src/common/modals/inviteConnectionDialog.html',
        controller: 'InviteConnectionDialog as vm',
        resolve:{
          connectionDetails: function(){
            return {
             connectionId: id,
             connectionDisplayName: displayName
           };
          }
        }
      };
      return cmDialog.open(config).result;
    }
    function showMessage(message){
      var config = {
        templateUrl: 'src/common/modals/messageModal.html',
        controller: 'messageModal as vm',
        resolve:{
          extraData: function(){
            return {
             message: message
           };
          }
        }
      };
      return cmDialog.open(config).result;
    }
  }
}());
