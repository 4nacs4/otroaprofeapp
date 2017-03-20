(function(){
    'use strict';

    angular
        .module('app.shell')
        .controller('oneNavShell', oneNavShell);

    /* @ngInject */
    function oneNavShell(navigation, $state){
        var vm = this;
        vm.navStates = [];
        vm.title = '';
        vm.userDp = navigation.getUserDp();
        vm.progressCrossNavClosePrevState = '';
        init();
        /////////////////////
        function init(){
           vm.progressCrossNav =  ($state.$current.oneNavBarType === 'progressCrossNav');
           vm.dropDownCrossNav = ($state.$current.oneNavBarType === 'dropDownCrossNav');
           vm.progressCrossNavClosePrevState =  (typeof($state.$current.oneNavBarClosePrevState) !== undefined)? $state.$current.oneNavBarClosePrevState : '^';
           if(vm.progressCrossNavClosePrevState === ''){
             vm.progressCrossNavClosePrevState = 'shell.connections';
           }
           if(vm.progressCrossNav === true){
               vm.progressCrossNavtitle = $state.$current.oneNavBarTitle;
           }
        }
    }
}());
