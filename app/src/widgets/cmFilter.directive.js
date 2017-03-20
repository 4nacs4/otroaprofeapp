(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmFilter', cmFilter);

  /* @ngInject */
  function cmFilter($document){

    var directive = {
      scope: {
        heading: '@',
        selected: '=filterSelected',
        all: '=filterAll',
        placeHolder: '@',
        newSelected: '=',
        isLast: '@'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmFilter.template.html',
      replace:true,
      controller: cmFilterController
    };

    return directive;

    function cmFilterController($scope){
        var vm = this;
        vm.onSelection= function(value){
            value.isChecked = true;
            $scope.selected.push(value);
            $scope.isSelecting = false;
            var i = $scope.all.indexOf(value);
            if(i !== -1){
              $scope.all.splice(i, 1);
            }
        };
    }

    /////////////////////

    function link (scope, elem, attrs){
      scope.$watch(function(){
        if((scope.all !== undefined)){
          scope.allValuesEmpty = (scope.all.length <= 0);
        }
        if((scope.selected !== undefined)){
          scope.isSelectedEmpty = (scope.selected.length <= 0);
        }
      });
      scope.$on('SideFilterCleared', function(events, args){
          scope.isSelecting = false;
          scope.all = scope.selected.concat(scope.all);
          scope.selected = [];
      });
      scope.isSelecting = false;
      scope.addClicked = function(){
        scope.isSelecting = true;
      };
    }
  }
}());
