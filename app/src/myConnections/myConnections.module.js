(function () {
    'use strict';

    angular
        .module('app.myConnections',[])
        .config(configuration);



    /* @ngInject */
    function configuration($stateProvider) {
        $stateProvider
            .state('shell.myConnections', {
                url: '/myConnections',
                title: 'Connections',
                nav: 'subNavMessage2',
                navTitle: 'My Connections',
                navOrder: 2,
                subNavNotificationJsonName: 'connections',
                jsonName: 'connection',
                resolve: {
                    notificationsInfo: function(myConnections){
                        return myConnections.getNotification().then(function(res){
                            return res.data;
                        });
                    }
                },
                views: {
                    'subNavBar@shell': {
                        templateUrl: 'src/shell/messageSubNavBar.html',
                        controller: 'messageSubNavBar as vm'
                    } ,
                    'topNavBar@shell': {
                        templateUrl: 'src/shell/messageTopNavBar.html'
                    },
                    'content@shell':{
                        templateUrl: 'src/myConnections/myConnections.template.html',
                        controller: 'myConnections as vm'
                    }
                }
            })
            .state('shell.myConnections.connected', {
                url: '/connections',
                myConnectionNav: 'myConnections',
                myConnectionNavTitle: 'connections',
                myConnectionNavOrder: 2,
                rowDisplay: false,
                jsonName: 'connected',
                resolve: {
                    connectionInfo: function(myConnections){
                        return myConnections.getConnections().then(function(res){
                            return res.data;
                        });
                    }
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'src/myConnections/myConnections.connections.template.html',
                        controller: 'myConnectionsConnected as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'src/myConnections/myConnections.actionBar.template.html',
                        controller: 'myConnectionsTab as vm'
                    }
                }
            })
            .state('shell.myConnections.request', {
                url: '/request',
                myConnectionNav: 'myConnections',
                myConnectionNavTitle: 'requests',
                myConnectionNavOrder: 2,
                rowDisplay: false,
                jsonName: 'request',
                resolve: {
                    requestInfo: function(myConnections){
                        return myConnections.getRequest().then(function(res){
                            return res.data;
                        });
                    }
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'src/myConnections/myConnections.connections.template.html',
                        controller: 'myConnectionsRequest as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'src/myConnections/myConnections.actionBar.template.html',
                        controller: 'myConnectionsTab as vm'
                    }
                }
            })
            .state('shell.myConnections.outgoing', {
                url: '/outgoing',
                myConnectionNav: 'myConnections',
                myConnectionNavOrder: 3,
                myConnectionNavTitle: 'outgoing',
                rowDisplay: false,
                jsonName: 'outgoing',
                resolve: {
                    outgoingInfo: function(myConnections){
                        return myConnections.getOutgoing().then(function(res){
                            return res.data;
                        });
                    }
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'src/myConnections/myConnections.connections.template.html',
                        controller: 'myConnectionsOutgoing as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'src/myConnections/myConnections.actionBar.template.html',
                        controller: 'myConnectionsTab as vm'
                    }
                }
            });
    }
}());
