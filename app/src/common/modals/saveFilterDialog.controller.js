/**
 * @ngdoc controller
 * @module app.common
 * @name SaveSearchDialog
 * @description Controller for the SaveSearchDialog Instance
 */

(function(){
    'use strict';

    angular
        .module('app.common')
        .controller('SaveFilterDialog', SaveFilterDialog);

    /* @ngInject */
    function SaveFilterDialog($modalInstance){
        var vm = this;
        vm.close = close;

        function close(){
            $modalInstance.dismiss('cancel');
        }

    }
}());