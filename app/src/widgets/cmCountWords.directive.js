/**
 * @ngdoc directive
 * @name cmCountWords
 * @module app.widgets
 * @restrict E
 * @description Directive for counting words
 * <cm-word-count words="vm.words"></cm-word-count>
 * @param {object}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmWordCount', cmWordCount);

  /* @ngInject */
  function cmWordCount(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmCountWords.template.html',
      scope:{
        words : "="
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.log("this is the link function of the directive");
      scope.countOf = function (text) {
        var maxWords = 100;
        var s = text ? text.split(/\s+/) : ''; // it splits the text on space/tab/enter
        return s ? maxWords-s.length : '100';
      };
    }
  }
}());
