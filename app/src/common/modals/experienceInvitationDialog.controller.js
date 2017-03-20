(function(){
    'use strict';

    angular
        .module('app.common')
        .controller('experienceInvitation', experienceInvitation);

    /* @ngInject */
    function experienceInvitation($modalInstance, experienceDetails, myExperience, $state){
        var vm = this;
        init();

        function init(){
            vm.close = close;
            myExperience.getSingleExperience(experienceDetails.experienceId).then(function(res){
                vm.experience =  res.data;
            });
        }

        function close(){
            $modalInstance.dismiss('cancel');
            $state.go('shell.messageBox');
        }

    }
}());