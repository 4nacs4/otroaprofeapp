(function () {
    'use strict';

    angular
        .module('app.experienceDrawer',[])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider) {
        //mappings
        $stateProvider
            .state('shell.experienceDrawer', {
                abstract: true,
                url: '/experienceDrawer/:pageType/:expId',
                oneNavBarTitle: 'Create an Experience',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    timeLine: function(experienceDrawer){
                        return experienceDrawer.getTimeLine().then(function(res){
                            return res.data.timeline;
                        });
                    },
                    notification: function(experienceDrawer){
                      return experienceDrawer.getSideBarNotification().then(function(res){
                          return res.data.notifications;
                      });
                    },
                    pageType: function($stateParams, navigation){
                        if($stateParams.pageType === ''){
                            var expInfo  = navigation.getExpDrawerNavigation();
                            return expInfo.pageType;
                        }
                        navigation.setExpDrawerNavigation($stateParams.pageType,$stateParams.expId)
                        return $stateParams.pageType;
                    },
                    expId: function($stateParams, navigation){
                        if($stateParams.pageType === '' && $stateParams.expId === ''){
                            var expInfo  = navigation.getExpDrawerNavigation();
                            return expInfo.expId;
                        }
                        return $stateParams.expId;
                    }
                },
                views:{
                    '@': {
                        templateUrl:'src/shell/oneNavShell.html',
                        controller: 'oneNavShell as vm'
                    } ,
                    'topNavBar@shell.experienceDrawer': {
                        templateUrl: 'src/shell/dropDownCrossNavBar.html'
                    },
                    'content@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawer.html',
                        controller: 'experienceDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.participants', {
                url: '',
                navIndex: 0,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: function(experienceDrawer){
                        return experienceDrawer.getSideBarParticipants().then(function(res){
                            return res.data.participants;
                        });
                    },
                    cardType: function(){return 'participants';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.feeds', {
                url: '',
                navIndex: 1,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: function(experienceDrawer){
                        return experienceDrawer.getSideBarFeeds().then(function(res){
                            return res.data.feeds;
                        });
                    },
                    cardType: function(){return 'feeds';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.messages', {
                url: '',
                navIndex: 2,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: function(experienceDrawer){
                        return experienceDrawer.getSideBarMessages().then(function(res){
                            return res.data.messages;
                        });
                    },
                    cardType: function(){return 'messages';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.info', {
                url: '',
                navIndex: 3,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: function(experienceDrawer){
                        return experienceDrawer.getSideBarExpInfo().then(function(res){
                            return res.data;
                        });
                    },
                    cardType: function(){return 'info';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawerInfo.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.chats',{
                url:'/:messageId',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    cardType: function(){return 'chats';},
                    data: function(experienceDrawer, $stateParams){
                        return experienceDrawer.getSideBarMessagesChat($stateParams.messageId).then(
                            function(res){
                                return res.data.chats;
                            }
                        );
                    }
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'src/experienceDrawer/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.addParticipants',{
                url: '/addParticipants',
                oneNavBarType: 'progressCrossNav',
                oneNavBarTitle: 'Add Participant',
                oneNavBarClosePrevState: 'true',
                views:{
                    '@': {
                        templateUrl:'src/shell/oneNavShell.html',
                        controller: 'oneNavShell as vm'
                    } ,
                    'topNavBar@shell.addParticipants': {
                        templateUrl: 'src/shell/progressCrossNavBar.html'
                    },
                    'content@shell.addParticipants':{
                        templateUrl: 'src/experienceDrawer/addParticipant.template.html',
                        controller: 'addParticipants as vm'
                    }
                },
                resolve:{
                    experienceDrawer: 'experienceDrawer',
                    students: function(experienceDrawer){
                        return experienceDrawer.getAddParticipantStudents().then(
                            function(res){
                                return res.data.students;
                            }
                        );
                    },
                    teachers: function(experienceDrawer){
                        return experienceDrawer.getAddParticipantTeachers().then(
                            function(res){
                                return res.data.teachers;
                            }
                        );
                    }
                }
            });
    }
}());
