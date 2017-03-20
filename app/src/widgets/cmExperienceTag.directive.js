/**
 * @ngdoc directive
 * @name cmExperienceTag
 * @module app.widgets
 * @restrict E
 * @description Experience tag directive, example usage
 * <cm-experience-tag experience="vm.experience""></cm-experience-tag>
 * @param {object} experience
 */


(function(){
  'use strict';

  angular
    .module('app.widgets')
    .directive('cmExperienceTag', cmExperienceTag);

  /* @ngInject */
  function cmExperienceTag($stateParams,$state){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmExperienceTag.template.html',
      scope:{
        experience: '=',
        cardType: '@',
        editExperience: '&'
      },
      replace: true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      if((scope.experience.description !== undefined)&&(scope.experience.description.length >= 50)){
          scope.experience.description = scope.experience.description.substring(0, 100).concat('...');
      }
      scope.goToExperienceDrawer = function(){
          $state.go('shell.experienceDrawer.participants',{
              pageType: 'timeLine',
              expId: scope.experience.Id
          });
      };
    }

  }
}());

