/**
 * @ngdoc directive
 * @name cmConnectionTag
 * @module app.widgets
 * @restrict E
 * @description Connection tag directive, example usage
 * <cm-connection-tag connection="vm.connection""></cm-connection-tag>
 * @param {object} connection
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmConnectionTag', cmConnectionTag);

  /* @ngInject */
  function cmConnectionTag(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmConnectionTag.template.html',
      scope:{
        connection: '='
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
