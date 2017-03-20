(function() {
    'use strict';

    angular
            .module('app.common')
            .controller('messageModal', messageModal);

    /* @ngInject */
    function messageModal($modalInstance, $state, $stateParams, cmDialog, $window, extraData) {
        var vm = this;
         vm.close = close;
        init();

        function init() {
           
            vm.message = extraData.message;
        }
        
        function close(){
            $modalInstance.close();
        }
           
        

    }
}());