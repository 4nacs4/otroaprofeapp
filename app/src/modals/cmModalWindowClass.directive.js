/**
 * @ngdoc directive
 * @name cmModalWindowClass
 * @module app.modals
 * @restrict A
 * @description Directive to change the modal class on change of a scope variable
 *  <div class="modal-body"
 *  cm-modal-window-class="{'queryClass':'cm-modal', 'cm-modalSmall': vm.size, 'cm-modalLarge': !vm.size}">
 *  ...</div
 * @param {object}  queryClass property contains the class which will be used to query the DOM element
 *                  className: value, class will be removed from the queryClass element if value is falsy
 *                  and added if value is truthy
 */

(function(){

  'use strict';

  angular
    .module('app.modals')
    .directive('cmModalWindowClass', cmModalWindowClass);

  /* @ngInject */
  function cmModalWindowClass(){
    return function link(scope, elem, attrs){
      var queryClass = '.' + scope.$eval(attrs.cmModalWindowClass).queryClass;
      scope.$watch(attrs.cmModalWindowClass, function(newVal, oldVal){
        for(var property in newVal){
          if(newVal.hasOwnProperty(property)){
            if(Boolean(newVal[property] || 0)){
              document.querySelector(queryClass).classList.add(property);
            }
            else{
              document.querySelector(queryClass).classList.remove(property);
            }
          }
        }
      });
    };
  }
}());
