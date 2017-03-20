(function() {
    'use strict';

    angular
            .module('app.myProfile', [])
            .config(configuration);

    /* @ngInject */
    function configuration($stateProvider) {

        //mappings
        $stateProvider
                .state('shell.myProfile', {
            url: '/myProfile',
            abstract: true,
            resolve: {
                myProfile: 'myProfile',
                profileInfo: function(myProfile) {
                    return myProfile.getProfile().then(function(res) {
                        return res.data;
                    });
                }
            }
        })
                .state('shell.myProfile.view.edit', {
            url: '/edit',
            title: 'Edit Profile',
            resolve: {
                allFilters: function(cmFilters) {
                    return cmFilters.returnFilterCriteria();
                }
            },
            views: {
                'content@shell': {
                    templateUrl: 'src/registerUser/registerUser.html',
                    controller: 'registerUser as vm'
                },
                'subNavBar@shell': {
                    templateUrl: 'src/shell/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'topNavBar@shell': {
                    templateUrl: 'src/shell/TopNavBar.html',
                    controller: 'TopNavBar as vm'
                }
            }
        })
                .state('shell.myProfile.view', {
            url: '/view',
            title: 'Perfil',
            nav: 'subNavMessage',
            navTitle: 'Mi Perfil',
            navOrder: 4,
            subNavNotificationJsonName: 'profile',
            views: {
                'content@shell': {
                    templateUrl: 'src/myProfile/myProfile.html',
                    controller: 'myProfile as vm'
                },
                'subNavBar@shell': {
                    templateUrl: 'src/shell/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'topNavBar@shell': {
                    templateUrl: 'src/shell/TopNavBar.html',
                    controller: 'TopNavBar as vm'
                }
            }
        }).state('shell.parentDashboard', {
            url: '/parentDashboard',
            nav: 'subNavMessage',
            navTitle: 'Parent Dashboard',
            navHideStates: true,
            views: {
                'topNavBar@shell': {
                    templateUrl: 'src/shell/messageTopNavBar.html'
                },
                'subNavBar@shell': {
                    templateUrl: 'src/shell/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'content@shell': {
                    templateUrl: 'src/myProfile/parentDashboard.html',
                    controller: 'ParentDashboard as vm'
                }
            },
            resolve: {
                myProfile: 'myProfile',
                dashboardData: function(myProfile) {
                    return myProfile.getParentDashboard().then(function(res) {
                        return res.data;
                    });
                }
            }

        });
    }
}());
