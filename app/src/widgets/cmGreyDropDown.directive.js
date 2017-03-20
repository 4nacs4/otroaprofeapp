(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmGrayDropDown', cmGrayDropDown);

    /* @ngInject */
    function cmGrayDropDown(){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'src/widgets/cmGreyDropDown.template.html',
            scope:{
                values: '=',
                placeHolder: '@',
                model: '=',
                onselect: '&',
                orderById: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
            scope.orderByAttr = (scope.orderById) ? 'id' : 'name';
            scope.optionSelected = function(value){
                scope.placeHolder = value.name;
                scope.model = value;
                scope.onselect({val: value});
            };
        }
    }
}());
