(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('sideBarContainer', sideBarContainer);

  /* @ngInject */
  function sideBarContainer($timeout){

    var directive = {
      scope: {
        open: '=sidebarOpen',
        closed: '=sidebarClosed'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/sideBarContainer.template.html',
      replace:true,
      transclude:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs, transclude){
      scope.invertState = function(){
        scope.open = !scope.open;
        var time = (scope.open) ? 0 : 350;
        $timeout(function(){
            scope.closed = !scope.closed;
        }, time);
      };
    }
  }
}());
