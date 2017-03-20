/**
 * @ngdoc controller
 * @module app.message
 * @name mailItem
 * @description Controller for the mail Instance
 */
(function (){

  'use strict';

  angular
    .module('app.messages')
    .controller('mailItem', mailItem);

  /* @ngInject */

  function mailItem(messages, auth){
    var vm = this;
    init();
    vm.activeIndex = 0;

    /////////////////

    function init (){
      messages.findMessages().then(function(res){
        vm.messages = res.data;
        vm.activeMessage = vm.messages[vm.activeIndex];
        vm.messages[vm.activeIndex].isActive = true;
      });
    }

    vm.navNextMsg = function (){
      var activeIndex = findActiveIndex(vm.messages);
      if(activeIndex < vm.messages.length - 1){
        vm.activeIndex ++;
        vm.messages[activeIndex + 1].isActive = true;
        vm.activeMessage = vm.messages[vm.activeIndex];
      }
    };
    vm.getActiveMsg = function(){
      return vm.activeMessage;
    };

    vm.experienceInvite = function(id){
        console.log("running");
        auth.experienceInvitation(id);
    };

    vm.navPrevMsg = function (){
      //find the active message index
      //set it as inactive
      //set previous one as active
      var activeIndex = vm.activeIndex = findActiveIndex(vm.messages);
      if(activeIndex > 0){
        vm.activeIndex --;
        vm.messages[activeIndex - 1].isActive = true;
        vm.activeMessage = vm.messages[vm.activeIndex];
      }
    };

    function findActiveIndex(messages){
      var activeIndex = -1;
      _.forEach(vm.messages, function(message, idx, list){
        if(message.isActive){
          activeIndex = idx;
          message.isActive = false;
          return false;
        }
      });
      return activeIndex;
    }
  }
})();
