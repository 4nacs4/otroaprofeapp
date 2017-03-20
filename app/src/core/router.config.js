(function() {

    'use strict';

    angular.module('app.core')
            .config(configuration)
            .run(routingEvents);

    /* @ngInject */
    function configuration($urlRouterProvider) {
        $urlRouterProvider.otherwise('/registerUser');
        $urlRouterProvider.when('/experienceInvitation/:experienceId', function($stateParams, $match, auth) {
            auth.experienceInvitation($match.experienceId);
        });
        $urlRouterProvider.when('/student/signUp', function($stateParams, $match, auth) {
            auth.login();
        });
    }

    /* @ngInject */
    function routingEvents($rootScope, $auth, $state, navigation, restApi) {
        //on routing error
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            //do some logging and toasting
        });

        //on routing error
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //do some title setting
            $rootScope.pageTitle = toState.title || 'app';
            //set classes to apply on body
            $rootScope.backdropClass = toState.backdrop || '';
            fromState.wentTo = toState.name;
            if (toState.wentTo !== fromState.name) {
                toState.oneNavBarClosePrevState = fromState.name;
            }
        });
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            if ($auth.isAuthenticated()) {
                if (!navigation.getUserDp()._id) {
                    event.preventDefault();
                  //  for(i=0;i<100;i++){
                        restApi.getUserProfile($auth.getPayload().sub).then(function(res) {
                            navigation.setUserDp(res.data.data.user);
                            $state.go(toState, toParams);
                        })
                                . catch (function(response) {
                            console.log(response)
                            $auth.logout();
                        });
                    //}
                }
            } else {
                if (!toState.isPublic) {
                    event.preventDefault();
                    $state.go('shell.connections');
                }
            }
        });
    }
}());
