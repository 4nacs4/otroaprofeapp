(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmTimeLine', cmTimeLine);

    /* @ngInject */
    function cmTimeLine($filter, $timeout){

        var directive = {
            link: link,
            restrict: 'E',
            //require: '^cmFilter',
            templateUrl: 'src/widgets/cmTimeLine.template.html',
            scope:{
                allEvent: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
            scope.allEvent = $filter('orderBy')(scope.allEvent, 'createdon', true);
            scope.timeLineleft = [];
            scope.timeLineRight = [];

            angular.forEach(scope.allEvent, function(event, key){
                if(key%2 === 0){
                    scope.timeLineleft.push(event);
                }else{
                    if(scope.timeLineRight.length === 0){
                        event.applyMargin = true;
                    }
                    scope.timeLineRight.push(event);
                }
            });
        }
    }
}());

