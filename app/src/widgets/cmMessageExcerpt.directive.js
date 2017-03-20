/**
 * @ngdoc directive
 * @name cmMessageExcerpt
 * @module app.widgets
 * @restrict E
 * @description Message Excerpt directive, example usage
 * <cm-message-excerpt message="vm.message""></cm-message-excerpt>
 * @param {object} message
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmMessageExcerpt', cmMessageExcerpt);

  /* @ngInject */
  function cmMessageExcerpt(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmMessageExcerpt.template.html',
      scope:{
        message: '=' ,
        eventHandler: '&ngClick'
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
