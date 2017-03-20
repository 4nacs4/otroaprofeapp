(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmDropDown', cmDropDown);

    /* @ngInject */
    function cmDropDown(){

        var directive = {
            link: link,
            restrict: 'E',
            require: '^cmFilter',
            templateUrl: 'src/widgets/cmDropDown.template.html',
            scope:{
                values: '=',
                placeHolder: '=',
                onselect: '&',
                model: '=',
                openUp: '@'
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs, controllerInstance){
                scope.optionSelected = function(val){
                scope.model = val;
                scope.placeHolder = val.name;
                scope.onselect(val);
            };
            scope.onselect = function(val){
              controllerInstance.onSelection(val);
            };
        }
    }
}());
