/**
 * @ngdoc directive
 * @name cmPostDiscussion
 * @module app.widgets
 * @restrict E
 * @description Directive for post new discussion
 * <cm-post-discussion></cm-post-discussion>
 * @param {}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmPostDiscussion', cmPostDiscussion);

  /* @ngInject */
  function cmPostDiscussion($state){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmPostDiscussion.template.html',
      scope:{

      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      scope.cancelPost = function (){

        $state.go($state.$current.name,{
          pageType: 'timeLine',
          expId: 1
        });

      }
    }
  }
}());
