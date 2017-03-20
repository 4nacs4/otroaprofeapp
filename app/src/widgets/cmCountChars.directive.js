/**
 * @ngdoc directive
 * @name cmCountChars
 * @module app.widgets
 * @restrict E
 * @description Directive for counting remaining Characters
 * <cm-char-count chars="vm.chars"></cm-char-count>
 * @param {object}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmCharCount', cmCharCount);

  /* @ngInject */
  function cmCharCount(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmCountChars.template.html',
      scope:{
        chars : "="
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.log("this is the link function of the directive");
      scope.countCharOf = function (text) {
        var maxChar = 100;
        var sChar = text ? text : '';
        return sChar ? maxChar - sChar.length : '100';
      };
    }
  }
}());
