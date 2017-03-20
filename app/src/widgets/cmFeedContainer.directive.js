(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmFeedContainer', cmFeedContainer);

    /* @ngInject */
    function cmFeedContainer(){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'src/widgets/cmFeedContainer.template.html',
            scope:{
                container: '=',
                cardType: '='
            },
            controller: function($scope, $filter){
                if($scope.cardType === 'feeds'){
                    $scope.orderCardsBy = '-createdon';
                }
                else{
                    $scope.orderCardsBy = 'displayname';
                }
                $scope.container.cards = $filter('orderBy')($scope.container.cards, $scope.orderCardsBy,false);
                var vm = this;
                vm.currentSelected = '';
                vm.feedClicked= function(cardNumber, card){
                    if(cardNumber === vm.currentSelected){
                        card.clicked = !card.clicked;
                    }
                    else{
                        card.clicked = true;
                        if(vm.currentSelected !== ''){
                            $scope.container.cards[vm.currentSelected].clicked = false;
                        }
                    }
                    vm.currentSelected = cardNumber;
                };
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){

        }
    }
}());
