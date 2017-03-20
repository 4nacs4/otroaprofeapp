(function() {
    'use strict';

    angular
            .module('app.shell')
            .controller('messageSubNavBar', messageSubNavBar);

    /* @ngInject */
    function messageSubNavBar(navigation, $state, $scope, $auth) {
        var vm = this;
        vm.navStates = [];
        vm.title = '';

        vm.logout = logout;
        init();
        /////////////////////
        function init() {
            vm.notification = 'noData';
            vm.hidetabs = $state.current.navHideStates || false;
            navigation.getUserSubNavNotification().then(function(res) {
                vm.notification = res.data;
                $state.get()
                        .forEach(function(state) {
                    if (state.nav === 'subNavMessage') {
                        if ((state.name !== 'shell.registerUser') || (state.name === 'shell.registerUser' && !navigation.getUserDp().membership)) {

                            state.isActiveTab = false;
                            state.notification = vm.notification[state.subNavNotificationJsonName];
                            if (navigation.returnCurrentStateName().indexOf(state.name) !== -1) {
                                state.isActiveTab = true;
                                vm.title = state.navTitle;
                            }
                            if (!state.navHideStates) {
                                vm.navStates.push(state);
                            }

                        }

                    }
                });
            });

        }

        function logout() {
            $auth.logout()

        }
    }
}());