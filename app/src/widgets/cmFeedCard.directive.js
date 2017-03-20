(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmFeedCard', cmFeedCard);

    /* @ngInject */
    function cmFeedCard($state){

        var directive = {
            link: link,
            restrict: 'E',
            require: '^cmFeedContainer',
            templateUrl: 'src/widgets/cmFeedCard.template.html',
            scope:{
                card: '=',
                type: '=',
                cardNumber: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs, cmFeedContainerCtrl){
            scope.card.clicked = false;
            scope.isClicked = function(){
                cmFeedContainerCtrl.feedClicked(scope.cardNumber,scope.card);
                if(scope.type === 'messages'){

                }
            };
        }
    }
}());
