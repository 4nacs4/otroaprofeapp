/**
  * @ngdoc directive
  * @name cmFieldValid
  * @module app.common
  * @restrict A
  * @require form
  * @description Appends ngMessages text block as a sibling to the input field
  * to add a tick sign at the right most end of the input box to indicate a
  * valid form field e.g.
  * <input type="text" ng-model="username" cm-field-valid/>
  * The tick would only show if the field is dirty.
*/

(function(){

  'use strict';

  angular
    .module('app.common')
    .directive('cmFieldValid', cmFieldValid);

  /* @ngInject */
  function cmFieldValid($compile, values){

    var directive = {
      link: link,
      restrict: 'A',
      require: '^form'
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs, formCtrl){
      var formExpression = formCtrl.$name + '.' + attrs.name;
      var message = values.messagesValid.replace(/\{0\}/g, formExpression);
      var compiled = $compile(message)(scope);
      elem.parent().append(compiled);
    }
  }
}());
