/**
 * @ngdoc directive
 * @name cmExpInvites
 * @module app.widgets
 * @restrict E
 * @description Experience invites that shows up on edit experience page, example usage
 * <cm-exp-invites invite="vm.invite""></cm-exp-invites>
 * @param {object} invite
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmExpInvites', cmExpInvitesTag);

  /* @ngInject */
  function cmExpInvitesTag(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmExperienceInvitationTag.template.html',
      scope:{
        invite: '='
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }
}());
