(function() {

    'use strict';

    angular.module('app.core', [
        'ui.router',
        'ngMessages',
        'ngAnimate',
        'ui.select',
        'ngSanitize',
        'ngScrollbars',
        'angularAwesomeSlider',
        'summernote',
        'angular-img-cropper',
        'ngTagsInput',
        'satellizer'
    ]);

    angular.module('app.core').config(function(uiSelectConfig) {
        uiSelectConfig.theme = 'selectize';
        uiSelectConfig.appendToBody = true;
    });
    angular.module('app.core').config(function(ScrollBarsProvider) {
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            scrollInertia: 400, // adjust however you want
            axis: 'y', // enable 2 axis scrollbars by default,
            theme: 'minimal-dark',
            autoHideScrollbar: true
        };
    });
    angular.module('app.core').config(function($authProvider) {
        var serverUrl = config.restApi.protocol + '://' + config.restApi.host + ':' + config.restApi.port + '/' + config.restApi.authPath;
        $authProvider.loginUrl = serverUrl + "/signin";
        $authProvider.signupUrl = serverUrl + "/signup";
        $authProvider.loginRedirect = '/myProfile/view';
        $authProvider.logoutRedirect = '/connections';
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myAprofeApp";
    });

}());
