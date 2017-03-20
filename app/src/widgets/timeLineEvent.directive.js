(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('timeLineEvent', timeLineEvent);

    /* @ngInject */
    function timeLineEvent($state){

        var directive = {
            link: link,
            restrict: 'E',
            //require: '^cmFilter',
            templateUrl: 'src/widgets/timeLineEvent.template.html',
            scope:{
                event: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope , elem, attrs){
            scope.goToDiscussion = function(){
                $state.go($state.$current.name,{
                    pageType: 'discussion',
                    expId: scope.event.id
                });
            };

        }
    }
}());

