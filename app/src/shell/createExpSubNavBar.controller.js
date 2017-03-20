/**
 * @ngdoc controller
 * @module app.shell
 * @name ExpSubNavBar
 * @description Controller for the Create Experience sub navigation bar in the application
 */

(function () {
  'use strict';

  angular
    .module('app.shell')
    .controller('ExpSubNavBar', createExpSubNavBar);

  /* @ngInject */
  function createExpSubNavBar($rootScope, pgsBarService, $state) {
    var vm = this;
    vm.title = $state.current.navTitle;
    vm.progressCrossNavClosePrevState = '';
      vm.progressCrossNavClosePrevState =  (typeof($state.$current.oneNavBarClosePrevState) !== undefined)? $state.$current.oneNavBarClosePrevState : '^';
    if(vm.progressCrossNavClosePrevState === ''){
      vm.progressCrossNavClosePrevState = 'shell.connections';
    }
    // TODO: Remove $rootScope.$on from below and do this task via value referencing.

    $rootScope.$on('progress-updated', function () {
      vm.pgsStatusPercent = pgsBarService.getStatus() + '%';
      if (vm.pgsStatusPercent !== '100%') {
        vm.pgsStatusText = vm.pgsStatusPercent + ' Complete';
      } else {
        if(vm.title === "Create an Experience"){
          vm.pgsStatusText = 'NEXT';
        }
        else{
          vm.pgsStatusText = 'SAVE';
        }
      }
    });

    vm.pgsStatusPercent = 0;
    vm.pgsStatusText = '0% Complete';
    vm.pgsStatusNext = function(){
        if(vm.pgsStatusText === 'NEXT'){
            $state.go('shell.myExperience.invite');
        }
    };
  }

}());
