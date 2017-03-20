/**
 * @ngdoc directive
 * @name cmConnection
 * @module app.widgets
 * @restrict E
 * @description Connection widget directive, example usage
 * <cm-connection user="vm.user" connect="vm.connect()"></cm-connection>
 * @param {object} profile
 * @param {expression} connect
 * @param {expression} viewProfile route to view profile
 * @param {number} colSize defines the width of the card from column size
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmConnection', cmConnection);

  /* @ngInject */
  function cmConnection(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmConnection.template.html',
      replace: true,
      scope: {
        profile: '=',
        connect: '&',
        toProfile: '&',
        colSize: '='
      }
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      var watchDestroyers = [];
      scope.colClass = colClass(scope.colSize);

      watchDestroyers.push(scope.$watch('colSize', function(newVal, oldVal){
        if(newVal){
          scope.colClass = colClass(newVal);
        }
      }));

      function colClass(colSize){
        var colSizeOffset = 12 / colSize;
        var colSizeClass = 'col-sm-' + colSizeOffset + ' ' + 'col-xs-' + colSizeOffset;
        if(colSizeOffset === 12){
          colSizeClass = colSizeClass + ' cm-cardRowBlock';
        }
        return colSizeClass;
      }

      //destroy all installed watchers on scope destroy
      var deregisterDestroy = scope.$on('$destroy', function(){
        watchDestroyers.forEach(function(watcher){
          watcher();
        });
        deregisterDestroy();
      });
    }
  }
}());
