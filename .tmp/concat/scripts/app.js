(function () {
  'use strict';

  angular
    .module('app.messages', ['angularMoment' , 'ui.bootstrap'])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {

    //mappings
    $stateProvider
      .state('shell.messageBox', {
        url: '/messageBox',
        nav: 'subNavMessage2',
        title: 'Messages',
        navTitle: 'My Mail',
        navOrder: 3,
        subNavNotificationJsonName: 'messages',
        views: {
          // the main template
          'content@shell': {
            templateUrl: 'views/messages.html'
          },
          // child view
          'messageFoldersColumn@shell.messageBox': {
            templateUrl: 'views/mail.folderView.html'
          },
          // child views
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'views/mail.html'  ,
            controller:  'mailItem as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'views/messageSubNavBar.html',
            controller: 'messageSubNavBar as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'views/messageTopNavBar.html'
          }
        }
      })
      .state('shell.messageBox.newMessage', {
        url: '/newMessage',
        title: 'New Mail',
        views: { 'messageBodyColumn@shell.messageBox': {
          templateUrl: 'views/newMessage.html',
          controller:'newMessage as vm'
          }
        }
      })
      .state('shell.messageBox.sentItem', {
        url: '/sentItem',
        title: 'sent',
        views: {
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'views/mail.sentMessages.html'
          }
        }
      })
      .state('shell.messageBox.trash', {
        url: '/trash',
        title: 'Trash',
        views: {
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'views/mail.trashMessages.html'
          }
        }
      });
  }
  configuration.$inject = ['$stateProvider'];
}());

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

    angular.module('app.core').config(['uiSelectConfig', function(uiSelectConfig) {
        uiSelectConfig.theme = 'selectize';
        uiSelectConfig.appendToBody = true;
    }]);
    angular.module('app.core').config(['ScrollBarsProvider', function(ScrollBarsProvider) {
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
    }]);
    angular.module('app.core').config(['$authProvider', function($authProvider) {
        var serverUrl = config.restApi.protocol + '://' + config.restApi.host + ':' + config.restApi.port + '/' + config.restApi.authPath;
        $authProvider.loginUrl = serverUrl + "/signin";
        $authProvider.signupUrl = serverUrl + "/signup";
        $authProvider.loginRedirect = '/myProfile/view';
        $authProvider.logoutRedirect = '/connections';
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myAprofeApp";
    }]);

}());

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
                profileInfo: ['myProfile', function(myProfile) {
                    return myProfile.getProfile().then(function(res) {
                        return res.data;
                    });
                }]
            }
        })
                .state('shell.myProfile.view.edit', {
            url: '/edit',
            title: 'Edit Profile',
            resolve: {
                allFilters: ['cmFilters', function(cmFilters) {
                    return cmFilters.returnFilterCriteria();
                }]
            },
            views: {
                'content@shell': {
                    templateUrl: 'views/registerUser.html',
                    controller: 'registerUser as vm'
                },
                'subNavBar@shell': {
                    templateUrl: 'views/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'topNavBar@shell': {
                    templateUrl: 'views/topNavBar.html',
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
                    templateUrl: 'views/myProfile.html',
                    controller: 'myProfile as vm'
                },
                'subNavBar@shell': {
                    templateUrl: 'views/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'topNavBar@shell': {
                    templateUrl: 'views/topNavBar.html',
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
                    templateUrl: 'views/messageTopNavBar.html'
                },
                'subNavBar@shell': {
                    templateUrl: 'views/messageSubNavBar.html',
                    controller: 'messageSubNavBar as vm'
                },
                'content@shell': {
                    templateUrl: 'views/parentDashboard.html',
                    controller: 'ParentDashboard as vm'
                }
            },
            resolve: {
                myProfile: 'myProfile',
                dashboardData: ['myProfile', function(myProfile) {
                    return myProfile.getParentDashboard().then(function(res) {
                        return res.data;
                    });
                }]
            }

        });
    }
    configuration.$inject = ['$stateProvider'];
}());

/**
 * @ngdoc module
 * @module app.common
 * @name app.common
 * @description Module for common components throughout the application
 */

(function(){

  'use strict';

  angular.module('app.common', [
    'ui.utils'
  ]);

}());

/**
 * @ngdoc module
 * @module app.shell
 * @name app.shell
 * @description Module to contain shell/layout components
 */

(function(){
  'use strict';

  angular
    .module('app.shell', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
    $stateProvider
      .state('shell', {
        abstract: true,
        url:'',
        views: {
          '@': {
            templateUrl:'views/shell.html',
            controller: 'Shell as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'views/topNavBar.html',
            controller: 'TopNavBar as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'views/subNavBar.html',
            controller: 'SubNavBar as vm'
          },
          'marketingBanner@shell':{
            templateUrl: 'views/marketingBanner.html'
          }
        }
      });
  }
  configuration.$inject = ['$stateProvider'];
}());

(function(){
  'use strict';

  angular
    .module('app.shell')
    .controller('Shell', Shell);

  /* @ngInject */
  function Shell(navigation, $state){
    var vm = this;
    vm.isBannerVisible = navigation.getMarketingBannerStatus;
    vm.hideBanner = navigation.hideMarketingBannner;
    vm.userDp = navigation.getUserDp();
    /////////////////////
  }
  Shell.$inject = ['navigation', '$state'];
}());

/**
 * @ngdoc module
 * @module app.widgets
 * @name app.widgets
 * @description Module to contain re-usable widgets/components
 */

(function(){
  'use strict';

  angular
    .module('app.widgets', []);
}());

/**
 * @ngdoc module
 * @module app.connections
 * @name app.connections
 * @description Module for connections feature
 */

(function(){
  'use strict';

  angular
    .module('app.connections', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider, backdrop){

    //add your state mappings here
    $stateProvider
      .state('shell.connections', {
        url:'/connections',
        title: 'Connections',
        nav: 'top',
        backdrop: backdrop.clearWhite,
        isPublic: true,
        views: {
          'content@shell':{
            templateUrl:'views/home.html',
            controller: 'Home as vm'
          },
        }
      })
      .state('shell.connections.profile', {
      url:'/profile/:id',
      title: 'Profile',
      backdrop: backdrop.clearWhite,
      views: {
        'content@shell':{
          templateUrl:'views/profile.html',
          controller:'Profile as vm'
        },
        'subNavBar@shell':{
          templateUrl: 'views/backSubNavBar.html'
        }
      }
    });
  }
  configuration.$inject = ['$stateProvider', 'backdrop'];
}());

/**
 * @ngdoc module
 * @module app.modals
 * @name app.modals
 * @description Modals feature
 */


(function(){
  'use strict';

  angular
    .module('app.modals', ['ui.bootstrap']);

}());

(function (){

  'use strict';

  angular.module('app', ['templates-htmlmin',
    'app.core',
    'app.common',
  /**
   * Application modules
   **/
    'app.shell',
    'app.widgets',
    'app.connections',
    'app.modals',
    'app.messages',
    'app.myProfile',
    'app.registerUser',
    'app.myConnections',
    'app.experienceDrawer'
  ]);
}());

(function() {

    'use strict';

    angular.module('app.core')
            .config(configuration)
            .run(routingEvents);

    /* @ngInject */
    function configuration($urlRouterProvider) {
        $urlRouterProvider.otherwise('/registerUser');
        $urlRouterProvider.when('/experienceInvitation/:experienceId', ['$stateParams', '$match', 'auth', function($stateParams, $match, auth) {
            auth.experienceInvitation($match.experienceId);
        }]);
        $urlRouterProvider.when('/student/signUp', ['$stateParams', '$match', 'auth', function($stateParams, $match, auth) {
            auth.login();
        }]);
    }
    configuration.$inject = ['$urlRouterProvider'];

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
    routingEvents.$inject = ['$rootScope', '$auth', '$state', 'navigation', 'restApi'];
}());

/**
 * @ngdoc directive
 * @name cmConnection
 * @module app.widgets
 * @restrict E
 * @description Connection widget directive, example usage
 * <cm-connection user="vm.user" connect="vm.connect()"></cm-connection>
 * @param {object} profile
 * @param {expression} connect
 * @param {expression} viewProfile route to view profile
 * @param {number} colSize defines the width of the card from column size
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmConnection', cmConnection);

  /* @ngInject */
  function cmConnection(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmConnection.template.html',
      replace: true,
      scope: {
        profile: '=',
        connect: '&',
        toProfile: '&',
        colSize: '='
      }
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      var watchDestroyers = [];
      scope.colClass = colClass(scope.colSize);

      watchDestroyers.push(scope.$watch('colSize', function(newVal, oldVal){
        if(newVal){
          scope.colClass = colClass(newVal);
        }
      }));

      function colClass(colSize){
        var colSizeOffset = 12 / colSize;
        var colSizeClass = 'col-sm-' + colSizeOffset + ' ' + 'col-xs-' + colSizeOffset;
        if(colSizeOffset === 12){
          colSizeClass = colSizeClass + ' cm-cardRowBlock';
        }
        return colSizeClass;
      }

      //destroy all installed watchers on scope destroy
      var deregisterDestroy = scope.$on('$destroy', function(){
        watchDestroyers.forEach(function(watcher){
          watcher();
        });
        deregisterDestroy();
      });
    }
  }
}());

/**
 * @ngdoc directive
 * @name cmConnectionTag
 * @module app.widgets
 * @restrict E
 * @description Connection tag directive, example usage
 * <cm-connection-tag connection="vm.connection""></cm-connection-tag>
 * @param {object} connection
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmConnectionTag', cmConnectionTag);

  /* @ngInject */
  function cmConnectionTag(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmConnectionTag.template.html',
      scope:{
        connection: '='
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }
}());

/**
 * @ngdoc directive
 * @name cmExperienceTag
 * @module app.widgets
 * @restrict E
 * @description Experience tag directive, example usage
 * <cm-experience-tag experience="vm.experience""></cm-experience-tag>
 * @param {object} experience
 */


(function(){
  'use strict';

  angular
    .module('app.widgets')
    .directive('cmExperienceTag', cmExperienceTag);

  /* @ngInject */
  function cmExperienceTag($stateParams,$state){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmExperienceTag.template.html',
      scope:{
        experience: '=',
        cardType: '@',
        editExperience: '&'
      },
      replace: true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      if((scope.experience.description !== undefined)&&(scope.experience.description.length >= 50)){
          scope.experience.description = scope.experience.description.substring(0, 100).concat('...');
      }
      scope.goToExperienceDrawer = function(){
          $state.go('shell.experienceDrawer.participants',{
              pageType: 'timeLine',
              expId: scope.experience.Id
          });
      };
    }

  }
  cmExperienceTag.$inject = ['$stateParams', '$state'];
}());


/**
 * @ngdoc factory
 * @module app.connections
 * @name connections
 * @description Encapsulates Connections logic
 */

(function(){
	'use strict';

	angular
		.module('app.connections')
		.factory('connections', connections);

  /* @ngInject */
  function connections($http, $filter){

    var layoutItemMap = {
      list: 1,
      grid: 4
    };

    return {
      find: find,
      sortingFilter: sortingFilter,
      itemsPerCol: itemsPerCol
    };
    ////////////////////

    /**
     * @ngdoc method
     * @name findConnections
     * @description HTTP GET request to fetch connections data
     * @returns Returns a promise to the HTTP request
     */

    function find(){
      return $http.get('datastore/profiles.json');
    }

    function sortingFilter(data, predicate, reverse){
      return $filter('orderBy')(data, predicate, reverse);
    }

    function itemsPerCol(layout){
      return layoutItemMap[layout];
    }
  }
  connections.$inject = ['$http', '$filter'];
}());


/**
 * @ngdoc factory
 * @module app.messages
 * @name messages
 * @description Encapsulates Messages logic
 */

(function(){
  'use strict';

  angular
    .module('app.messages')
    .factory('messages', messages);

  /* @ngInject */
  function messages($http){
    var service = {
      findMessages: findMessages
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name findMessages
     * @description HTTP GET request to fetch messages data
     * @returns Returns a promise to the HTTP request
     */

    function findMessages (){
      return $http.get('datastore/mock_messages.json');
    }
  }
  messages.$inject = ['$http'];
}());

/**
 * @ngdoc factory
 * @module app.connections
 * @name widgetContainer
 * @description Encapsulates a widget with tabbing and navigation
 */

(function(){
  'use strict';

  angular
    .module('app.connections')
    .factory('widgetContainer', widgetContainer);

  /* @ngInject */
  function widgetContainer(){
    var service = {
      newWidgetContainer : newWidgetContainer,
      tab : tab
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name newWidgetContainer
     * @description Creates a new widget container with tabs and navigation
     * @returns Returns a promise to the HTTP request
     */

    function newWidgetContainer(tabs, activeTab){
       return {
         tabs: tabs,
         activeTab: activeTab || 0,
         show: function(tab){
           var wd = this;
           wd.activeTab = wd.tabs.indexOf(tab);
         },
         updateActiveTab: function(tab){
           var wd = this;
           wd.activeTab = wd.tabs.indexOf(tab);
         },
         updatePage: function(){
           var wd = this;
           var vm = this.tabs;
           var tab = vm[wd.activeTab];
           var begin = (tab.currentPageNo - 1) * tab.itemPerPage;
           var end = begin + tab.itemPerPage ;
           tab.currentPage = tab.data.slice(begin, end);
         },
         activeTabCurrentPage: function(){
           var wd = this;
           return parseInt(wd.tabs[wd.activeTab].currentPageNo);
         },
         activeTabTotalItems: function(){
           var wd = this;
           return parseInt(wd.tabs[wd.activeTab].data.length);
         },
         activeTabItemsPerPage: function(){
           var wd = this;
           return parseInt(wd.tabs[wd.activeTab].itemPerPage);
         },
         isActiveTab: function(tab){
           var wd = this;
           if(wd.tabs.indexOf(tab) === wd.activeTab){
             return true;
           }
           return false;
         }
       };
    }

    function tab(title, data, itemPerPage, isActiveOnCreate){
      return {
        active: isActiveOnCreate || false,
        title: title,
        data: data,
        currentPageNo: 1,
        itemPerPage: itemPerPage,
        totalPages: ~~(data.length / itemPerPage),
        currentPage: data.slice(0, itemPerPage)
      }
    }

  }
}());

/**
 * @ngdoc controller
 * @module app.connections
 * @name Home
 * @description Controller for the shell.home state
 */

(function(){
  'use strict';

  angular
    .module('app.connections')
    .controller('Home', Home);

  /* @ngInject */
  function Home(connections, $filter, $state, auth, navigation, $rootScope, cmFilters){
    var vm = this;
    init();
    vm.setConnectionsLayout = setConnectionsLayout;
    vm.toggleSortDirection = toggleSortDirection;
    vm.clearAllFilter = clearAllFilter;
    vm.onSort = onSort;
    vm.toProfile = toProfile;
    vm.connect = connect;
    vm.saveFilter = saveFilter;
    vm.invertSavedSearchDisplay = invertSavedSearchDisplay;

    vm.connectionLayout = 'grid';
    vm.cardPerCol = 4;
    vm.sortDirDesc = true;
    vm.sortCriteria = [
      {
        name:'Name',
        value: ''
      },
      {
        name: 'Subject',
        value: ''
      },
      {
        name: 'Language',
        value: ''
      }
    ];
    vm.selectedSort = vm.sortCriteria[0];
    /////////////////////

    function init(){
      connections.find().then(function(res){
        cmFilters.convertProfilesArrayToString(res.data.profiles);
        vm.connections = connections.sortingFilter(res.data.profiles, vm.selectedSort.value,
          vm.sortDirDesc);
        vm.totalCount = res.data.total;
      });
      vm.isBannerVisible = navigation.getMarketingBannerStatus;
      vm.sideFilterOpen = true;
      vm.sideFilterClosed = false;
      vm.showSavedSearches = false;
      vm.searches = cmFilters.returnSearches();
      vm.filterCriteria = cmFilters.returnFilterCriteria();
    }

     function clearAllFilter(){
      $rootScope.$broadcast('SideFilterCleared');
    }

    function setConnectionsLayout(type){
      vm.cardPerCol = connections.itemsPerCol(type);
    }

    function toggleSortDirection(){
      vm.sortDirDesc = !vm.sortDirDesc;
      vm.connections = connections.sortingFilter(vm.connections, vm.selectedSort.value, vm.sortDirDesc);
    }

    function onSort(value){
      vm.connections = connections.sortingFilter(vm.connections, value, vm.sortDirDesc);
    }

    function toProfile(id){
      $state.go('shell.connections.profile', {
        id: id
      });
    }
    function saveFilter(){
      auth.saveFilter();
    }

    function connect(id, displayName){
      auth.sendInvite(id, displayName);
    }

    function invertSavedSearchDisplay(){
      vm.showSavedSearches = !vm.showSavedSearches;
    }
  }
  Home.$inject = ['connections', '$filter', '$state', 'auth', 'navigation', '$rootScope', 'cmFilters'];
}());

/**
 * @ngdoc controller
 * @module app.shell
 * @name TopNavBar
 * @description Controller for the top navigation bar in the application
 */

(function() {
    'use strict';

    angular
            .module('app.shell')
            .controller('TopNavBar', TopNavBar);

    /* @ngInject */
    function TopNavBar(auth, $state, navigation, $auth) {
        var vm = this;
        
        vm.user = navigation.getUserDp();
        vm.navStates = [];
        vm.login = login;
        vm.isBannerVisible = navigation.getMarketingBannerStatus;
        vm.isLoggedIn = isLoggedIn;
        

        init();
        
        /////////////////////

        /**
         * @ngdoc method
         * @name init
         * @description init function call, sets the navigational states array
         */

        function init() {
            $state.get()
                    .forEach(function(state) {
                if (state.nav === 'top') {
                    vm.navStates.push(state);
                }
            });
        }

        /**
         * @ngdoc method
         * @name login
         * @description Opens the login modal
         */

        function login() {
            auth.login()
            .then(function(res) {
                navigation.setUserDp(res.data.data.user)
            }, function(reason) {

            });
        }
        function isLoggedIn() {
            return $auth.isAuthenticated();
        }
    }
    TopNavBar.$inject = ['auth', '$state', 'navigation', '$auth'];
}());

/**
 * @ngdoc factory
 * @module app.common
 * @name auth
 * @description Encapsulates Authentication logic and modals
 */

(function(){
  'use strict';

  angular
    .module('app.common')
    .factory('auth', auth);

  /* @ngInject */
  function auth(cmModal, cmDialog){
    var service = {
      login: login,
      sendInvite: sendInvite,
      saveFilter: saveFilter,
      experienceInvitation: experienceInvitation,
      showMessage: showMessage
    };

    return service;

    ////////////////////
    /**
     * @ngdoc method
     * @name login
     * @description Opens a large cmModal instance
     * @returns Returns a promise to the cmModal opened
     */

    function login(){
      var config = {
        templateUrl: 'views/modals/loginModal.html',
        controller: 'LoginModal as vm'
      };

      return cmModal.openSm(config).result;
    }

    function saveFilter(filterAttributes){
        var config = {
            templateUrl: 'views/modals/saveFilterDialog.html',
            controller: 'SaveFilterDialog as vm'
        };
        return cmDialog.open(config).result;
    }

    function experienceInvitation(id){
        var config = {
            templateUrl: 'views/modals/experienceInvitationDialog.html',
            controller: 'experienceInvitation as vm',
            resolve: {
                experienceDetails: function(){
                    return{
                        experienceId: id
                    };
                }
            }
        };
        return cmDialog.open(config).result;
    }

    function sendInvite(id, displayName){
      var config = {
        templateUrl: 'views/modals/inviteConnectionDialog.html',
        controller: 'InviteConnectionDialog as vm',
        resolve:{
          connectionDetails: function(){
            return {
             connectionId: id,
             connectionDisplayName: displayName
           };
          }
        }
      };
      return cmDialog.open(config).result;
    }
    function showMessage(message){
      var config = {
        templateUrl: 'views/modals/messageModal.html',
        controller: 'messageModal as vm',
        resolve:{
          extraData: function(){
            return {
             message: message
           };
          }
        }
      };
      return cmDialog.open(config).result;
    }
  }
  auth.$inject = ['cmModal', 'cmDialog'];
}());

/**
 * @ngdoc factory
 * @module app.myProfile
 * @name myProfile
 * @description Encapsulates My Profile logic
 */

(function(){
  'use strict';

  angular
    .module('app.myProfile')
    .factory('myProfile', myProfile);

  /* @ngInject */
  function myProfile($http){
    var userProfile;

    var service = {
        getProfile: getProfile,
        getParentDashboard: getParentDashboard
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name editProfileDetails
     * @description HTTP GET request to fetch myProfile data
     * @returns Returns a promise to the HTTP request
     */
    function getProfile(id){
        return $http.get('datastore/myProfile.json');
    }
    function getParentDashboard(){
        return $http.get('datastore/parentDashboard.json');
    }
  }
  myProfile.$inject = ['$http'];
}());

/**
 * @ngdoc factory
 * @module app.modals
 * @name cmModal
 * @description Defines Modals to be used across the application. All modal modifications
 * are from ui.bootstrap modals.
 * @returns Returns an object with different modal configurations
 */

(function(){
	'use strict';

	angular
		.module('app.modals')
		.factory('cmModal', cmModal);

  /* @ngInject */
  function cmModal(modalConfigs, $modal){
    var service = {
      openSm: openSm,
      openMed: openMed,
      openLg: openLg
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name openSm
     * @description Opens are modal with 'small' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openSm(config){
      return open('small', config);
    }

    /**
     * @ngdoc method
     * @name openMed
     * @description Opens are modal with 'medium' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openMed(config){
      return open('medium', config);
    }

    /**
     * @ngdoc method
     * @name openLg
     * @description Opens are modal with 'large' sized CSS
     * @param {object} config Contains configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function openLg(config){
      return open('large', config);
    }

    /**
     * @ngdoc method
     * @name open
     * @description Opens a ui bootstrap modal according to the configurations and size
     * @param {string} size size in either small, medium or large
     * @param {object} config Configuration for the modal to be opened
     * @returns Returns a promise to the opened modal
     */

    function open(size, config){
      angular.extend(config, modalConfigs.base, modalConfigs[size]);
      return $modal.open(config);
    }
	}
	cmModal.$inject = ['modalConfigs', '$modal'];
}());


/**
 * @ngdoc factory
 * @module app.modals
 * @name cmModal
 * @description Defines Modals to be used across the application. All modal modifications
 * are from ui.bootstrap modals.
 * @returns Returns an object with different modal configurations
 */

(function(){
  'use strict';

  angular
    .module('app.modals')
    .factory('cmDialog', cmDialog);

  /* @ngInject */
  function cmDialog(modalConfigs, $modal){
    var service = {
      open: open
    };

    return service;

    function open(config){
      angular.extend(config, modalConfigs.dialog);
      return $modal.open(config);
    }
  }
  cmDialog.$inject = ['modalConfigs', '$modal'];
}());

/**
 * @ngdoc constant
 * @module app.modals
 * @name modalConfigs
 * @description Defines small, medium, large modal configurations as constants
 */

(function(){
  'use strict';

  var modalConfigs = {
    base: {
      windowTemplateUrl: 'views/cmModalWindow.html',
      backdrop: 'static'
    },
    dialog:{
      windowTemplateUrl: 'views/cmDialogWindow.html',
      backdrop: 'static',
      windowClass: 'cm-modalPopUp'
    },
    small: {
      windowClass: 'cm-modal'
    },
    medium: {
      windowClass: 'cm-modal'
    },
    large:{
      windowClass: 'cm-modal cm-modalLarge'
    }
  };

  angular
    .module('app.modals')
    .constant('modalConfigs', modalConfigs);

}());


/**
 * @ngdoc controller
 * @module app.common
 * @name LoginModal
 * @description Controller for the Login Modal Instance
 */

(function() {
    'use strict';

    angular
            .module('app.common')
            .controller('LoginModal', LoginModal);

    /* @ngInject */
    function LoginModal($modalInstance, $http, $location, $timeout, $auth, $state, dataCollections) {
        var vm = this;
        vm.currentPage = 1;
        vm.itemsPerPage = 40;
        vm.maxSize = 10; //Number of pager buttons to show
        vm.showAvatarList = false;
        vm.idTypeCollection = dataCollections.getIdTypeCollection();
        vm.idType = vm.idTypeCollection[0];
        vm.idNumber = '';
        vm.user = {
            id: '',
            password: '',
            email: '',
            confirmPassword: '',
            firstName:'',
            displayName:'',
            lastName:'',
            personType:'',
            avatar: '/images/avatars/noAvatar.png'
        };
        
        if ($location.$$path === '/student/signUp') {
            $http.get('datastore/avatars.json').then(function(res) {
                vm.data = res.data;
                vm.totalItems = vm.data.length;
                console.log(vm.totalItems + "total");
            });
            vm.activeState = 'signUpStudent';
            vm.size = true;
        } else {
            vm.activeState = 'signIn';
            vm.size = true;
        }
        vm.updateUserImg = function(item) {
            vm.user.profileAvatar = item.image;
            vm.showList();
        };
        vm.setPage = function(pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
        };

        vm.setItemsPerPage = function(num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first paghe
        }
        vm.avatarList = {};
        vm.setActiveState = setActiveState;
        vm.login = login;
        vm.signUp = signUp;
        vm.setListValues = setListValues;
        vm.showOnState = showOnState;
        vm.months = [
            {
                id: 1,
                name: 'Jan'
            },
            {
                id: 2,
                name: 'Feb'
            },
            {
                id: 3,
                name: 'Mar'
            },
            {
                id: 4,
                name: 'Apr'
            },
            {
                id: 5,
                name: 'May'
            },
            {
                id: 6,
                name: 'Jun'
            },
            {
                id: 7,
                name: 'Jul'
            },
            {
                id: 8,
                name: 'Aug'
            },
            {
                id: 9,
                name: 'Sep'
            },
            {
                id: 10,
                name: 'Oct'
            },
            {
                id: 11,
                name: 'Nov'
            },
            {
                id: 12,
                name: 'Dec'
            }
        ];
        vm.startYear = 1970;
        vm.endYear = (new Date()).getFullYear();
        var i;
        vm.days = [];
        vm.years = [];
        for (i = 1; i <= 31; i++) {
            vm.days.push(new Option(i, i));
        }
        for (i = vm.startYear; i <= vm.endYear; i++) {
            vm.years.push(new Option(i, i));
        }
        function Option(id, name) {
            this.id = id;
            this.name = name;
        }
        vm.setAvatar = function(avatar) {
            console.log(avatar);
            vm.user.profileAvatar = avatar;
        }

        vm.showList = function() {

            if (!vm.showAvatarList) {
                vm.showAvatarList = true;
            } else {

                vm.showAvatarList = false;

            }


        }

        /////////////////////

        function setActiveState(nextState) {
            vm.activeState = nextState;
            vm.showForgotPasswordText = false
            vm.size = true
            if (nextState === 'forgotPassword') {
                $timeout(function() {
                    vm.showForgotPasswordText = true;
                }, 400);
            }
            vm.id = '';
            vm.user.id = '';
            vm.user.password = '';
            vm.user.email = '';
            vm.user.confirmPassword = '';

        }

        function showOnState(state) {
            return vm.activeState === state;
        }

        function login() {
            vm.setListValues();
            $auth.login(vm.user)
            .then(function(res) {
                $modalInstance.close(res);
            })
            .catch (function(err) {
                console.log(err)
            });
        }
        function signUp() {
            vm.setListValues();          
            $auth.signup(vm.user)
            .then(function(res) {
                $modalInstance.close(res);
            })
            .catch (function(err) {
                console.log(err)
            });
        }
        function setListValues() {
            vm.user.personType = vm.idType.id;
            vm.user.id = vm.idType.id + '-' + vm.idNumber;
            vm.user.displayName = vm.user.firstName + " " + vm.user.lastName.substr(0, 1);
        }

    }
    LoginModal.$inject = ['$modalInstance', '$http', '$location', '$timeout', '$auth', '$state', 'dataCollections'];
}());

/**
 * @ngdoc factory
 * @module app.connections
 * @name profile
 * @description Encapsulates Connections' profile logic
 */

(function(){
  'use strict';

  angular
    .module('app.connections')
    .factory('profile', profile);

  /* @ngInject */
  function profile($http){
    var service = {
      get: get
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name getProfile
     * @description HTTP GET request to fetch profile data
     * @returns Returns a promise to the HTTP request
     * @param {integer} id id of the profile to fetch
     */

    function get(id){
      return $http.get('datastore/profilePage.json');
    }
  }
  profile.$inject = ['$http'];
}());


 /**
 * @ngdoc controller
 * @module app.connections
 * @name Profile
 * @description Controller for connection profile view
 */

(function(){
  'use strict';

  angular
    .module('app.connections')
    .controller('Profile', Profile);

  /* @ngInject */
  function Profile(profile, widgetContainer, $stateParams, auth){
    var vm = this;
    init();
    var profileAttributes  = [
      {title : 'GRADE(S) TAUGHT', detail : 'grades-taught', upperCase : 'false'},
      {title : 'AGE OF STUDENTS', detail : 'ages', upperCase : 'true'},
      {title : 'TYPE OF SCHOOL', detail : 'schooltype', upperCase : 'true'},
      {title : 'NAME OF SCHOOL', detail : 'schoolname', upperCase : 'true'},
      {title : 'SUBJECTS(S)', detail : 'subjects', upperCase : 'true'},
      {title : 'LANGUAGE(S)', detail : 'languages', upperCase : 'true'},
      {title : 'CLASS SIZE', detail : 'class-size', upperCase : 'true'},
      {title : 'INTERESTED IN', detail : 'interested_in', upperCase : 'true'},
      {title : 'LOOKING FOR', detail : 'looking_for', upperCase : 'false'}
    ];
    /////////////////////
    function init(){
        profile.get($stateParams.id)
          .then(function(res){
            vm.connect = connect;
            vm.connectionProfile = res.data;
            vm.profileAttributes = [];
            for(var i = 0 ; i <= profileAttributes.length - 1 ; i++){
              vm.profileAttributes[i] =  fillDetails(vm.connectionProfile, profileAttributes[i]);
            }

            vm.connectionWidget = widgetContainer.newWidgetContainer([
              new widgetContainer.tab('connections', vm.connectionProfile['connections'], 4),
              new widgetContainer.tab('mutual connections', vm.connectionProfile['shared-connections'], 4, true)
            ], 1);

            vm.experienceWidget = widgetContainer.newWidgetContainer([
              new widgetContainer.tab('experiences', vm.connectionProfile.experiences, 4, true)
            ]);
          });
    }
    function connect(id, displayName){
      auth.sendInvite(id, displayName);
    }
    function fillDetails(connectionProfile, accessor){
      return {
        title: accessor.title,
        data: (connectionProfile[accessor.detail]),
        upperCase: accessor.upperCase,
        defaultValue: 'N/A'
      };
    }
  }
  Profile.$inject = ['profile', 'widgetContainer', '$stateParams', 'auth'];
}());

/**
  * @ngdoc directive
  * @name cmFieldValid
  * @module app.common
  * @restrict A
  * @require form
  * @description Appends ngMessages text block as a sibling to the input field
  * to add a tick sign at the right most end of the input box to indicate a
  * valid form field e.g.
  * <input type="text" ng-model="username" cm-field-valid/>
  * The tick would only show if the field is dirty.
*/

(function(){

  'use strict';

  angular
    .module('app.common')
    .directive('cmFieldValid', cmFieldValid);

  /* @ngInject */
  function cmFieldValid($compile, values){

    var directive = {
      link: link,
      restrict: 'A',
      require: '^form'
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs, formCtrl){
      var formExpression = formCtrl.$name + '.' + attrs.name;
      var message = values.messagesValid.replace(/\{0\}/g, formExpression);
      var compiled = $compile(message)(scope);
      elem.parent().append(compiled);
    }
  }
  cmFieldValid.$inject = ['$compile', 'values'];
}());

/**
 * @ngdoc constant
 * @module app.common
 * @name values
 * @description Defines values which are common to the application
 */

(function(){
	'use strict';

  var values = {
    messagesValid: '<ng-messages for="{0}" ng-if="{0}.$dirty"><div ng-message="$valid">'
                    + '<span class="glyphicon glyphicon-ok cm-okIcon"></span></div></ng-messages>'
  };


	angular
		.module('app.common')
		.constant('values', values);

}());


(function(){

  'use strict';

  var menu = {

    status : 0

  };



  angular
    .module('app.common')
    .value('menu', menu);

}());

(function(){
    'use strict';

    angular
        .module('app.common')
        .factory('cmFilters', cmFilters);

    /* @ngInject */
    function cmFilters($http){
        function getTypeOfSchools(){
            return $http.get('datastore/schooltype.json');
        }
        function getLanguageFilter(){
            return $http.get('datastore/languages.json');
        }
        function getAgesFilter(){
            return $http.get('datastore/studentages.json');
        }
        function getSubjectsFilter(){
            return $http.get('datastore/subjects.json') ;
        }
        function getClassSizeFilter(){
            return $http.get('datastore/gradestaught.json');
        }
        function getCountryFilter(){
            return $http.get('datastore/country.json');
        }
        function getInterestFilter(){
            return $http.get('');
        }
        function getLookingForFilter(){
            return $http.get('datastore/lookingfor.json');
        }
        function getSavedSearches(){
            return $http.get('datastore/savedsearches.json');
        }
        function getRecentSearches(){
            return $http.get('datastore/recentsearches.json');
        }
        function getFilterStringForm(filterVal){
            var string = '';
            angular.forEach(filterVal, function(filter){
                string = string + filter.name + ', ';
            });
            return string.substring(0,string.length-2);
        }
        function convertProfilesArrayToString(profiles){
            angular.forEach(profiles, function(profile){
                profile.subjectsString = (getFilterStringForm(profile.subjects));
                profile.languagesString = (getFilterStringForm(profile.languages));
            });
        }

        function returnFilterCriteria(selectedFilters){
            var filterCriteria = [
                {
                    jsonArrayName: 'country',
                    heading: 'country',
                    selectedValues: [],
                    placeHolder: 'Add a country',
                    allValues: [],
                    getAllValues: getCountryFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'student-ages',
                    heading: 'age group',
                    selectedValues: [],
                    placeHolder: 'Add an Age Group',
                    allValues: [],
                    getAllValues: getAgesFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'languages',
                    heading: 'language(s) spoken',
                    selectedValues: [],
                    placeHolder: 'Add a Language',
                    allValues: [],
                    getAllValues: getLanguageFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'gradestaught',
                    heading: 'class size',
                    selectedValues: [],
                    placeHolder: 'Add a Class Size',
                    allValues: [],
                    getAllValues: getClassSizeFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'subjects',
                    heading: 'subjects',
                    selectedValues: [],
                    placeHolder: 'Add a Subject',
                    allValues: [],
                    getAllValues: getSubjectsFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'interests',
                    heading: 'interests',
                    selectedValues: [],
                    placeHolder: 'Add an Interest',
                    allValues: [],
                    getAllValues: getInterestFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'lookingfor',
                    heading: 'looking for',
                    selectedValues: [],
                    placeHolder: 'Add Looking For',
                    allValues: [],
                    getAllValues: getLookingForFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'schooltype',
                    heading: 'school type',
                    selectedValues: [],
                    placeHolder: 'Add School Type',
                    allValues: [],
                    getAllValues: getTypeOfSchools,
                    newSelectedValue: '',
                    inSideBar: false
                }
            ];
            angular.forEach(filterCriteria, function(filter){
                filter.getAllValues().then(function(res){
                    filter.allValues = res.data[filter.jsonArrayName];
                    if(selectedFilters !== undefined){
                        filter.selectedValues = selectedFilters[filter.jsonArrayName];
                        angular.forEach(filter.selectedValues,function(selected){
                            angular.forEach(filter.allValues, function(value){
                                if(selected.name === value.name){
                                    var i = filter.allValues.indexOf(value);
                                    if(i !== -1) {
                                        filter.allValues .splice(i, 1);
                                    }
                                }
                            });
                        });
                    }
                });

            });
            return filterCriteria;
        }
        function returnSearches(){
            var searches = [
                {
                    heading: 'Recent Searches',
                    list: [] ,
                    getList: getRecentSearches,
                    showCharacters: 26,
                    jsonArrayName: 'recentsearches'
                },
                {
                    heading: 'Saved Searches',
                    list: [],
                    getList: getSavedSearches,
                    jsonArrayName: 'savedsearches'
                }
            ];
            angular.forEach(searches, function(search){
                search.getList().then(function(res){
                    search.list = res.data[search.jsonArrayName];
                });
            });
            return searches;
        }
        var service = {
            getLanguageFilter: getLanguageFilter,
            getAgesFilter: getAgesFilter,
            getSubjectsFilter: getSubjectsFilter,
            getClassSizeFilter: getClassSizeFilter,
            getCountryFilter: getCountryFilter,
            getInterestFilter: getInterestFilter,
            getLookingForFilter: getLookingForFilter,
            getSavedSearches: getSavedSearches,
            getRecentSearches: getRecentSearches,
            returnFilterCriteria: returnFilterCriteria,
            returnSearches: returnSearches,
            getTypeOfSchools: getTypeOfSchools,
            getFilterStringForm: getFilterStringForm,
            convertProfilesArrayToString: convertProfilesArrayToString
        };
        return service;
    }
    cmFilters.$inject = ['$http'];
}());


(function(){
    'use strict';

    angular
        .module('app.shell')
        .controller('oneNavShell', oneNavShell);

    /* @ngInject */
    function oneNavShell(navigation, $state){
        var vm = this;
        vm.navStates = [];
        vm.title = '';
        vm.userDp = navigation.getUserDp();
        vm.progressCrossNavClosePrevState = '';
        init();
        /////////////////////
        function init(){
           vm.progressCrossNav =  ($state.$current.oneNavBarType === 'progressCrossNav');
           vm.dropDownCrossNav = ($state.$current.oneNavBarType === 'dropDownCrossNav');
           vm.progressCrossNavClosePrevState =  (typeof($state.$current.oneNavBarClosePrevState) !== undefined)? $state.$current.oneNavBarClosePrevState : '^';
           if(vm.progressCrossNavClosePrevState === ''){
             vm.progressCrossNavClosePrevState = 'shell.connections';
           }
           if(vm.progressCrossNav === true){
               vm.progressCrossNavtitle = $state.$current.oneNavBarTitle;
           }
        }
    }
    oneNavShell.$inject = ['navigation', '$state'];
}());

/**
 * @ngdoc controller
 * @module app.shell
 * @name SubNavBar
 * @description Controller for the sub navigation bar in the application
 */


(function(){
  'use strict';

  angular
    .module('app.shell')
    .controller('SubNavBar', SubNavBar);

  /* @ngInject */
  function SubNavBar(){
    var vm = this;

    /////////////////////

    function testFunction (){
      console.info('This is a test function');
    }
  }
}());

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
    messageSubNavBar.$inject = ['navigation', '$state', '$scope', '$auth'];
}());
/**
 * @ngdoc constant
 * @module app.shell
 * @name backdrop
 * @description Defines the CSS classes to be added on each type of backdrop
 */

(function(){
	'use strict';

  var backdrop = {
    greenBubbles: 'cm-bubblesBg cm-bgDGreen',
    clearWhite: ''
  };

	angular
		.module('app.shell')
		.constant('backdrop', backdrop)

}());

/**
 * @ngdoc directive
 * @name cmModalWindowClass
 * @module app.modals
 * @restrict A
 * @description Directive to change the modal class on change of a scope variable
 *  <div class="modal-body"
 *  cm-modal-window-class="{'queryClass':'cm-modal', 'cm-modalSmall': vm.size, 'cm-modalLarge': !vm.size}">
 *  ...</div
 * @param {object}  queryClass property contains the class which will be used to query the DOM element
 *                  className: value, class will be removed from the queryClass element if value is falsy
 *                  and added if value is truthy
 */

(function(){

  'use strict';

  angular
    .module('app.modals')
    .directive('cmModalWindowClass', cmModalWindowClass);

  /* @ngInject */
  function cmModalWindowClass(){
    return function link(scope, elem, attrs){
      var queryClass = '.' + scope.$eval(attrs.cmModalWindowClass).queryClass;
      scope.$watch(attrs.cmModalWindowClass, function(newVal, oldVal){
        for(var property in newVal){
          if(newVal.hasOwnProperty(property)){
            if(Boolean(newVal[property] || 0)){
              document.querySelector(queryClass).classList.add(property);
            }
            else{
              document.querySelector(queryClass).classList.remove(property);
            }
          }
        }
      });
    };
  }
}());

/**
 * @ngdoc controller
 * @module app.common
 * @name InviteConnectionModal
 * @description Controller for the Invite Connection Modal Instance
 */

(function(){
  'use strict';

  angular
    .module('app.common')
    .controller('InviteConnectionDialog', InviteConnectionDialog);

  /* @ngInject */
  function InviteConnectionDialog($modalInstance, connectionDetails){
    var vm = this;
    vm.connectionId = connectionDetails.connectionId;
    vm.connetiondisplayName = connectionDetails.connectionDisplayName;
    vm.close = close;
    function close(){
        $modalInstance.dismiss('cancel');
    }
  }
  InviteConnectionDialog.$inject = ['$modalInstance', 'connectionDetails'];
}());


(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('sideBarContainer', sideBarContainer);

  /* @ngInject */
  function sideBarContainer($timeout){

    var directive = {
      scope: {
        open: '=sidebarOpen',
        closed: '=sidebarClosed'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'views/sideBarContainer.template.html',
      replace:true,
      transclude:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs, transclude){
      scope.invertState = function(){
        scope.open = !scope.open;
        var time = (scope.open) ? 0 : 350;
        $timeout(function(){
            scope.closed = !scope.closed;
        }, time);
      };
    }
  }
  sideBarContainer.$inject = ['$timeout'];
}());

(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmDropDown', cmDropDown);

    /* @ngInject */
    function cmDropDown(){

        var directive = {
            link: link,
            restrict: 'E',
            require: '^cmFilter',
            templateUrl: 'views/cmDropDown.template.html',
            scope:{
                values: '=',
                placeHolder: '=',
                onselect: '&',
                model: '=',
                openUp: '@'
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs, controllerInstance){
                scope.optionSelected = function(val){
                scope.model = val;
                scope.placeHolder = val.name;
                scope.onselect(val);
            };
            scope.onselect = function(val){
              controllerInstance.onSelection(val);
            };
        }
    }
}());

(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmGrayDropDown', cmGrayDropDown);

    /* @ngInject */
    function cmGrayDropDown(){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'views/cmGreyDropDown.template.html',
            scope:{
                values: '=',
                placeHolder: '@',
                model: '=',
                onselect: '&',
                orderById: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
            scope.orderByAttr = (scope.orderById) ? 'id' : 'name';
            scope.optionSelected = function(value){
                scope.placeHolder = value.name;
                scope.model = value;
                scope.onselect({val: value});
            };
        }
    }
}());

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmFilter', cmFilter);

  /* @ngInject */
  function cmFilter($document){

    var directive = {
      scope: {
        heading: '@',
        selected: '=filterSelected',
        all: '=filterAll',
        placeHolder: '@',
        newSelected: '=',
        isLast: '@'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmFilter.template.html',
      replace:true,
      controller: cmFilterController
    };

    return directive;

    function cmFilterController($scope){
        var vm = this;
        vm.onSelection= function(value){
            value.isChecked = true;
            $scope.selected.push(value);
            $scope.isSelecting = false;
            var i = $scope.all.indexOf(value);
            if(i !== -1){
              $scope.all.splice(i, 1);
            }
        };
    }

    /////////////////////

    function link (scope, elem, attrs){
      scope.$watch(function(){
        if((scope.all !== undefined)){
          scope.allValuesEmpty = (scope.all.length <= 0);
        }
        if((scope.selected !== undefined)){
          scope.isSelectedEmpty = (scope.selected.length <= 0);
        }
      });
      scope.$on('SideFilterCleared', function(events, args){
          scope.isSelecting = false;
          scope.all = scope.selected.concat(scope.all);
          scope.selected = [];
      });
      scope.isSelecting = false;
      scope.addClicked = function(){
        scope.isSelecting = true;
      };
    }
  }
  cmFilter.$inject = ['$document'];
}());

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmSearch', cmSearch);

  /* @ngInject */
  function cmSearch($document){

    var directive = {
      scope: {
        heading: '@',
        searches: '=',
        showCharacters: '@'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmSearch.template.html',
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      scope.removeSearch = function(value){
        var i = scope.searches.indexOf(value);
        if(i !== -1){
          scope.searches.splice(i, 1);
        }
      };
    }
  }
  cmSearch.$inject = ['$document'];
}());

(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('timeLineEvent', timeLineEvent);

    /* @ngInject */
    function timeLineEvent($state){

        var directive = {
            link: link,
            restrict: 'E',
            //require: '^cmFilter',
            templateUrl: 'views/timeLineEvent.template.html',
            scope:{
                event: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope , elem, attrs){
            scope.goToDiscussion = function(){
                $state.go($state.$current.name,{
                    pageType: 'discussion',
                    expId: scope.event.id
                });
            };

        }
    }
    timeLineEvent.$inject = ['$state'];
}());


(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmTimeLine', cmTimeLine);

    /* @ngInject */
    function cmTimeLine($filter, $timeout){

        var directive = {
            link: link,
            restrict: 'E',
            //require: '^cmFilter',
            templateUrl: 'views/cmTimeLine.template.html',
            scope:{
                allEvent: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
            scope.allEvent = $filter('orderBy')(scope.allEvent, 'createdon', true);
            scope.timeLineleft = [];
            scope.timeLineRight = [];

            angular.forEach(scope.allEvent, function(event, key){
                if(key%2 === 0){
                    scope.timeLineleft.push(event);
                }else{
                    if(scope.timeLineRight.length === 0){
                        event.applyMargin = true;
                    }
                    scope.timeLineRight.push(event);
                }
            });
        }
    }
    cmTimeLine.$inject = ['$filter', '$timeout'];
}());


(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmFeedCard', cmFeedCard);

    /* @ngInject */
    function cmFeedCard($state){

        var directive = {
            link: link,
            restrict: 'E',
            require: '^cmFeedContainer',
            templateUrl: 'views/cmFeedCard.template.html',
            scope:{
                card: '=',
                type: '=',
                cardNumber: '='
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs, cmFeedContainerCtrl){
            scope.card.clicked = false;
            scope.isClicked = function(){
                cmFeedContainerCtrl.feedClicked(scope.cardNumber,scope.card);
                if(scope.type === 'messages'){

                }
            };
        }
    }
    cmFeedCard.$inject = ['$state'];
}());

(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('cmFeedContainer', cmFeedContainer);

    /* @ngInject */
    function cmFeedContainer(){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'views/cmFeedContainer.template.html',
            scope:{
                container: '=',
                cardType: '='
            },
            controller: function($scope, $filter){
                if($scope.cardType === 'feeds'){
                    $scope.orderCardsBy = '-createdon';
                }
                else{
                    $scope.orderCardsBy = 'displayname';
                }
                $scope.container.cards = $filter('orderBy')($scope.container.cards, $scope.orderCardsBy,false);
                var vm = this;
                vm.currentSelected = '';
                vm.feedClicked= function(cardNumber, card){
                    if(cardNumber === vm.currentSelected){
                        card.clicked = !card.clicked;
                    }
                    else{
                        card.clicked = true;
                        if(vm.currentSelected !== ''){
                            $scope.container.cards[vm.currentSelected].clicked = false;
                        }
                    }
                    vm.currentSelected = cardNumber;
                };
            },
            replace: true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){

        }
    }
}());

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
    SaveFilterDialog.$inject = ['$modalInstance'];
}());
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
    experienceInvitation.$inject = ['$modalInstance', 'experienceDetails', 'myExperience', '$state'];
}());
/**
 * @ngdoc directive
 * @name cmMessageExcerpt
 * @module app.widgets
 * @restrict E
 * @description Message Excerpt directive, example usage
 * <cm-message-excerpt message="vm.message""></cm-message-excerpt>
 * @param {object} message
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmMessageExcerpt', cmMessageExcerpt);

  /* @ngInject */
  function cmMessageExcerpt(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmMessageExcerpt.template.html',
      scope:{
        message: '=' ,
        eventHandler: '&ngClick'
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }
}());

/**
 * @ngdoc controller
 * @module app.message
 * @name mailItem
 * @description Controller for the mail Instance
 */
(function (){

  'use strict';

  angular
    .module('app.messages')
    .controller('mailItem', mailItem);

  /* @ngInject */

  function mailItem(messages, auth){
    var vm = this;
    init();
    vm.activeIndex = 0;

    /////////////////

    function init (){
      messages.findMessages().then(function(res){
        vm.messages = res.data;
        vm.activeMessage = vm.messages[vm.activeIndex];
        vm.messages[vm.activeIndex].isActive = true;
      });
    }

    vm.navNextMsg = function (){
      var activeIndex = findActiveIndex(vm.messages);
      if(activeIndex < vm.messages.length - 1){
        vm.activeIndex ++;
        vm.messages[activeIndex + 1].isActive = true;
        vm.activeMessage = vm.messages[vm.activeIndex];
      }
    };
    vm.getActiveMsg = function(){
      return vm.activeMessage;
    };

    vm.experienceInvite = function(id){
        console.log("running");
        auth.experienceInvitation(id);
    };

    vm.navPrevMsg = function (){
      //find the active message index
      //set it as inactive
      //set previous one as active
      var activeIndex = vm.activeIndex = findActiveIndex(vm.messages);
      if(activeIndex > 0){
        vm.activeIndex --;
        vm.messages[activeIndex - 1].isActive = true;
        vm.activeMessage = vm.messages[vm.activeIndex];
      }
    };

    function findActiveIndex(messages){
      var activeIndex = -1;
      _.forEach(vm.messages, function(message, idx, list){
        if(message.isActive){
          activeIndex = idx;
          message.isActive = false;
          return false;
        }
      });
      return activeIndex;
    }
  }
  mailItem.$inject = ['messages', 'auth'];
})();

(function(){
    'use strict';

    angular
        .module('app.modals')
        .factory('navigation', navigation);

    /* @ngInject */
    function navigation($state, $http){
        var isMarketingBannerVisible = ($state.$current.url.source === '/connections');
        var experienceDrawer = {
            pageType: '',
            expId: ''
        };
        var user = {};
        function getMarketingBannerStatus(){
            return isMarketingBannerVisible && ($state.$current.url.source === '/connections');
        }
        function hideMarketingBannner(config){
            isMarketingBannerVisible = false;
        }
        function returnCurrentStateName(){
            return $state.$current.name;
        }
        function markIsVisited(){
            $state.$current.isVisited = true;
        }
        function getUserSubNavNotification(){
            return $http.get('datastore/messageSubNavBar.json');
        }
        function setExpDrawerNavigation(pageType, expId){
            experienceDrawer.pageType = pageType;
            experienceDrawer.expId = expId;
        }

        function getExpDrawerNavigation(){
            return experienceDrawer;
        }

        function getUserDp(){
            return user;
        }

        function setUserDp(userData){
            user = userData;
        }

        var service = {
            isMarketingBannerVisible: isMarketingBannerVisible,
            hideMarketingBannner: hideMarketingBannner,
            getMarketingBannerStatus: getMarketingBannerStatus,
            returnCurrentStateName: returnCurrentStateName,
            markIsVisited: markIsVisited,
            getUserSubNavNotification: getUserSubNavNotification,
            setExpDrawerNavigation: setExpDrawerNavigation,
            getExpDrawerNavigation: getExpDrawerNavigation,
            getUserDp: getUserDp,
            setUserDp: setUserDp
        };
        return service;
    }
    navigation.$inject = ['$state', '$http'];
}());

/**
 * @ngdoc controller
 * @module app.myProfile
 * @name myProfile
 * @description Controller for my profile Info
 */
(function (){
    
  'use strict';

    angular
        .module('app.myProfile')
        .controller('myProfile', myProfile);

    /* @ngInject */
    function myProfile(navigation, $state, profileInfo, cmFilters, restApi){
        var vm = this;
        
        vm.referredList = [];
        vm.referredLoaded = false;
        vm.searchReferredList = searchReferredList;
        vm.editProfile = editProfile;
        vm.points = 0;
        init();
        function init (){
            vm.profile = navigation.getUserDp();
            vm.isBannerVisible = navigation.getMarketingBannerStatus;
            vm.languages = cmFilters.getFilterStringForm(vm.profile.languages);
            vm.subjects = cmFilters.getFilterStringForm(vm.profile.subjects);
            vm.searchReferredList();
        }
        function editProfile(){
            $state.go('shell.myProfile.view.edit');
        }
        function searchReferredList(){
            restApi.getReferredList(vm.profile._id, 1).then(function(res) {
                console.log(res)
                vm.referredList['referredList1'] = res.data.data.users;
                vm.referredList['referredListCount1'] = res.data.data.count;
                return restApi.getReferredList(vm.profile._id, 2);
            }).then(function(res) { 
                console.log(res)
                vm.referredList['referredList2'] = res.data.data.users;
                vm.referredList['referredListCount2'] = res.data.data.count;
                vm.points = (vm.referredList['referredListCount1']*800) + (vm.referredList['referredListCount2']*500);
                vm.referredLoaded = true;
            }).catch (function(err) {
                console.log(err)
            });
        }
    }
    myProfile.$inject = ['navigation', '$state', 'profileInfo', 'cmFilters', 'restApi'];
})();

/**
 * @ngdoc controller
 * @module app.myProfile
 * @name myProfile
 * @description Controller for edit my profile
 */
(function (){

  'use strict';

  angular
    .module('app.myProfile')
    .controller('profileEdit', profileEdit);

  /* @ngInject */
  function profileEdit(myProfile, navigation, profile, profileInfo, cmFiltersInfo, $state){
    var vm = this;
    init();

    function init (){
        vm.addingSubject = false;
        vm.addingLanguage = false;
        vm.profile = profileInfo;
        vm.profile.ages = vm.profile.ages.replace('-', ';');
        vm.ageGroupOptions = {
            from: 3,
            to: 50,
            floor: true,
            step: 1,
            vertical: false,
            callback: function(value, elt) {
            }
        };
        vm.languageFinished = false;
        vm.subjectFinished = false;
        vm.filterCriteria = cmFiltersInfo;
        vm.isBannerVisible = navigation.getMarketingBannerStatus;
        vm.addSubject = addSubject;
        vm.addLanguage = addLanguage;
        vm.subjectAdded  = subjectAdded;
        vm.languageAdded = languageAdded;
        vm.saveProfile = saveProfile;
    }
    function addSubject(){
        if(vm.filterCriteria[4].allValues.length>0){
            vm.addingSubject = true;
            if(vm.filterCriteria[4].allValues.length === 1){
                vm.subjectFinished = true;
            }
        }

    }
    function addLanguage(){
        if(vm.filterCriteria[2].allValues.length>0) {
            vm.addingLanguage = true;
            if(vm.filterCriteria[2].allValues.length === 1){
                vm.languageFinished = true;
            }
        }
    }
    function subjectAdded(val){
        vm.filterCriteria[4].allValues.splice(vm.filterCriteria[4].allValues.indexOf(val),1);
        vm.addingSubject = false;
        vm.profile.subjects.push(val);
    }
    function languageAdded(val){
        vm.filterCriteria[2].allValues.splice(vm.filterCriteria[2].allValues.indexOf(val),1);
        vm.addingLanguage = false;
        vm.profile.languages.push(val);
    }
    function saveProfile(){
        $state.go('^');
    }

  }
  profileEdit.$inject = ['myProfile', 'navigation', 'profile', 'profileInfo', 'cmFiltersInfo', '$state'];
})();

/**
 * @ngdoc factory
 * @module app.common
 * @name friendList
 * @description Encapsulates search friends suggestion logic
 */

(function(){
  'use strict';

  angular
    .module('app.common')
    .factory('friendList', friendList);

  /* @ngInject */
  function friendList($http){
    var service = {
      findFriends: findFriends
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name findFriends
     * @description HTTP GET request to fetch friend List data
     * @returns Returns a promise to the HTTP request
     */

    function findFriends (){
      return $http.get('datastore/searchList.json');
    }
  }
  friendList.$inject = ['$http'];
}());

/**
 * @ngdoc controller
 * @module app.messages
 * @name newMessage
 * @description Controller for the new message
 */

(function(){
  'use strict';

  angular
    .module('app.messages')
    .controller('newMessage', newMessage);

  /* @ngInject */
  function newMessage(friendList,$http){

    var vm = this;
    init();
    vm.selected = undefined;

    vm.loadCountries = function($query) {
      return $http.get('datastore/searchList.json', { cache: true}).then(function(response) {
        var friends = response.data.friendList;
        return friends.filter(function(friend) {
          return friend.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
      });
    };

    function init (){
    friendList.findFriends().then(function(res){
      vm.friendList = res.data.friendList;
      });
    }

}
newMessage.$inject = ['friendList', '$http'];})();

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
                    notificationsInfo: ['myConnections', function(myConnections){
                        return myConnections.getNotification().then(function(res){
                            return res.data;
                        });
                    }]
                },
                views: {
                    'subNavBar@shell': {
                        templateUrl: 'views/messageSubNavBar.html',
                        controller: 'messageSubNavBar as vm'
                    } ,
                    'topNavBar@shell': {
                        templateUrl: 'views/messageTopNavBar.html'
                    },
                    'content@shell':{
                        templateUrl: 'views/myConnections.template.html',
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
                    connectionInfo: ['myConnections', function(myConnections){
                        return myConnections.getConnections().then(function(res){
                            return res.data;
                        });
                    }]
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'views/myConnections.connections.template.html',
                        controller: 'myConnectionsConnected as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'views/myConnections.actionBar.template.html',
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
                    requestInfo: ['myConnections', function(myConnections){
                        return myConnections.getRequest().then(function(res){
                            return res.data;
                        });
                    }]
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'views/myConnections.connections.template.html',
                        controller: 'myConnectionsRequest as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'views/myConnections.actionBar.template.html',
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
                    outgoingInfo: ['myConnections', function(myConnections){
                        return myConnections.getOutgoing().then(function(res){
                            return res.data;
                        });
                    }]
                },
                views:{
                    'connections@shell.myConnections':{
                        templateUrl: 'views/myConnections.connections.template.html',
                        controller: 'myConnectionsOutgoing as vm'
                    },
                    'actionBar@shell.myConnections':{
                        templateUrl:'views/myConnections.actionBar.template.html',
                        controller: 'myConnectionsTab as vm'
                    }
                }
            });
    }
    configuration.$inject = ['$stateProvider'];
}());

/**
 * @ngdoc factory
 * @module app.connections
 * @name myConnection
 * @description Encapsulates My Connection logic
 */

(function(){
  'use strict';

  angular
    .module('app.myConnections')
    .factory('myConnections', _myConnections);

  /* @ngInject */
  function _myConnections($http){
    var service = {
        getNotification: getNotification,
        getConnections: getConnections,
        getRequest: getRequest,
        getOutgoing: getOutgoing
    };

    return service;

    ////////////////////

    /**
     * @ngdoc method
     * @name findMyConnection
     * @description HTTP GET request to fetch profiles data
     * @returns Returns a promise to the HTTP request
     */
    function getNotification (){
        return $http.get('datastore/myconnectionnotifications.json');
    }
    function getConnections (){
        return $http.get('datastore/myconnections.json');
    }
    function getRequest(){
        return $http.get('datastore/myconnectionsrequest.json');
    }
    function getOutgoing(){
        return $http.get('datastore/myconnectionsoutgoing.json');
    }
  }
  _myConnections.$inject = ['$http'];
}());

/**
 * @ngdoc controller
 * @module app.connections
 * @name MyConnection
 * @description Controller for the myConnections
 */

(function () {
  'use strict';

  angular
    .module('app.myConnections')
    .controller('myConnections', myConnections)
    .controller('myConnectionsTab', myConnectionsTab)
    .controller('myConnectionsConnected', myConnectionsConnected)
    .controller('myConnectionsRequest', myConnectionsRequest)
    .controller('myConnectionsOutgoing', myConnectionsOutgoing);

  /* @ngInject */
  function myConnections($state) {
    $state.go('shell.myConnections.connected');
  }
  myConnections.$inject = ['$state'];

  /* @ngInject */
  function myConnectionsTab(notificationsInfo, $state, navigation, $rootScope) {

    var vm = this;
    vm.row = $state.$current.self.rowDisplay;
    vm.navStates = [];
    init();
    function init() {
      $state.get()
        .forEach(function (state) {
          if (state.myConnectionNav === 'myConnections') {
            state.notificationCount = notificationsInfo[state.jsonName];
            state.isSubActiveTab = false;
            if (navigation.returnCurrentStateName() === (state.name)) {
              state.isSubActiveTab = true;
            }
            vm.navStates.push(state);
          }
        });
      vm.rowDisplay = rowDisplay;
    }

    /* @ngInject */
    function rowDisplay(val) {
      vm.row = val;
      $state.$current.self.rowDisplay = val;
      $rootScope.$broadcast('myConnectionsDisplayChanged');
    }
    rowDisplay.$inject = ['val'];
  }
  myConnectionsTab.$inject = ['notificationsInfo', '$state', 'navigation', '$rootScope'];

  /* @ngInject */
  function myConnectionsConnected(navigation, $state, connectionInfo, $scope, cmFilters) {
    var vm = this;
    navigation.markIsVisited();
    vm.row = $state.$current.self.rowDisplay;
    vm.myConnections = connectionInfo[$state.$current.self.jsonName];
    cmFilters.convertProfilesArrayToString(vm.myConnections);
    vm.title = $state.$current.self.myConnectionNavTitle;
    $scope.$on('myConnectionsDisplayChanged', function () {
      vm.row = $state.$current.self.rowDisplay;
    });
  }
  myConnectionsConnected.$inject = ['navigation', '$state', 'connectionInfo', '$scope', 'cmFilters'];

  /* @ngInject */
  function myConnectionsRequest(navigation, $state, requestInfo, $scope, cmFilters) {
    var vm = this;
    navigation.markIsVisited();
    vm.row = $state.$current.self.rowDisplay;
    vm.title = $state.$current.self.myConnectionNavTitle;
    vm.myConnections = requestInfo[$state.$current.self.jsonName];
    cmFilters.convertProfilesArrayToString(vm.myConnections);
    $scope.$on('myConnectionsDisplayChanged', function () {
      vm.row = $state.$current.self.rowDisplay;
    });
  }
  myConnectionsRequest.$inject = ['navigation', '$state', 'requestInfo', '$scope', 'cmFilters'];

  /* @ngInject */
  function myConnectionsOutgoing(navigation, $state, outgoingInfo, $scope, cmFilters) {
    var vm = this;
    navigation.markIsVisited();
    vm.row = $state.$current.self.rowDisplay;
    vm.title = $state.$current.self.myConnectionNavTitle;
    vm.myConnections = outgoingInfo[$state.$current.self.jsonName];
    cmFilters.convertProfilesArrayToString(vm.myConnections);
    $scope.$on('myConnectionsDisplayChanged', function () {
      vm.row = $state.$current.self.rowDisplay;
    });
  }
  myConnectionsOutgoing.$inject = ['navigation', '$state', 'outgoingInfo', '$scope', 'cmFilters'];
})();

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
                    timeLine: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getTimeLine().then(function(res){
                            return res.data.timeline;
                        });
                    }],
                    notification: ['experienceDrawer', function(experienceDrawer){
                      return experienceDrawer.getSideBarNotification().then(function(res){
                          return res.data.notifications;
                      });
                    }],
                    pageType: ['$stateParams', 'navigation', function($stateParams, navigation){
                        if($stateParams.pageType === ''){
                            var expInfo  = navigation.getExpDrawerNavigation();
                            return expInfo.pageType;
                        }
                        navigation.setExpDrawerNavigation($stateParams.pageType,$stateParams.expId)
                        return $stateParams.pageType;
                    }],
                    expId: ['$stateParams', 'navigation', function($stateParams, navigation){
                        if($stateParams.pageType === '' && $stateParams.expId === ''){
                            var expInfo  = navigation.getExpDrawerNavigation();
                            return expInfo.expId;
                        }
                        return $stateParams.expId;
                    }]
                },
                views:{
                    '@': {
                        templateUrl:'views/oneNavShell.html',
                        controller: 'oneNavShell as vm'
                    } ,
                    'topNavBar@shell.experienceDrawer': {
                        templateUrl: 'views/dropDownCrossNavBar.html'
                    },
                    'content@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawer.html',
                        controller: 'experienceDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.participants', {
                url: '',
                navIndex: 0,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getSideBarParticipants().then(function(res){
                            return res.data.participants;
                        });
                    }],
                    cardType: function(){return 'participants';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.feeds', {
                url: '',
                navIndex: 1,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getSideBarFeeds().then(function(res){
                            return res.data.feeds;
                        });
                    }],
                    cardType: function(){return 'feeds';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.messages', {
                url: '',
                navIndex: 2,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getSideBarMessages().then(function(res){
                            return res.data.messages;
                        });
                    }],
                    cardType: function(){return 'messages';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawerSideBar.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.info', {
                url: '',
                navIndex: 3,
                oneNavBarType: 'dropDownCrossNav',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    data: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getSideBarExpInfo().then(function(res){
                            return res.data;
                        });
                    }],
                    cardType: function(){return 'info';}
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawerInfo.template.html',
                        controller: 'sideBarControllerExpDrawer as vm'
                    }
                }
            }).state('shell.experienceDrawer.chats',{
                url:'/:messageId',
                resolve: {
                    experienceDrawer: 'experienceDrawer',
                    cardType: function(){return 'chats';},
                    data: ['experienceDrawer', '$stateParams', function(experienceDrawer, $stateParams){
                        return experienceDrawer.getSideBarMessagesChat($stateParams.messageId).then(
                            function(res){
                                return res.data.chats;
                            }
                        );
                    }]
                },
                views:{
                    'sideBar@shell.experienceDrawer':{
                        templateUrl: 'views/experienceDrawerSideBar.template.html',
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
                        templateUrl:'views/oneNavShell.html',
                        controller: 'oneNavShell as vm'
                    } ,
                    'topNavBar@shell.addParticipants': {
                        templateUrl: 'views/progressCrossNavBar.html'
                    },
                    'content@shell.addParticipants':{
                        templateUrl: 'views/addParticipant.template.html',
                        controller: 'addParticipants as vm'
                    }
                },
                resolve:{
                    experienceDrawer: 'experienceDrawer',
                    students: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getAddParticipantStudents().then(
                            function(res){
                                return res.data.students;
                            }
                        );
                    }],
                    teachers: ['experienceDrawer', function(experienceDrawer){
                        return experienceDrawer.getAddParticipantTeachers().then(
                            function(res){
                                return res.data.teachers;
                            }
                        );
                    }]
                }
            });
    }
    configuration.$inject = ['$stateProvider'];
}());

(function(){
    'use strict';

    angular
        .module('app.experienceDrawer')
        .factory('experienceDrawer', experienceDrawer);

    /* @ngInject */
    function experienceDrawer($http){

        var expanded = false;

        function getExpanded(){

          return expanded;
        }

        function setExpanded(toggle){

          expanded = toggle;
        }

        function getTimeLine(experienceId){
            return $http.get('datastore/timeline.json');
        }
        function getSideBarNotification(experienceId){
            return $http.get('datastore/experiencedrawernotification.json');
        }

        function getSideBarFeeds(experienceId){
            return $http.get('datastore/experienceDrawerFeeds.json');
        }

        function getSideBarParticipants(experienceId){
            return $http.get('datastore/experienceDrawerParticipants.json');
        }

        function getSideBarExpInfo(experienceId){
            return $http.get('datastore/experienceDrawerInfo.json');
        }

        function getSideBarMessages(){
            return $http.get('datastore/experienceDrawerMessages.json');
        }

        function getSideBarMessagesChat(messageId){
            return $http.get('datastore/experienceDrawerChats.json');
        }

        function getAddParticipantTeachers(){
            return $http.get('datastore/addParticipantTeachers.json');
        }

        function getAddParticipantStudents(){
            return $http.get('datastore/addParticipantStudents.json');
        }

        function findStudentsByName(name){
            return $http.get('datastore/addParticipantStudentByName.json');
        }

        function findTeacherByName(name){
            return $http.get('');
        }

        function populateDiscussionBoard(){
          return $http.get('datastore/discussion.json');

        }

        var service = {
            getTimeLine: getTimeLine,
            getSideBarNotification: getSideBarNotification,
            getSideBarFeeds: getSideBarFeeds,
            getSideBarParticipants: getSideBarParticipants,
            getSideBarExpInfo: getSideBarExpInfo,
            getSideBarMessages: getSideBarMessages,
            getSideBarMessagesChat: getSideBarMessagesChat,
            getAddParticipantTeachers: getAddParticipantTeachers,
            getAddParticipantStudents: getAddParticipantStudents,
            findStudentsByName: findStudentsByName,
            findTeacherByName: findTeacherByName,
            populateDiscussionBoard : populateDiscussionBoard,
            setExpanded : setExpanded,
            getExpanded : getExpanded
        };

        return service;
    }
    experienceDrawer.$inject = ['$http'];
}());


(function(){
    'use strict';

    angular
        .module('app.experienceDrawer')
        .controller('experienceDrawer', experienceDrawer)
        .controller('sideBarControllerExpDrawer', sideBarControllerExpDrawer);

    function sideBarControllerExpDrawer(data, cardType){
        var vm = this;
        vm.sideBarContent = data;
        vm.cardType = cardType;
    }
    sideBarControllerExpDrawer.$inject = ['data', 'cardType'];

    /* @ngInject */
    function experienceDrawer(pageType,expId, timeLine, notification, experienceDrawer, $state , $location, $anchorScroll, navigation){
        var vm = this;
        vm.sideBarTabs = [];
        vm.options = {
          height: 125,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
          ]
        };

        init();
        /////////////////////
        function init(){
            vm.expanded = true;
            vm.userDp = navigation.getUserDp();
            vm.pageType = pageType;
            vm.expId = expId;
            vm.timeLine = timeLine;
            vm.sideFilterOpen = true;
            vm.sideFilterClosed = false;
            vm.notification = notification;
            vm.goToAddParticipant = goToAddParticipant;
            vm.goToDiscussion = goToDiscussion;
            vm.sideBarTabs.push(new sideBarTab ('Participants', vm.notification.participants,'shell.experienceDrawer.participants' ,'', vm.goToAddParticipant,true));
            vm.sideBarTabs.push(new sideBarTab ('The Feed', vm.notification.feeds,'shell.experienceDrawer.feeds','cm-feeds',  undefined, false));
            vm.sideBarTabs.push(new sideBarTab ('Messages', vm.notification.messages,'shell.experienceDrawer.messages' ,'cm-messages',  vm.goToChats, true));
            vm.sideBarTabs.push(new sideBarTab ('Experience Information', vm.notification.info,'shell.experienceDrawer.info','cm-expInfo',  undefined, false));
            vm.activeSideBarIndex= $state.current.navIndex;
            vm.sideBarHeading = vm.sideBarTabs[vm.activeSideBarIndex].title;
            vm.sideBarButtonVisible = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonVisible;
            vm.sideBarButtonClick = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonClick;
            vm.sideBarButtonClass = vm.sideBarTabs[vm.activeSideBarIndex].iconClass;
            vm.sideBarTabs[vm.activeSideBarIndex].active = true;
        }

        vm.goToPostDiscussion = function(){
          console.log("post");
          $state.go($state.$current.name,{
            pageType: 'post',
            expId: expId
          });

        };

        vm.gotoBottom = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
            var old = $location.hash();
            $location.hash('bottomEnd');
            $anchorScroll();
            $location.hash(old);
      };

        function goToDiscussion(expId){
            $state.go($state.$current.name,{
                pageType: 'timeLine',
                expId: expId
            });
        }

        vm.getExpand = function(){
            return experienceDrawer.getExpanded();
        };

        vm.setExpand = function(bool){
            experienceDrawer.setExpanded(bool);
        };

        function goToAddParticipant(){

            $state.go('shell.addParticipants');
        }



        function sideBarTab(title, notification, state, iconClass, headingButtonClick, headingButtonVisible , active) {
            var tab = this;
            tab.title = title;
            tab.notification = notification;
            tab.state = state;
            tab.iconClass = iconClass;
            tab.active = active || false;
            tab.isVisited = false;
            tab.headingButtonClick = headingButtonClick;
            tab.headingButtonVisible = headingButtonVisible;
            tab.clicked = function(tab){
                tab.isVisited = true;
                tab.active = true;
                vm.sideBarTabs[vm.activeSideBarIndex].active = false;
                vm.activeSideBarIndex = vm.sideBarTabs.indexOf(tab);
                vm.sideBarHeading = vm.sideBarTabs[vm.activeSideBarIndex].title;
                vm.sideBarButtonVisible = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonVisible;
                vm.sideBarButtonClick = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonClick;
                vm.sideBarButtonClass = vm.sideBarTabs[vm.activeSideBarIndex].iconClass;
                $state.go(tab.state);
            };
        }

    }
    experienceDrawer.$inject = ['pageType', 'expId', 'timeLine', 'notification', 'experienceDrawer', '$state', '$location', '$anchorScroll', 'navigation'];
})(window.angular);

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
  createExpSubNavBar.$inject = ['$rootScope', 'pgsBarService', '$state'];

}());

/**
 * @ngdoc directive
 * @name cmExpInvites
 * @module app.widgets
 * @restrict E
 * @description Experience invites that shows up on edit experience page, example usage
 * <cm-exp-invites invite="vm.invite""></cm-exp-invites>
 * @param {object} invite
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmExpInvites', cmExpInvitesTag);

  /* @ngInject */
  function cmExpInvitesTag(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmExperienceInvitationTag.template.html',
      scope:{
        invite: '='
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }
}());

(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('cmDiscussion', cmDiscussion);

    /* @ngInject */
    function cmDiscussion($location, $anchorScroll, experienceDrawer){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'views/cmDiscussion.template.html',
            scope:{
                discussionId: '=',
                expand: '='
            },
            replace:true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
              experienceDrawer.populateDiscussionBoard(scope.discussionId).then(function(res) {
              scope.discussion = res.data.discussion;
              scope.comments = res.data.comments;
              scope.timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
              scope.goToBottom = function(){
                var old = $location.hash();
                $location.hash('discussionEnd');
                $anchorScroll();
                $location.hash(old);
              };
            });

          scope.expandCommentBox = function(){

            experienceDrawer.setExpanded(true);


          }
        }
    }
    cmDiscussion.$inject = ['$location', '$anchorScroll', 'experienceDrawer'];
}());

/**
 * @ngdoc directive
 * @name app.common.directive:onFileChange
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

(function () {

  'use strict';

  angular
    .module('app.common')
    .directive('onFileChange', onFileChange);

  /* @ngInject */
  function onFileChange() {

    return {
      link: link,
      restrict: 'A'
    };

    /////////////////////

    function link(scope, elem, attrs) {
      var onChangeHandler = scope.$eval(attrs.onFileChange);
      elem.bind('change', onChangeHandler);
    }
  }

}());

(function () {
    'use strict';
    angular
        .module('app.experienceDrawer')
        .controller('addParticipants', addParticipants);
    /* @ngInject */

    function addParticipants(students, teachers, experienceDrawer, $scope , $state) {
        var vm = this;
        vm.studentSearchText = '';
        $scope.$watch('vm.studentSearchText', function() {
            if(vm.studentSearchText.length === 0){
                vm.studentSearching = false;
            }
        });
        vm.teacherSearchText = '';
        vm.students = students;
        vm.teachers = teachers;
        vm.studentSelected = [];
        vm.teacherSelected = [];
        vm.studentInviteList = [];
        vm.teacherInviteList = [];
        vm.studentSearching = false;
        vm.teacherSearching = false;
        vm.matchedStudent = [];
        vm.matchedTeacher = [];
        vm.accountCreated = false;
        vm.accountCreatedTitle = '';
        vm.creatingAccount = false;
      vm.progressCrossNavClosePrevState ='';
        vm.newStudent = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            dob: {
                month: '',
                date: '',
                year: ''
            }
        };
        vm.months = [
            {
                id: 1,
                name: 'Jan'
            },
            {
                id: 2,
                name: 'Feb'
            },
            {
                id: 3,
                name: 'Mar'
            },
            {
                id: 4,
                name: 'Apr'
            },
            {
                id: 5,
                name: 'May'
            },
            {
                id: 6,
                name: 'Jun'
            },
            {
                id: 7,
                name: 'Jul'
            },
            {
                id: 8,
                name: 'Aug'
            },
            {
                id: 9,
                name: 'Sep'
            },
            {
                id: 10,
                name: 'Oct'
            },
            {
                id: 11,
                name: 'Nov'
            },
            {
                id: 12,
                name: 'Dec'
            }
        ];
        vm.startYear = 1970;
        vm.endYear = (new Date()).getFullYear();
        var i;
        vm.days = [];
        vm.years = [];
        for(i=1; i<=31;i++){
            vm.days.push(new Option(i, i));
        }
        for(i=vm.startYear; i<=vm.endYear; i++){
            vm.years.push(new Option(i,i));
        }
        function Option(id, name){
            this.id = id;
            this.name = name;
        }

        vm.connectionSelected = function(connection, selectedList){
            if(connection.disabled){
                return;
            }
            if(connection.isSelected === undefined || !connection.isSelected){
                connection.isSelected = true;
                selectedList.push(connection);
                connection.border = 'cm-selected';
            }
            else if(connection.isSelected){
                connection.isSelected = false;
                selectedList.splice(selectedList.indexOf(connection),1);
                connection.border = '';
            }
        };
        vm.addSelected = function(selected, inviteList){
            var conn;
            while(selected.length > 0){
                conn = selected.pop();
                conn.border = '';
                inviteList.push( JSON.parse(JSON.stringify(conn)));
                conn.disabled = true;
            }
        };

        vm.searchStudent = function(){
            if(vm.studentSearchText.length>0){
                vm.studentSearching = true;
                experienceDrawer.findStudentsByName(name).then(function(res){
                    vm.matchedStudent =  res.data.students;
                });
            }
        };
      vm.sendInviteClick = function () {
          if(vm.studentInviteList.length !== 0 || vm.teacherInviteList.length !== 0){
            vm.progressCrossNavClosePrevState =  (typeof($state.$current.oneNavBarClosePrevState) !== undefined)? $state.$current.oneNavBarClosePrevState : '^';
            if(vm.progressCrossNavClosePrevState === '') {
              vm.progressCrossNavClosePrevState = 'shell.connections';
            }
            $state.go(vm.progressCrossNavClosePrevState);

          }
      };

        vm.createStudentAccount = function(){
            vm.studentSearchText = '';
            vm.accountCreated = true;
            vm.accountCreatedTitle = vm.newStudent.firstName + ' ' + vm.newStudent.lastName;
            vm.creatingAccount = false;
            vm.studentSearching = false;
        };

        vm.searchTeacher = function(){
            if(name.length>0){
                vm.teacherSearching = true;
                experienceDrawer.findTeacherByName(name).then(function(res){
                    vm.matchedTeacher =  res.data.teachers;
                });
            }
        };

        vm.stopSearchStudent = function(){
            vm.studentSearching = false;
            vm.studentSearchText = '';
        };

        vm.stopSearchTeacher = function(){
            vm.teacherSearching = false;
            vm.teacherSearchText = '';
        };
    }
    addParticipants.$inject = ['students', 'teachers', 'experienceDrawer', '$scope', '$state'];


})();

/**
 * @ngdoc controller
 * @name app.myProfile.controller:ParentDashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.myProfile')
		.controller('ParentDashboard', ParentDashboard);

  /* @ngInject */
	function ParentDashboard(dashboardData){
		var vm = this;
        vm.data = dashboardData;


        


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.myProfile.controller:ParentDashboard
     * @description
     * My Description rules
     */

	}
	ParentDashboard.$inject = ['dashboardData'];

}());

/**
 * @ngdoc directive
 * @name cmPostDiscussion
 * @module app.widgets
 * @restrict E
 * @description Directive for post new discussion
 * <cm-post-discussion></cm-post-discussion>
 * @param {}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmPostDiscussion', cmPostDiscussion);

  /* @ngInject */
  function cmPostDiscussion($state){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmPostDiscussion.template.html',
      scope:{

      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      scope.cancelPost = function (){

        $state.go($state.$current.name,{
          pageType: 'timeLine',
          expId: 1
        });

      }
    }
  }
  cmPostDiscussion.$inject = ['$state'];
}());

/**
 * @ngdoc directive
 * @name cmCountWords
 * @module app.widgets
 * @restrict E
 * @description Directive for counting words
 * <cm-word-count words="vm.words"></cm-word-count>
 * @param {object}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmWordCount', cmWordCount);

  /* @ngInject */
  function cmWordCount(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmCountWords.template.html',
      scope:{
        words : "="
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.log("this is the link function of the directive");
      scope.countOf = function (text) {
        var maxWords = 100;
        var s = text ? text.split(/\s+/) : ''; // it splits the text on space/tab/enter
        return s ? maxWords-s.length : '100';
      };
    }
  }
}());

/**
 * @ngdoc directive
 * @name cmCountChars
 * @module app.widgets
 * @restrict E
 * @description Directive for counting remaining Characters
 * <cm-char-count chars="vm.chars"></cm-char-count>
 * @param {object}
 */
(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmCharCount', cmCharCount);

  /* @ngInject */
  function cmCharCount(){

    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'views/cmCountChars.template.html',
      scope:{
        chars : "="
      },
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      console.log("this is the link function of the directive");
      scope.countCharOf = function (text) {
        var maxChar = 100;
        var sChar = text ? text : '';
        return sChar ? maxChar - sChar.length : '100';
      };
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('app.registerUser', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
      .state('shell.registerUser', {
        url: '/registerUser',
        title: 'Afiliacion',
        nav: 'subNavMessage',
        navTitle: 'Register an User',
        navOrder: 1,
        resolve: {
           allFilters: ['cmFilters', function(cmFilters){
               return cmFilters.returnFilterCriteria();
           }]
        },
        views: {
          'content@shell': {
            templateUrl: 'views/registerUser.html',
            controller: 'registerUser as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'views/messageSubNavBar.html',
            controller: 'messageSubNavBar as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'views/topNavBar.html',
            controller: 'TopNavBar as vm'
          }
        }
      })
  }
  configuration.$inject = ['$stateProvider', '$httpProvider'];
}());

(function(){
    'use strict';

    angular
        .module('app.registerUser')
        .factory('registerUser', registerUser);

    /* @ngInject */
    function registerUser($http){

        function getSingleExperience(experienceId){
            return $http.get('datastore/singleExperience.json');
        }
        function getExperiences(userId){
            return $http.get('datastore/myExperiences.json');
        }

        function getExperienceInviteList(){
            return $http.get('datastore/profiles.json');
        }

        var service = {
            getExperiences: getExperiences,
            getSingleExperience: getSingleExperience,
            getExperienceInviteList: getExperienceInviteList
        };

        return service;
    }
    registerUser.$inject = ['$http'];
}());

/**
 * @ngdoc controller
 * @module app.registerUser
 * @name registerUser
 * @description Controller for the register Users
 */

(function() {
    'use strict';

    angular
            .module('app.registerUser')
            .controller('registerUser', registerUser);

    /* @ngInject */
    function registerUser($scope, $state, registerUser, $stateParams, $location, allFilters, dataCollections, restApi, navigation, auth) {
        //vars
        var vm = this;
        vm.profile = navigation.getUserDp();
        vm.stateUrl = $state.current.name;
        console.log(vm.stateUrl)
        vm.idTypeCollection = dataCollections.getIdTypeCollection();
        vm.civilStatusCollection = dataCollections.getCivilStatusCollection();
        vm.countryCollection = dataCollections.getCountryCollection();
        vm.cellphoneTypeCollection = dataCollections.getCellphoneTypeCollection();
        vm.houseTypeCollection = dataCollections.getHouseTypeCollection();
        vm.cityCollection = dataCollections.getCityCollection();
        vm.user = {
            _id: '',
            firstName: '',
            displayName: '',
            lastName: '',
            dob: '',
            civilStatus: '',
            weight: '',
            height: '',
            email: '',
            cellphone: '',
            phone: '',
            location: {
                address1: '',
                address2: '',
                country: '',
                state: '',
                city: '',
                zip: '',
                houseType: '',
            },
            bussiness: {
                profession: '',
                job: '',
                company: '',
                salary: ''
            },
            extraData: {
                car: {
                    mark: '',
                    model: '',
                    year: ''
                }
            },
            membership: {
                referredId: '',
                pay: {
                    date: '',
                    transferId: '',
                    bankName: '',
                    amount: ''
                },
            },
        };

        vm.country = vm.countryCollection[0];
        vm.referredIdType = vm.idTypeCollection[0];
        vm.referredNumberId = '';
        vm.format = 'dd-MMMM-yyyy';

        //functions
        vm.setCity = setCity;
        vm.createMembership = createMembership;
        vm.saveProfile = saveProfile;
        vm.loadSelectList = loadSelectList;
        vm.setListValues = setListValues;

        vm.dobToday = function() {
            vm.user.dob = new Date();
        };

        vm.dobClear = function() {
            vm.user.dob = null;
        };

        vm.payToday = function() {
            vm.user.membership.pay.date = new Date();
        };

        vm.payClear = function() {
            vm.user.membership.pay.date = null;
        };

        vm.dobOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dobOpened = true;
        };

        vm.payOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.payOpened = true;
        };


        function init() {
            vm.user = _.merge(vm.user, _.pick(vm.profile, _.keys(vm.user)))
            vm.user.userId = vm.user._id;
            delete vm.user._id;
            if (vm.user.membership)
                vm.loadSelectList();
            console.log(vm.user)
        }
        function loadSelectList() {
            vm.civilStatus = _.find(vm.civilStatusCollection, function(o) {
                return o.id === vm.user.civilStatus;
            });
            vm.country = _.find(vm.countryCollection, function(o) {
                return o.id === vm.user.location.country;
            });
            vm.houseType = _.find(vm.houseTypeCollection, function(o) {
                return o.id === vm.user.location.houseType;
            });
            vm.referredIdType = _.find(vm.idTypeCollection, function(o) {
                return o.id === vm.user.membership.referredId.split("-")[0]
            });
            vm.cellphoneType = _.find(vm.cellphoneTypeCollection, function(o) {
                return o.id === vm.user.cellphone.split("-")[0];
            });
            vm.cellphoneNumber = Number((vm.user.cellphone.split("-"))[1]);
            if(vm.user.phone.split("-")[0] != "null")
                vm.phoneType = Number(vm.user.phone.split("-")[0]);
            if(vm.user.phone.split("-")[1] != "null")
                vm.phoneNumber = Number(vm.user.phone.split("-")[1]);
            

            dataCollections.getStateCollection().then(function(res, err) {
                vm.stateCollection = res.data;
                vm.state = _.find(vm.stateCollection, function(o) {
                    return o.estado === vm.user.location.state;
                });
                if (vm.state) {
                    vm.setCity(vm.state);
                    vm.city = vm.user.location.city;
                }
            });

        }
        function setListValues() {
            vm.user.civilStatus = vm.civilStatus.id;
            vm.user.location.country = vm.country.id;
            vm.user.location.state = vm.state.estado;
            vm.user.location.city = vm.city;
            vm.user.location.houseType = vm.houseType.id;
            vm.user.cellphone = vm.cellphoneType.id + '-' + vm.cellphoneNumber;
            vm.user.phone = vm.phoneType + '-' + vm.phoneNumber;
            if (vm.stateUrl === 'shell.registerUser')
                vm.user.membership.referredId = vm.referredIdType.id + '-' + vm.referredNumberId;
        }
        function setCity(state) {
            dataCollections.setCityCollection(state);
            vm.cityCollection = dataCollections.getCityCollection();
            vm.city = vm.cityCollection[0];
        }
        function createMembership(form) {
            if (vm.stateUrl === 'shell.registerUser') {
                if (form.$valid) {
                    vm.setListValues();
                    restApi.updateUserProfile(vm.user).then(function(res) {
                        console.log(res)
                        return restApi.createMembership(vm.user)
                    }).then(function(res) {
                        navigation.setUserDp(res.data.data.user);
                        $state.go('shell.myProfile.view');
                    }). catch (function(err) {
                        auth.showMessage('Hay un error en los Datos ingresados');
                        console.log(err)
                    });
                } else {
                    _.forEach(form.$error.required, function(field) {
                        field.$setDirty();
                    });
                    angular.element("[name='" + form.$name + "']").find('.ng-invalid:first').prev().find('input').focus();
                    angular.element("[name='" + form.$name + "']").find('.ng-invalid:visible:first').focus();
                }
            }
        }
        function saveProfile(form) {
            if (form.$valid) {
                vm.setListValues();
                restApi.updateUserProfile(vm.user).then(function(res) {
                    navigation.setUserDp(res.data.data.user);
                    $state.go('shell.myProfile.view');
                    console.log(res)
                }). catch (function(err) {
                    console.log(err)
                });
            }
            else {
                _.forEach(form.$error.required, function(field) {
                    field.$setDirty();
                });
                angular.element("[name='" + form.$name + "']").find('.ng-invalid:first').prev().find('input').focus();
                angular.element("[name='" + form.$name + "']").find('.ng-invalid:visible:first').focus();
            }
        }
        init();
    }
    registerUser.$inject = ['$scope', '$state', 'registerUser', '$stateParams', '$location', 'allFilters', 'dataCollections', 'restApi', 'navigation', 'auth'];
})();

(function() {
    'use strict';

    angular
            .module('app')
            .factory('restApi', restApi);

    /* @ngInject */
    function restApi($http) {

        var serverUrl = config.restApi.protocol + '://' + config.restApi.host + config.restApi.port + '/' + config.restApi.apiPath;
        var service = {
            //profile
            getUserProfile: getUserProfile,
            updateUserProfile: updateUserProfile,
            //membership
            createMembership: createMembership,
            getReferredList: getReferredList
        };

        return service;

        function getUserProfile(_id) {
            return $http.get(serverUrl + '/profile/' + _id);
        }
        function updateUserProfile(user) {
            return $http.post(serverUrl + '/profile/update', user);
        }
        function createMembership(user) {
            return $http.post(serverUrl + '/membership/create', user);
        }
        function getReferredList(userId, level) {
            return $http.get(serverUrl + '/membership/referredUsers/' + userId + '/' + level);
        }




    }
    restApi.$inject = ['$http'];
}());

var config = {};

config.app = {
    service: 'GC',
};
config.restApi = {
    protocol: 'https',
    port: '',
    host: 'enigmatic-retreat-79806.herokuapp.com',
    apiPath: 'api',
    authPath: 'auth'
}


(function() {
    'use strict';

    angular
            .module('app')
            .factory('dataCollections', dataCollections);

    /* @ngInject */
    function dataCollections($http) {
        var idTypeCollection = [
            {"id": "V", "name": "V"},
            {"id": "E", "name": "E"},
            {"id": "J", "name": "J"},
            {"id": "G", "name": "G"}
        ];
        var civilStatusCollection = [
            {"id": "S", "name": "Soltero(a)"},
            {"id": "C", "name": "Casado(a)"},
            {"id": "V", "name": "Viudo(a)"},
            {"id": "X", "name": "Concubino"}
        ];
        var cityCollection = [];
        var countryCollection = [
            {"id": "Venezuela", "name": "Venezuela"}
        ];
        var houseTypeCollection = [
            {"id": "Propia", "name": "Propia"},
            {"id": "Alquilada", "name": "Alquilada"}
        ];
        var cellphoneTypeCollection = [
            {"id": "0416", "name": "0416"},
            {"id": "0426", "name": "0426"},
            {"id": "0412", "name": "0412"},
            {"id": "0414", "name": "0414"},
            {"id": "0424", "name": "0424"}
        ];
        var service = {
            getIdTypeCollection: getIdTypeCollection,
            getCivilStatusCollection: getCivilStatusCollection,
            getStateCollection: getStateCollection,
            getCountryCollection: getCountryCollection,
            getHouseTypeCollection: getHouseTypeCollection,
            getCellphoneTypeCollection: getCellphoneTypeCollection,
            getCityCollection: getCityCollection,
            setCityCollection: setCityCollection
        };

        return service;
        //getters
        function getIdTypeCollection() {
            return idTypeCollection;
        }
        function getCivilStatusCollection() {
            return civilStatusCollection;
        }
        function getCountryCollection() {
            return countryCollection;
        }
        function getCityCollection() {
            return cityCollection;
        }
        function getStateCollection() {
            return $http.get('datastore/venezuela.json');
        }
        function getHouseTypeCollection() {
            return houseTypeCollection;
        }
        function getCellphoneTypeCollection() {
            return cellphoneTypeCollection;
        }
        
        //setters
        function setCityCollection(state) {
            cityCollection = state.ciudades;
            console.log(state)
        }
    }
    dataCollections.$inject = ['$http'];
}());

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
    messageModal.$inject = ['$modalInstance', '$state', '$stateParams', 'cmDialog', '$window', 'extraData'];
}());
/**
 * Satellizer 0.11.3
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular.module('satellizer', [])
    .constant('satellizer.config', {
      httpInterceptor: true,
      loginOnSignup: true,
      baseUrl: '/',
      loginRedirect: '/',
      logoutRedirect: '/',
      signupRedirect: '/login',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      loginRoute: '/login',
      signupRoute: '/signup',
      tokenRoot: false,
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      unlinkUrl: '/auth/unlink/',
      unlinkMethod: 'get',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      withCredentials: true,
      platform: 'browser',
      storage: 'localStorage',
      providers: {
        google: {
          name: 'google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 452, height: 633 }
        },
        facebook: {
          name: 'facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          requiredUrlParams: ['nonce','display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 }
        },
        linkedin: {
          name: 'linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: { width: 527, height: 582 }
        },
        github: {
          name: 'github',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        yahoo: {
          name: 'yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: { width: 559, height: 519 }
        },
        twitter: {
          name: 'twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          type: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        live: {
          name: 'live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 500, height: 560 }
        }
      }
    })
    .provider('$auth', ['satellizer.config', function(config) {
      Object.defineProperties(this, {
        httpInterceptor: {
          get: function() { return config.httpInterceptor; },
          set: function(value) { config.httpInterceptor = value; }
        },
        loginOnSignup: {
          get: function() { return config.loginOnSignup; },
          set: function(value) { config.loginOnSignup = value; }
        },
        baseUrl: {
          get: function() { return config.baseUrl; },
          set: function(value) { config.baseUrl = value; }
        },
        logoutRedirect: {
          get: function() { return config.logoutRedirect; },
          set: function(value) { config.logoutRedirect = value; }
        },
        loginRedirect: {
          set: function(value) { config.loginRedirect = value; },
          get: function() { return config.loginRedirect; }
        },
        signupRedirect: {
          get: function() { return config.signupRedirect; },
          set: function(value) { config.signupRedirect = value; }
        },
        loginUrl: {
          get: function() { return config.loginUrl; },
          set: function(value) { config.loginUrl = value; }
        },
        signupUrl: {
          get: function() { return config.signupUrl; },
          set: function(value) { config.signupUrl = value; }
        },
        loginRoute: {
          get: function() { return config.loginRoute; },
          set: function(value) { config.loginRoute = value; }
        },
        signupRoute: {
          get: function() { return config.signupRoute; },
          set: function(value) { config.signupRoute = value; }
        },
        tokenRoot: {
          get: function() { return config.tokenRoot; },
          set: function(value) { config.tokenRoot = value; }
        },
        tokenName: {
          get: function() { return config.tokenName; },
          set: function(value) { config.tokenName = value; }
        },
        tokenPrefix: {
          get: function() { return config.tokenPrefix; },
          set: function(value) { config.tokenPrefix = value; }
        },
        unlinkUrl: {
          get: function() { return config.unlinkUrl; },
          set: function(value) { config.unlinkUrl = value; }
        },
        authHeader: {
          get: function() { return config.authHeader; },
          set: function(value) { config.authHeader = value; }
        },
        authToken: {
          get: function() { return config.authToken; },
          set: function(value) { config.authToken = value; }
        },
        withCredentials: {
          get: function() { return config.withCredentials; },
          set: function(value) { config.withCredentials = value; }
        },
        unlinkMethod: {
          get: function() { return config.unlinkMethod; },
          set: function(value) { config.unlinkMethod = value; }
        },
        platform: {
          get: function() { return config.platform; },
          set: function(value) { config.platform = value; }
        },
        storage: {
          get: function() { return config.storage; },
          set: function(value) { config.storage = value; }
        }
      });

      angular.forEach(Object.keys(config.providers), function(provider) {
        this[provider] = function(params) {
          return angular.extend(config.providers[provider], params);
        };
      }, this);

      var oauth = function(params) {
        config.providers[params.name] = config.providers[params.name] || {};
        angular.extend(config.providers[params.name], params);
      };

      this.oauth1 = function(params) {
        oauth(params);
        config.providers[params.name].type = '1.0';
      };

      this.oauth2 = function(params) {
        oauth(params);
        config.providers[params.name].type = '2.0';
      };

      this.$get = [
        '$q',
        'satellizer.shared',
        'satellizer.local',
        'satellizer.oauth',
        function($q, shared, local, oauth) {
          var $auth = {};

          $auth.authenticate = function(name, userData) {
            return oauth.authenticate(name, false, userData);
          };

          $auth.login = function(user, redirect) {
            return local.login(user, redirect);
          };

          $auth.signup = function(user) {
            return local.signup(user);
          };

          $auth.logout = function(redirect) {
            return shared.logout(redirect);
          };

          $auth.isAuthenticated = function() {
            return shared.isAuthenticated();
          };

          $auth.link = function(name, userData) {
            return oauth.authenticate(name, true, userData);
          };

          $auth.unlink = function(provider) {
            return oauth.unlink(provider);
          };

          $auth.getToken = function() {
            return shared.getToken();
          };

          $auth.setToken = function(token, redirect) {
            shared.setToken({ access_token: token }, redirect);
          };

          $auth.removeToken = function() {
            return shared.removeToken();
          };

          $auth.getPayload = function() {
            return shared.getPayload();
          };

          $auth.setStorage = function(type) {
            return shared.setStorage(type);
          };

          return $auth;
        }];

    }])
    .factory('satellizer.shared', [
      '$q',
      '$window',
      '$location',
      'satellizer.config',
      'satellizer.storage',
      function($q, $window, $location, config, storage) {
        var shared = {};
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

        shared.getToken = function() {
          return storage.get(tokenName);
        };

        shared.getPayload = function() {
          var token = storage.get(tokenName);

          if (token && token.split('.').length === 3) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
          }
        };

        shared.setToken = function(response, redirect) {
          var accessToken = response && response.access_token;
          var token;

          if (accessToken) {
            if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
              response = accessToken;
            } else if (angular.isString(accessToken)) {
              token = accessToken;
            }
          }

          if (!token && response) {
            token = config.tokenRoot && response.data[config.tokenRoot] ?
              response.data[config.tokenRoot][config.tokenName] : response.data[config.tokenName];
          }

          if (!token) {
            var tokenPath = config.tokenRoot ? config.tokenRoot + '.' + config.tokenName : config.tokenName;
            throw new Error('Expecting a token named "' + tokenPath + '" but instead got: ' + JSON.stringify(response.data));
          }

          storage.set(tokenName, token);

          if (config.loginRedirect && !redirect) {
            $location.path(config.loginRedirect);
          } else if (redirect && angular.isString(redirect)) {
            $location.path(encodeURI(redirect));
          }
        };

        shared.removeToken = function() {
          storage.remove(tokenName);
        };

        shared.isAuthenticated = function() {
          var token = storage.get(tokenName);

          if (token) {
            if (token.split('.').length === 3) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              var exp = JSON.parse($window.atob(base64)).exp;
              if (exp) {
                return Math.round(new Date().getTime() / 1000) <= exp;
              }
              return true;
            }
            return true;
          }
          return false;
        };

        shared.logout = function(redirect) {
          storage.remove(tokenName);

          if (config.logoutRedirect && !redirect) {
            $location.url(config.logoutRedirect);
          }
          else if (angular.isString(redirect)) {
            $location.url(redirect);
          }

          return $q.when();
        };

        shared.setStorage = function(type) {
          config.storage = type;
        };

        return shared;
      }])
    .factory('satellizer.oauth', [
      '$q',
      '$http',
      'satellizer.config',
      'satellizer.utils',
      'satellizer.shared',
      'satellizer.Oauth1',
      'satellizer.Oauth2',
      function($q, $http, config, utils, shared, Oauth1, Oauth2) {
        var oauth = {};

        oauth.authenticate = function(name, redirect, userData) {
          var provider = config.providers[name].type === '1.0' ? new Oauth1() : new Oauth2();
          var deferred = $q.defer();

          provider.open(config.providers[name], userData || {})
            .then(function(response) {
              shared.setToken(response, redirect);
              deferred.resolve(response);
            })
            .catch(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        };

        oauth.unlink = function(provider) {
          var unlinkUrl =  config.baseUrl ? utils.joinUrl(config.baseUrl, config.unlinkUrl) : config.unlinkUrl;

          if (config.unlinkMethod === 'get') {
            return $http.get(unlinkUrl + provider);
          } else if (config.unlinkMethod === 'post') {
            return $http.post(unlinkUrl, provider);
          }
        };

        return oauth;
      }])
    .factory('satellizer.local', [
      '$q',
      '$http',
      '$location',
      'satellizer.utils',
      'satellizer.shared',
      'satellizer.config',
      function($q, $http, $location, utils, shared, config) {
        var local = {};

        local.login = function(user, redirect) {
          var loginUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, config.loginUrl) : config.loginUrl;
          return $http.post(loginUrl, user)
            .then(function(response) {
              shared.setToken(response, redirect);
              return response;
            });
        };

        local.signup = function(user) {
          var signupUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, config.signupUrl) : config.signupUrl;
          return $http.post(signupUrl, user)
            .then(function(response) {
              if (config.loginOnSignup) {
                shared.setToken(response);
              } else if (config.signupRedirect) {
                $location.path(config.signupRedirect);
              }
              return response;
            });
        };

        return local;
      }])
    .factory('satellizer.Oauth2', [
      '$q',
      '$http',
      '$window',
      'satellizer.popup',
      'satellizer.utils',
      'satellizer.config',
      'satellizer.storage',
      function($q, $http, $window, popup, utils, config, storage) {
        return function() {

          var defaults = {
            url: null,
            name: null,
            state: null,
            scope: null,
            scopeDelimiter: null,
            clientId: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
          };

          var oauth2 = {};

          oauth2.open = function(options, userData) {
            angular.extend(defaults, options);

            var stateName = defaults.name + '_state';

            if (angular.isFunction(defaults.state)) {
              storage.set(stateName, defaults.state());
            } else if (angular.isString(defaults.state)) {
              storage.set(stateName, defaults.state);
            }

            var url = defaults.authorizationEndpoint + '?' + oauth2.buildQueryString();

            var openPopup;
            if (config.platform === 'mobile') {
              openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).eventListener(defaults.redirectUri);
            } else {
              openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).pollPopup();
            }

            return openPopup.then(function(oauthData) {
              if (defaults.responseType === 'token') {
                return oauthData;
              }
              if (oauthData.state && oauthData.state !== storage.get(stateName)) {
                return $q.reject('OAuth 2.0 state parameter mismatch.');
              }
              return oauth2.exchangeForToken(oauthData, userData);
            });

          };

          oauth2.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, {
              code: oauthData.code,
              clientId: defaults.clientId,
              redirectUri: defaults.redirectUri
            });

            if (oauthData.state) {
              data.state = oauthData.state;
            }

            angular.forEach(defaults.responseParams, function(param) {
              data[param] = oauthData[param];
            });

            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          oauth2.buildQueryString = function() {
            var keyValuePairs = [];
            var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

            angular.forEach(urlParams, function(params) {

              angular.forEach(defaults[params], function(paramName) {
                var camelizedName = utils.camelCase(paramName);
                var paramValue = angular.isFunction(defaults[paramName]) ? defaults[paramName]() : defaults[camelizedName];

                if (paramName === 'state') {
                  var stateName = defaults.name + '_state';
                  paramValue = encodeURIComponent(storage.get(stateName));
                }

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                  paramValue = paramValue.join(defaults.scopeDelimiter);

                  if (defaults.scopePrefix) {
                    paramValue = [defaults.scopePrefix, paramValue].join(defaults.scopeDelimiter);
                  }
                }

                keyValuePairs.push([paramName, paramValue]);
              });
            });

            return keyValuePairs.map(function(pair) {
              return pair.join('=');
            }).join('&');
          };

          return oauth2;
        };
      }])
    .factory('satellizer.Oauth1', [
      '$q',
      '$http',
      'satellizer.popup',
      'satellizer.config',
      'satellizer.utils',
      function($q, $http, popup, config, utils) {
        return function() {

          var defaults = {
            url: null,
            name: null,
            popupOptions: null,
            redirectUri: null,
            authorizationEndpoint: null
          };

          var oauth1 = {};

          oauth1.open = function(options, userData) {
            angular.extend(defaults, options);
            var popupWindow;
            var serverUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;

            if (config.platform !== 'mobile') {
              popupWindow = popup.open('', defaults.name, defaults.popupOptions, defaults.redirectUri);
            }

            return $http.post(serverUrl, defaults)
              .then(function(response) {
                if (config.platform === 'mobile') {
                  popupWindow = popup.open([defaults.authorizationEndpoint, oauth1.buildQueryString(response.data)].join('?'), defaults.name, defaults.popupOptions, defaults.redirectUri);
                } else {
                  popupWindow.popupWindow.location = [defaults.authorizationEndpoint, oauth1.buildQueryString(response.data)].join('?');
                }

                var popupListener = config.platform === 'mobile' ? popupWindow.eventListener(defaults.redirectUri) : popupWindow.pollPopup();

                return popupListener.then(function(response) {
                  return oauth1.exchangeForToken(response, userData);
                });
              });

          };

          oauth1.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, oauthData);
            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          oauth1.buildQueryString = function(obj) {
            var str = [];

            angular.forEach(obj, function(value, key) {
              str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });

            return str.join('&');
          };

          return oauth1;
        };
      }])
    .factory('satellizer.popup', [
      '$q',
      '$interval',
      '$window',
      '$location',
      'satellizer.config',
      'satellizer.utils',
      function($q, $interval, $window, $location, config, utils) {
        var popup = {};
        popup.url = '';
        popup.popupWindow = null;

        popup.open = function(url, windowName, options, redirectUri) {
          popup.url = url;

          var stringifiedOptions = popup.stringifyOptions(popup.prepareOptions(options || {}));

          popup.popupWindow = window.open(url, windowName, stringifiedOptions);

          if (popup.popupWindow && popup.popupWindow.focus) {
            popup.popupWindow.focus();
          }

          return popup;
        };

        popup.eventListener = function(redirectUri) {
          var deferred = $q.defer();

          popup.popupWindow.addEventListener('loadstart', function(event) {
            if (event.url.indexOf(redirectUri) !== 0) { return; }

            var parser = document.createElement('a');
            parser.href = event.url;

            if (parser.search || parser.hash) {
              var queryParams = parser.search.substring(1).replace(/\/$/, '');
              var hashParams = parser.hash.substring(1).replace(/\/$/, '');
              var hash = utils.parseQueryString(hashParams);
              var qs = utils.parseQueryString(queryParams);

              angular.extend(qs, hash);

              if (qs.error) {
                deferred.reject({ error: qs.error });
              } else {
                deferred.resolve(qs);
              }

              popup.popupWindow.close();
            }
          });

          popup.popupWindow.addEventListener('exit', function() {
            deferred.reject({ data: 'Provider Popup was closed' });
          });

          popup.popupWindow.addEventListener('loaderror', function() {
            deferred.reject({ data: 'Authorization Failed' });
          });

          return deferred.promise;
        };

        popup.pollPopup = function() {
          var polling;
          var deferred = $q.defer();

          polling = $interval(function() {
            try {
              var documentOrigin = document.location.host;
              var popupWindowOrigin = popup.popupWindow.location.host;

              if (popupWindowOrigin === documentOrigin && (popup.popupWindow.location.search || popup.popupWindow.location.hash)) {
                var queryParams = popup.popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = popup.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = utils.parseQueryString(hashParams);
                var qs = utils.parseQueryString(queryParams);

                angular.extend(qs, hash);

                if (qs.error) {
                  deferred.reject({ error: qs.error });
                } else {
                  deferred.resolve(qs);
                }

                popup.popupWindow.close();
                $interval.cancel(polling);
              }
            } catch (error) {}

            if (!popup.popupWindow) {
              $interval.cancel(polling);
              deferred.reject({ data: 'Provider Popup Blocked' });
            } else if (popup.popupWindow.closed || popup.popupWindow.closed === undefined) {
              $interval.cancel(polling);
              deferred.reject({ data: 'Authorization Failed' });
            }
          }, 35);

          return deferred.promise;
        };

        popup.prepareOptions = function(options) {
          var width = options.width || 500;
          var height = options.height || 500;
          return angular.extend({
            width: width,
            height: height,
            left: $window.screenX + (($window.outerWidth - width) / 2),
            top: $window.screenY + (($window.outerHeight - height) / 2.5)
          }, options);
        };

        popup.stringifyOptions = function(options) {
          var parts = [];
          angular.forEach(options, function(value, key) {
            parts.push(key + '=' + value);
          });
          return parts.join(',');
        };

        return popup;
      }])
    .service('satellizer.utils', function() {
      this.camelCase = function(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
      };

      this.parseQueryString = function(keyValue) {
        var obj = {}, key, value;
        angular.forEach((keyValue || '').split('&'), function(keyValue) {
          if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
          }
        });
        return obj;
      };

      this.joinUrl = function(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
          return url;
        }

        var joined = [baseUrl, url].join('/');

        var normalize = function(str) {
          return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
        };

        return normalize(joined);
      };
    })
    .factory('satellizer.storage', ['satellizer.config', function(config) {
      switch (config.storage) {
        case 'localStorage':
          if ('localStorage' in window && window['localStorage'] !== null) {
            return {
              get: function(key) { return localStorage.getItem(key); },
              set: function(key, value) { return localStorage.setItem(key, value); },
              remove: function(key) { return localStorage.removeItem(key); }
            };
          } else {
            console.warn('Warning: Local Storage is disabled or unavailable. Satellizer will not work correctly.');
            return {
              get: function(key) { return undefined; },
              set: function(key, value) { return undefined; },
              remove: function(key) { return undefined; }
            };
          }
          break;

        case 'sessionStorage':
          if ('sessionStorage' in window && window['sessionStorage'] !== null) {
            return {
              get: function(key) { return sessionStorage.getItem(key); },
              set: function(key, value) { return sessionStorage.setItem(key, value); },
              remove: function(key) { return sessionStorage.removeItem(key); }
            };
          } else {
            console.warn('Warning: Session Storage is disabled or unavailable. Satellizer will not work correctly.');
            return {
              get: function(key) { return undefined; },
              set: function(key, value) { return undefined; },
              remove: function(key) { return undefined; }
            };
          }
          break;
      }
    }])
    .factory('satellizer.interceptor', [
      '$q',
      'satellizer.config',
      'satellizer.storage',
      'satellizer.shared',
      function($q, config, storage, shared) {
        return {
          request: function(request) {
            if (request.skipAuthorization) {
              return request;
            }
             if (shared.isAuthenticated() && config.httpInterceptor) {
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              var token = storage.get(tokenName);

              if (config.authHeader && config.authToken) {
                token = config.authToken + ' ' + token;
              }

              request.headers[config.authHeader] = token;
            }

            return request;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('satellizer.interceptor');
    }]);

})(window, window.angular);
;
angular.module('templates-htmlmin', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('views/customTemplate.html',
    '<div class=cm-recipientSuggestions><div class="cm-recipientBlock form-control"><figure class=cm-userImg><img alt="" src={{match.model.picture}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-recipientName bind-html-unsafe="match.label | typeaheadHighlight:query"></div><img alt="" class=cm-flag src={{match.model.flag}}></div></div>');
  $templateCache.put('views/modals/experienceInvitationDialog.html',
    '<div class=modal-header><button type=button class="close cm-closePopup" ng-click=vm.close() aria-label=Close></button></div><div class=modal-body><h4 class=modal-title>You’ve been invited to</h4><div class=cm-popupForm><div class=cm-expCard><img class=cm-expImg ng-src={{vm.experience.image}} alt=""><div class=cm-expDetails><figure class=cm-userImg><img alt="" ng-src={{vm.experience.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-expTitle>Horse Racing Project</div><div class=cm-expDuration>{{vm.experience.startdate | date:\'MMM d, yyyy\'}} — {{vm.experience.enddate | date:\'MMM d, yyyy\' }}</div></div></div><div class=text-center><button type=submit class="btn cm-btn">Accept</button> <button type=button ng-click=vm.close() class="btn cm-btn cm-cancelBtn">Decline</button></div></div></div>');
  $templateCache.put('views/modals/forgotPasswordDoneModal.html',
    '<div class=modal-body><div class=cm-modalTitle>Thank You!</div><p class=cm-modalDesc>An email has been sent with the username(s) and/or signin associated with that account.</p></div>');
  $templateCache.put('views/modals/forgotPasswordModal.html',
    '<div class=modal-body ng-class="{\'showBody\':vm.showForgotPasswordText,\'hideBody\':!vm.showForgotPasswordText}"><div class=cm-modalTitle>Trouble signing in?</div><p class=cm-modalDesc>To reset your password or retrieve your username, please use the form below. We’ll send you an email with your username or a link to reset your password.</p><br><form name=forgotPassword novalidate class=cm-form ng-model-options="{debounce: {default: 10, blur: 0, submit: 0 }}"><div class=form-group><label for=cm-username>Enter your username <strong>or</strong> email</label><div class=cm-formControlWrap><input name=email required ng-model=vm.user.username class=form-control id=cm-username placeholder="" cm-field-valid></div></div><div style="margin:20px 0 0 0" class=text-center><button type=submit ng-disabled=forgotPassword.$invalid class="btn cm-cmBtn cm-btnMd" ng-click="vm.setActiveState(\'forgotPasswordDone\')">Submit</button></div><br></form></div>');
  $templateCache.put('views/modals/inviteConnectionDialog.html',
    '<div class=modal-header><button type=button class="close cm-closePopup" ng-click=vm.close() aria-label=Close></button></div><div class=modal-body><h4 class=modal-title>Invite {{vm.connetiondisplayName}} to Connect</h4><div class=cm-popupForm><div class=form-group><label for=inviteMsg>Include a personal note. <span>(editable)</span></label><textarea class=form-control id=inviteMsg>I\'d like to add you to my professional network in ePals.</textarea></div><div class=text-center><button type=submit class="btn cm-btn">Send Invite</button></div></div></div>');
  $templateCache.put('views/modals/loginModal.html',
    '<div class=modal-body cm-modal-window-class="{\'queryClass\':\'cm-modal\', \'cm-modalSmall\': vm.size, \'cm-modalLarge\': !vm.size}"><div class=cm-animate-if ng-if="vm.showOnState(\'signUp\')" ng-include="\'views/modals/signUpModal.html\'"></div><div class=cm-animate-if ng-if="vm.showOnState(\'signIn\')" ng-include="\'views/modals/signInModal.html\'"></div><div class=cm-animate-if ng-if="vm.showOnState(\'forgotPassword\')" ng-include="\'views/modals/forgotPasswordModal.html\'"></div><div class=cm-animate-if ng-if="vm.showOnState(\'forgotPasswordDone\')" ng-include="\'views/modals/forgotPasswordDoneModal.html\'"></div><div class=cm-animate-if ng-if="vm.showOnState(\'signUpStudent\')" ng-include="\'views/modals/signUpStudentModal.html\'"></div></div><div class="modal-footer cm-greyModalFooter" ng-if="vm.showOnState(\'signIn\')"><p class=cm-animate-if ng-if="vm.showOnState(\'signIn\')">si no eres miembro?&nbsp;&nbsp;<a ng-click="vm.setActiveState(\'signUp\')">Registrate</a></p></div><div class="modal-footer cm-greyModalFooter" ng-if="vm.showOnState(\'signUp\')"><p class=cm-animate-if ng-if="vm.showOnState(\'signUp\') || vm.showOnState(\'signUpAll\')">ya eres miembro?&nbsp;&nbsp;<a ng-click="vm.setActiveState(\'signIn\')">Entrar</a></p></div><div class="modal-footer cm-blueModalFooter" ng-if="vm.showOnState(\'forgotPassword\')" ng-class="{\'showBody\':vm.showForgotPasswordText,\'hideBody\':!vm.showForgotPasswordText}"><div class=cm-question>Was your account registered<br>by a teacher or parent?</div><div class=cm-note>If so, you\'ll need to contact the person in charge of your account to retrieve your username.</div></div><div class="modal-footer cm-blueModalFooter" ng-if="vm.showOnState(\'forgotPasswordDone\')"><div class=cm-note>If you do not receive the email, please check your email program\'s Spam or Bulk folders. Insure that you always get email from epals by adding <a>support@epals.com</a> in your address book.</div></div>');
  $templateCache.put('views/modals/messageModal.html',
    '<div class=modal-header><button type=button class="close cm-closePopup" ng-click=vm.close() aria-label=Close></button></div><div class=modal-body><div class=cm-popupForm><div class="form-group text-center"><h1 class=modal-title style="max-width: 300px;margin:0 auto">{{vm.message}}</h1></div></div></div>');
  $templateCache.put('views/modals/saveFilterDialog.html',
    '<div class=modal-header><button type=button class="close cm-closePopup" ng-click=vm.close() aria-label=Close></button></div><div class=modal-body><h4 class=modal-title>Save this Search</h4><div class=cm-popupForm><div class=form-group><label for=searchName>Name this search. <span>(30 characters max)</span></label><input type=text class=form-control id=searchName></div><div class=text-center><button type=submit class="btn cm-btn">Save Search</button></div></div></div>');
  $templateCache.put('views/modals/signInModal.html',
    '<div class=cm-modalTitle><span>Entrar</span></div><div class="clearfix cm-doublePanelModalSection"><div><form name=signIn novalidate><div class=cm-form><div class=form-group><label for=cm-username>Cedula</label><div class=cm-formControlWrap><div class=input-group><div class=input-group-btn><ui-select name=idType on-select="" ng-model=vm.idType class=cm-customSelectFilter><ui-select-match>{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.idTypeCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select></div><input name=id pattern=[0-9]* required type=text class=form-control id=cm-ci ng-model=vm.idNumber ng-minlength=6 cm-field-valid><ng-messages for=signIn.id.$error ng-if=signIn.id.$dirty><div ng-message=minlength>Cédula muy corta</div><div ng-message=required>Ingrese su Cédula</div><div ng-message=pattern>Cédula Inválida</div></ng-messages></div></div></div><div class=form-group><label for=cm-password>Contraseña</label><div class=cm-formControlWrap><input name=password required type=password class=form-control id=cm-password ng-model=vm.user.password ng-minlength=6 cm-field-valid><ng-messages for=signIn.password.$error ng-if=signIn.password.$dirty><div ng-message=minlength>Contraseña demasiado corta</div><div ng-message=required>Ingrese una Contraseña</div></ng-messages></div></div><br></div><br><div class=cm-btnLinkAlign><button type=submit class="btn cm-cmBtn cm-btnMd" ng-click=vm.login()>Iniciar</button></div></form></div></div>');
  $templateCache.put('views/modals/signUpModal.html',
    '<div class=cm-modalTitle><span>Registro</span></div><div class="clearfix cm-doublePanelModalSection"><div><form name=signUp novalidate><div class=cm-form><div class=form-group><label for=cm-ci>Cedula</label><div class=cm-formControlWrap><div class=input-group><div class=input-group-btn><ui-select name=idType on-select="" ng-model=vm.idType class=cm-customSelectFilter><ui-select-match>{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.idTypeCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select></div><input name=id required type=text pattern=[0-9]* class=form-control id=cm-username ng-model=vm.idNumber ng-minlength=6 cm-field-valid><ng-messages for=signUp.id.$error ng-if=signUp.id.$dirty><div ng-message=minlength>Cédula muy corta</div><div ng-message=required>Ingrese su Cédula</div><div ng-message=pattern>Cédula Inválida</div></ng-messages></div></div></div><div class=form-group><label for=cm-firstName>Nombres</label><div class=cm-formControlWrap><input name=firstName required type=text class=form-control id=cm-firstName ng-model=vm.user.firstName ng-minlength=6 cm-field-valid><ng-messages for=signUp.firstName.$error ng-if=signUp.firstName.$dirty><div ng-message=minlength>Nombre muy corto</div><div ng-message=required>Ingrese su Nombre</div></ng-messages></div></div><div class=form-group><label for=cm-lastName>Apellidos</label><div class=cm-formControlWrap><input name=lastName required type=text class=form-control id=cm-lastName ng-model=vm.user.lastName ng-minlength=6 cm-field-valid><ng-messages for=signUp.lastName.$error ng-if=signUp.lastName.$dirty><div ng-message=minlength>Apellido muy corto</div><div ng-message=required>Ingrese su Apellido</div></ng-messages></div></div><div class=form-group><label for=cm-Email>Correo</label><div class=cm-formControlWrap><input name=userEmail required ng-pattern=/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i class=form-control ng-maxlength=254 id=cm-Email ng-model=vm.user.email cm-field-valid><ng-messages for=signUp.userEmail.$error ng-if=signUp.userEmail.$dirty><div ng-message=pattern>Correo Electrónico inválido</div><div ng-message=required>Ingrese su Correo Electrónico</div></ng-messages></div></div><div class=form-group><label for=cm-password>Contraseña</label><div class=cm-formControlWrap><input name=password required type=password class=form-control id=cm-password ng-model=vm.user.password ng-minlength=6 cm-field-valid><ng-messages for=signUp.password.$error ng-if=signUp.password.$dirty><div ng-message=minlength>Contraseña demasiado corta</div><div ng-message=required>Ingrese una Contraseña</div></ng-messages></div></div><div class=form-group><label for=cm-passwordconfirm>Confirmar Contraseña</label><div class=cm-formControlWrap><input name=confirmPassword required type=password ui-validate="\'$value===vm.user.password\'" ui-validate-watch="\'vm.user.password\'" class=form-control id=cm-passwordconfirm ng-model=vm.user.confirmPassword cm-field-valid><ng-messages for=signUp.confirmPassword.$error ng-if=signUp.confirmPassword.$dirty><div ng-message=validator>Las contraseñas no coinciden</div></ng-messages></div></div><br><button type=submit class="btn cm-cmBtn cm-btnMd" ng-click=vm.signUp()>Registrarse</button></div></form></div></div>');
  $templateCache.put('views/modals/signUpStudentModal.html',
    '<div class=cm-modalTitle>Become a Member</div><br><div class=cm-form><form name=signUpStudent novalidate><div class="form-group cm-done"><label for=cm-username>Choose Avatar and Username</label><div class="clearfix cm-usernameAvatar"><div class=cm-avatarSelect><div class=cm-dropdownAvatarWrap><a class=cm-dropdownToggle ng-click=vm.showList() ng-class="{\'open\': vm.showAvatarList}"><figure class=cm-userImg><img alt="" ng-src={{vm.user.profileAvatar}} class="cm-userImgDp cm-userImgSm"><div class=cm-avatarSelectOverlay><i class="fa fa-angle-down"></i></div></figure></a><div ng-show=vm.showAvatarList class="cm-avatarDropdown cm-greyBorderCard"><div class=cm-avatarListing><figure ng-repeat="item in vm.data.slice(((vm.currentPage-1)*vm.itemsPerPage), ((vm.currentPage)*vm.itemsPerPage))" class=cm-userImg><img src={{item.image}} ng-click=vm.updateUserImg(item) class="cm-userImgDp cm-userImgSm"></figure></div><pagination total-items=vm.totalItems ng-model=vm.currentPage ng-change=vm.pageChanged() class="pagination-sm cm-selectAvatarPagi" items-per-page=40></pagination></div></div></div><div class=cm-inputUsername><div class=cm-formControlWrap><input name=username ng-model=vm.user.username required type=text placeholder="" class=form-control cm-field-valid><ng-messages for=signUpStudent.username.$error ng-if=signUpStudent.username.$dirty><div ng-message=required>A valid username is required</div></ng-messages></div></div></div></div><div class="form-group cm-done"><label>Choose Password</label><div class=cm-formControlWrap><input name=password type=password required ng-minlength=5 placeholder="Must be at least 5 characters..." class=form-control ng-model=vm.user.password cm-field-valid><ng-messages for=signUpStudent.password.$error ng-if=signUpStudent.password.$dirty><div ng-message=required>A valid password is required</div><div ng-message=minlength>Your password is too short</div></ng-messages></div></div><div class=form-group><label>Date of Birth</label><div class="row cm-row"><div class="col-sm-4 cm-column"><label class=sr-only>Month</label><cm-gray-drop-down model=vm.user.dob.month order-by-id=true place-holder={{vm.months[0].name}} values=vm.months></cm-gray-drop-down></div><div class="col-sm-4 cm-column"><label class=sr-only>Date</label><cm-gray-drop-down model=vm.user.dob.date place-holder={{vm.days[0].name}} values=vm.days></cm-gray-drop-down></div><div class="col-sm-4 cm-column"><label class=sr-only>Year</label><cm-gray-drop-down model=vm.user.dob.year place-holder={{vm.years[0].name}} values=vm.years></cm-gray-drop-down></div></div></div><br><br><div class=text-center><button class="btn cm-cmBtn cm-btnMd" ng-click="">Back</button> <button class="btn cm-cmBtn cm-btnMd" ng-disabled=!signUpStudent.$valid>Next <i class=cm-arrowGlyph></i></button></div></form></div>');
  $templateCache.put('views/home.html',
    '<div class="container cm-mainContainer"><article class=cm-sideBarContentWrapper><side-bar-container sidebar-open=vm.sideFilterOpen sidebar-closed=vm.sideFilterClosed><div class=cm-sideBarHeader><div class=cm-sideBarTitle ng-click=vm.invertSavedSearchDisplay()>Filter <i class="fa fa-angle-down"></i> <span ng-if=vm.showSavedSearches class="glyphicon glyphicon-triangle-top cm-saveSearchPresetsArrow"></span></div><div class=cm-filterOptions><a class=cm-filterOptionsBtn ng-click=vm.saveFilter()>Save</a> <a class=cm-filterOptionsBtn ng-click=vm.clearAllFilter()>Clear All</a></div></div><div class=cm-saveSearchMain ng-scrollbars ng-if="vm.showSavedSearches && vm.sideFilterOpen"><div class=cm-saveSearchPresetsWrapper><cm-search ng-repeat="search in vm.searches" heading={{search.heading}} searches=search.list show-characters={{search.showCharacters}}></cm-search></div></div><div class=cm-sideBarBody ng-scrollbars><cm-filter ng-repeat="filter in vm.filterCriteria" heading={{filter.heading}} ng-if=filter.inSideBar filter-selected=filter.selectedValues filter-all=filter.allValues place-holder={{filter.placeHolder}}></cm-filter><div style=height:150px></div></div></side-bar-container><div class="cm-mainContentArea cm-bubblesBg cm-bgDGreen" ng-class="{\'cm-sideBarOpen\': vm.sideFilterOpen }"><section class=cm-contentActionBar><div class=cm-miniLabel><span class=totalCount>{{vm.totalCount}} Results </span>// Filter or Search to Refine Results</div><div class=cm-changeViewOptions><div class=btn-group><a class=cm-listView ng-model=vm.connectionLayout btn-radio="\'list\'" ng-change=vm.setConnectionsLayout(vm.connectionLayout)><span class="glyphicon glyphicon-th-list"></span> </a><a class=cm-GridView ng-model=vm.connectionLayout btn-radio="\'grid\'" ng-change=vm.setConnectionsLayout(vm.connectionLayout)><span class="glyphicon glyphicon-th-large"></span></a></div></div><div class="cm-sortByOptions form-inline clearfix"><div class=form-group><label for=cm-sortSelect>Sort by</label><ui-select id=cm-sortSelect class=cm-customSelectActionBar ng-model=vm.selectedSort on-select=vm.onSort($select.selected.value)><ui-select-match>{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="criteria in vm.sortCriteria"><span ng-bind=criteria.name></span></ui-select-choices></ui-select></div><a class=cm-sortBtn ng-click=vm.toggleSortDirection() ng-class="{\'cm-ascBtn\': !vm.sortDirDesc,\'cm-dscBtn\': vm.sortDirDesc }"></a></div></section><section class="clearfix cm-cardListing" ng-scrollbars><cm-connection ng-repeat="connection in vm.connections" to-profile=vm.toProfile(connection.id) profile=connection connect=vm.connect(connection.id,connection.displayname) view-profile=vm.toProfile(connection.id) type=vm.connectionCardType col-size="(vm.cardPerCol - !vm.sideFilterClosed) === 0 ? 1 : (vm.cardPerCol - !vm.sideFilterClosed)"></cm-connection></section></div></article></div>');
  $templateCache.put('views/profile.html',
    '<div class="container cm-height100" ng-scrollbars><div class="cm-profileLayout clearfix"><div class=cm-profileLeft><div class=cm-profileDPColumn><figure class=cm-userImg><img class="cm-userImgDp cm-userImgLg" src={{vm.connectionProfile.avatar}} alt=""></figure><div class=cm-latestActivity>LATEST ACTIVITY<span class=cm-activityStatus>{{vm.connectionProfile.lastactive | date:\'MMM d, yyyy\'}}</span></div><a ng-click=vm.connect(vm.connectionProfile.id,vm.connectionProfile.displayname) class="cm-cmBtn cm-btnSm">Connect</a></div><div class=cm-profileBio><div class=cm-profileBioHeader><div class=cm-NameTitle><span ng-bind=::vm.connectionProfile.displayname></span></div><div class=cm-residenceArea><span ng-bind=::vm.connectionProfile.location></span></div></div><div class=cm-profileBioWrap><div class="cm-bioRow cm-countryRow"><div class=cm-bioLabel>Country</div><div class=cm-bioEntry><img alt="" class=cm-flag ng-src={{vm.connectionProfile.flag}}> <span class=cm-bioEntry ng-bind=::vm.connectionProfile.country></span></div></div><div ng-repeat="row in vm.profileAttributes" class=cm-bioRow ng-class="{\'cm-textTransformNone\': row.upperCase == false}"><div class=cm-bioLabel ng-bind="::row.title | uppercase"></div><div class=cm-bioEntry ng-bind=::row.data></div></div><div class="cm-bioRow cm-aboutRow"><div class=cm-bioLabel>About <span ng-bind=::vm.connectionProfile.firstname></span></div><div class=cm-bioEntry ng-bind=::vm.connectionProfile.description></div></div></div></div></div><div class=cm-profileRight><div class="cm-connecMiniWidget cm-miniWidget"><tabset class=cm-widgetNavTabs><tab ng-repeat="tab in vm.connectionWidget.tabs" heading={{::tab.title}} active=tab.active ng-click=vm.connectionWidget.updateActiveTab(tab)><div class="row cm-widgetGridWrap"><cm-connection-tag ng-repeat="connection in tab.currentPage" connection=connection></cm-connection-tag></div></tab></tabset><pager total-items=vm.connectionWidget.activeTabTotalItems() ng-model=vm.connectionWidget.tabs[vm.connectionWidget.activeTab].currentPageNo items-per-page=vm.connectionWidget.activeTabItemsPerPage() ng-change=vm.connectionWidget.updatePage()></pager></div><div class="cm-expMiniWidget cm-miniWidget"><tabset class=cm-widgetNavTabs><tab ng-repeat="tab in vm.experienceWidget.tabs" heading={{::tab.title}} active=tab.active ng-click=vm.experienceWidget.updateActiveTab(tab)><div class="row cm-widgetGridWrap"><cm-experience-tag ng-repeat="experience in tab.currentPage" card-type=half experience=experience></cm-experience-tag></div></tab></tabset><pager total-items=vm.experienceWidget.activeTabTotalItems() ng-model=vm.experienceWidget.tabs[vm.experienceWidget.activeTab].currentPageNo items-per-page=vm.experienceWidget.activeTabItemsPerPage() ng-change=vm.experienceWidget.updatePage()></pager></div></div></div></div><script id=template/pagination/pager.html type=text/ng-template><ul class="pager cm-widgetPagiWrap">\n' +
    '    <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1, $event)"><i class="fa fa-angle-left"></i></a></li>\n' +
    '    <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1, $event)"><i class="fa fa-angle-right"></i></a></li>\n' +
    '  </ul></script>');
  $templateCache.put('views/addParticipant.template.html',
    '<div class="container cm-mainContainer"><div class="cm-mainContentArea cm-GreyBg"><div class=cm-expInvitePanel><div class=cm-row><div class=cm-column><tabset class=cm-addParticipantsPanel><tab heading="Add Teachers" disable=true><div class=cm-connecListingActionBar><div class=cm-actionSelectStatus><div class=cm-selectCount><strong>{{(vm.teacherSelected.length > 0) ? vm.teacherSelected.length : 0 }} Teachers</strong> Selected</div><a class="btn cm-cmBtn cm-ActionBtn" ng-click="vm.addSelected(vm.teacherSelected, vm.teacherInviteList)" ng-disabled="(vm.teacherSelected.length <= 0) ">Add Selected<i class=cm-arrowGlyph></i></a></div><div class="cm-partiWell cm-partiFilterPanel"><div class=cm-partiWellHdr>Find/Add a Teacher</div><div class=cm-partiWellBody><div class="cm-form cm-greyForm"><div class=form-group><label class=sr-only>Enter Name or Username</label><div class=cm-formControlWrap><input ng-model=vm.teacherSearchText type=text class=form-control placeholder="Enter Name or Username"> <a ng-click=vm.stopSearchTeacher() ng-if="vm.teacherSearchText.length>0" class=cm-removeSearch><i class="fa fa-times"></i></a></div></div><button ng-click=vm.searchTeacher() class="btn cm-cmBtn cm-bdBtn cm-btnSm" type=submit>Search</button></div></div></div></div><div ng-if=!vm.teacherSearching class="cm-partiWell cm-noBorder cm-pastExpParticipants cm-noPadding"><div class=cm-partiWellHdr>Teachers From Past Experiences</div><div class=cm-partiWellBody><div class="clearfix cm-userPartiListing" ng-scrollbars><div class="col-md-6 cm-column" ng-repeat="teacher in vm.teachers" ng-click=vm.connectionSelected(teacher,vm.teacherSelected)><div class="cm-userPartiCard cm-greyBorderCard {{teacher.border}}" ng-disabled=teacher.disabled><div class=cm-userDpInfoBox><figure class=cm-userImg><img alt="" ng-src={{teacher.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{teacher.displayname}}</div><div class=cm-userState>{{teacher.location}}</div></div></div></div></div></div></div></div><div class=cm-searchPartiResult><strong>0 Possible Matches</strong> for "{{vm.teacherSearchText}}". <a>Create New Account</a></div></tab><tab heading="Add My Students" active=true><div class="cm-partiWell cm-addPartiCreateAccWell" ng-if=vm.creatingAccount><div class=cm-partiWellHdr>Create New Student’s Account</div><div class=cm-partiWellBody><div class="cm-form cm-greyForm"><form name=createAccount novalidate><div class=row><div class=col-sm-6><div class=form-group><label>First Name</label><input name=firstName required type=text class=form-control id=cm-username ng-model=vm.newStudent.firstName><ng-messages for=createAccount.firstName.$error ng-if=createAccount.firstName.$dirty><div ng-message=required>A valid first name is required</div></ng-messages></div></div><div class=col-sm-6><div class=form-group><label>Last Name</label><input name=lastName required type=text class=form-control id=cm-username ng-model=vm.newStudent.lastName><ng-messages for=createAccount.lastName.$error ng-if=createAccount.lastName.$dirty><div ng-message=required>A valid last name is required</div></ng-messages></div></div></div><div class="form-group cm-singleLabelMultiInput"><label>Date of Birth</label><div class="row cm-row"><div class="col-sm-4 cm-column"><cm-gray-drop-down model=vm.newStudent.dob.month order-by-id=true place-holder={{vm.months[0].name}} values=vm.months></cm-gray-drop-down></div><div class="col-sm-4 cm-column"><cm-gray-drop-down model=vm.newStudent.dob.date place-holder={{vm.days[0].name}} values=vm.days></cm-gray-drop-down></div><div class="col-sm-4 cm-column"><cm-gray-drop-down model=vm.newStudent.dob.year place-holder={{vm.years[0].name}} values=vm.years></cm-gray-drop-down></div></div></div><div class=form-group><label>Students EMAIL (optional)</label><div class=cm-formControlWrap><input name=userEmail required ng-pattern=/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i class=form-control ng-maxlength=254 id=cm-Email ng-model=vm.newStudent.email cm-field-valid><ng-messages for=createAccount.userEmail.$error ng-if=createAccount.userEmail.$dirty><div ng-message=pattern>Please provide a valid email</div><div ng-message=required>A valid email is required</div></ng-messages></div></div><div class=form-group><label>CREATE USERNAME</label><div class=cm-formControlWrap><input name=username required type=text class=form-control id=cm-username ng-model=vm.newStudent.username ng-minlength=6 cm-field-valid><ng-messages for=createAccount.username.$error ng-if=createAccount.username.$dirty><div ng-message=minlength>Your username is too short</div><div ng-message=required>A valid username is required</div></ng-messages></div></div><div class=form-group><label>CREATE PASSWORD</label><div class=cm-formControlWrap><input name=password required type=password class=form-control id=cm-password ng-model=vm.newStudent.password ng-minlength=6 cm-field-valid><ng-messages for=createAccount.password.$error ng-if=createAccount.password.$dirty><div ng-message=minlength>Your password is too short</div><div ng-message=required>A valid password is required</div></ng-messages></div></div><div class=text-right><button type=submit ng-click=vm.createStudentAccount() class="btn cm-btn">Create Account</button> <button type=button class="btn cm-btn cm-cancelBtn" ng-click="vm.creatingAccount = false">Cancel</button></div></form></div></div></div><div class=cm-connecListingActionBar ng-if=!vm.creatingAccount><div class=cm-actionSelectStatus><div class=cm-selectCount><strong>{{(vm.studentSelected.length > 0) ? vm.studentSelected.length : 0 }} Students</strong> Selected</div><a class="btn cm-cmBtn cm-ActionBtn" ng-click="vm.addSelected(vm.studentSelected, vm.studentInviteList)" ng-disabled="(vm.studentSelected.length <= 0) ">Add Selected<i class=cm-arrowGlyph></i></a></div><div class="cm-partiWell cm-partiFilterPanel" ng-if=!vm.creatingAccount><div class=cm-partiWellHdr>Find/Add a Student</div><div class=cm-partiWellBody><div class="cm-form cm-greyForm"><div class=form-group><label class=sr-only>Enter Name or Username</label><div class=cm-formControlWrap><input ng-model=vm.studentSearchText type=text class=form-control placeholder="Enter Name or Username"> <a ng-click=vm.stopSearchStudent() ng-if="vm.studentSearchText.length>0" class=cm-removeSearch><i class="fa fa-times"></i></a></div></div><button ng-click=vm.searchStudent() class="btn cm-cmBtn cm-bdBtn cm-btnSm" ng-class="{\'defaultCursor\':(vm.studentSearchText.length===0)}" type=submit>Search</button></div></div></div></div><div class=cm-accountCreatedMsg ng-if="vm.accountCreated && !vm.creatingAccount">An account for <strong>{{vm.accountCreatedTitle}}</strong> has successfully been created and has been <strong>added to your invite list.</strong> <a ng-click="vm.accountCreated = false" class=cm-removeSearch><i class="fa fa-times"></i></a></div><div ng-if="!vm.studentSearching && !vm.creatingAccount" class="cm-partiWell cm-noBorder cm-pastExpParticipants cm-noPadding" ng-class="{\'cm-createAccMsgOpen\': vm.accountCreated}"><div class=cm-partiWellHdr>Students From Past Experiences</div><div class=cm-partiWellBody ng-scrollbars><div class="clearfix cm-userPartiListing" ng-scrollbars><div class="col-md-6 cm-column" ng-repeat="student in vm.students" ng-click=vm.connectionSelected(student,vm.studentSelected)><div class="cm-userPartiCard cm-greyBorderCard {{student.border}}" ng-disabled=student.disabled><div class=cm-userDpInfoBox><figure class=cm-userImg><img alt="" ng-src={{student.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{student.displayname}}</div><div class=cm-userState>{{student.location}}</div></div></div></div></div></div></div></div><div class=cm-searchPartiResult ng-if=!vm.creatingAccount><strong>{{(vm.matchedStudent.length > 0) ? vm.matchedStudent.length : 0}} Possible Matches</strong> for "{{vm.studentSearchText}}".<div ng-if="(vm.matchedStudent.length > 0) && vm.studentSearching" ng-repeat="student in vm.matchedStudent" class="cm-userPartiDetailCard {{student.border}}" ng-click=vm.connectionSelected(student,vm.studentSelected) ng-disabled=student.disabled><div class="cm-userDpInfoBox cm-userPartiClip"><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" ng-src={{student.avatar}} alt=""></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{student.username}}</div><div class=cm-userState>{{student.location}}</div></div></div><div class="cm-singleDetailClip cm-userPartiClip"><span>USERNAME</span>{{student.displayname}}</div><div class="cm-singleDetailClip cm-userPartiClip"><span>BIRTHDATE</span>{{student.birthdate | date:\'MMM d, yyyy\'}}</div><div class="cm-countryFlagClip cm-userPartiClip"><img ng-src={{student.flag}} class=cm-flag alt=""></div></div><em ng-if="(vm.matchedStudent.length > 0) && vm.studentSearching">or</em> <a class=cm-createNewAcc ng-click="vm.creatingAccount=true">Create New Account</a></div></tab></tabset></div><div class=cm-column><div class=cm-connecListingPanel><div class=cm-connecListingPanelHeader><div class=cm-connecListingPanelTitle>The Invite List</div><div class=cm-connecListingActionBar><div class=cm-actionSelectStatus><div class=cm-selectCount><strong>{{(vm.teacherInviteList.length > 0) ? vm.teacherInviteList.length : 0 }} Teachers, {{(vm.studentInviteList.length > 0) ? vm.studentInviteList.length : 0 }} Students</strong> on the invite list.</div><a ng-click=vm.sendInviteClick() class="btn cm-cmBtn cm-ActionBtn" ng-disabled="(vm.studentInviteList.length <= 0) &&(vm.teacherInviteList.length <= 0)">Send Invites</a></div></div></div><div class=cm-connecListingBody ng-scrollbars><div class="cm-partiWell cm-noBorder"><div class=cm-partiWellHdr>Teachers</div><div class=cm-partiWellBody><div class="clearfix cm-userPartiListing"><div class="col-md-6 cm-column" ng-repeat="teacher in vm.teacherInviteList"><div class="cm-userPartiCard cm-greyBorderCard"><div class=cm-userDpInfoBox><figure class=cm-userImg><img alt="" ng-src={{teacher.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{teacher.displayname}}</div><div class=cm-userState>{{teacher.location}}</div></div></div></div></div></div></div></div><div class="cm-partiWell cm-noBorder"><div class=cm-partiWellHdr>Students</div><div class=cm-partiWellBody><div class="clearfix cm-userPartiListing"><div class="col-md-6 cm-column" ng-repeat="student in vm.studentInviteList"><div class="cm-userPartiCard cm-greyBorderCard"><div class=cm-userDpInfoBox><figure class=cm-userImg><img alt="" ng-src={{student.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{student.displayname}}</div><div class=cm-userState>{{student.location}}</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>');
  $templateCache.put('views/experienceDrawer.html',
    '<div class="container cm-mainContainer"><article class="cm-sideBarContentWrapper cm-chatDrawer"><side-bar-container arrow-class=vm.arrowClass sidebar-open=vm.sideFilterOpen sidebar-closed=vm.sideFilterClosed><div class=cm-sideBarHeader><div class=cm-sideBarTitle>{{vm.sideBarHeading}}</div><a ng-if=vm.sideBarButtonVisible class="btn cm-cmBtn cm-actionBtn {{vm.sideBarButtonClass}}" ng-click=vm.sideBarButtonClick()><i ng-if="vm.sideBarButtonClass === \'cm-messages\'" class="fa fa-pencil-square-o"></i>{{vm.cardType}}</a></div><div class=cm-sideBarBody ng-scrollbars ui-view=sideBar></div><div class=cm-sideBarFooter><ul class=chatDrawerTabs><li ng-repeat="sideBar in vm.sideBarTabs" ng-click=sideBar.clicked(sideBar) ng-class="{\'cm-active\': sideBar.active}" class="btn {{sideBar.iconClass}}"><span ng-if="(sideBar.notification>0) && !sideBar.active" class=cm-countBubble>{{sideBar.notification}}</span></li></ul></div></side-bar-container><div class=cm-mainContentArea ng-class="{\'cm-sideBarOpen\': vm.sideFilterOpen }"><section class=cm-contentActionBar ng-if="(vm.pageType === \'timeLine\')"><div class=cm-mainPageTitle>{{vm.timeLine.name}}</div><ul class="cm-bdBtnGroup clearfix"><li><a class="btn cm-cmBtn cm-bdBtn cm-btnSm"><i class="fa fa-video-camera"></i>Video Chat</a></li><li><a class="btn cm-cmBtn cm-bdBtn cm-btnSm" ng-click=vm.goToPostDiscussion()>Add Discussion</a></li></ul><a ng-if="(vm.pageType === \'timeLine\')" ng-click=vm.gotoBottom() class="btn cm-scrollBtn cm-bdBtn cm-btnSm"><i class="fa fa-angle-double-down"></i></a></section><section class=cm-contentActionBar ng-if="(vm.pageType === \'discussion\')"><a ng-click=vm.goToDiscussion(vm.timeLine.expId) class="cm-cmBtn cm-bdlArrowBtn"><i class="fa fa-angle-left"></i>Back to Discussions</a></section><section ng-if="(vm.pageType === \'timeLine\')" class="cm-expTimelineWrapper cm-bglGreen cm-bubblesBg" ng-scrollbars><cm-time-line all-event=vm.timeLine.events></cm-time-line><section id=bottomEnd></section></section><section ng-if="(vm.pageType === \'discussion\')" ng-class="{\'cm-addCommentReplyEditorExpanded\': vm.getExpand() == true}" class=cm-expDiscussionWrapper ng-scrollbars><cm-discussion expand=vm.expanded></cm-discussion></section><div ng-if="(vm.pageType === \'post\')" class=cm-height100><cm-post-discussion></cm-post-discussion></div><div ng-show="vm.getExpand() == false" ng-if="(vm.pageType === \'discussion\')" class=cm-addCommentReplyEditorBar><figure class=cm-userImg><img alt="" src=images/avatars/user_img2.png class="cm-userImgDp cm-userImgSm"></figure><div class=cm-addCommentReplyEditorBox ng-click=vm.setExpand(true)><input type=text class="cm-addCommentInputDeco form-control" placeholder="Add a comment to this message..."></div></div><div ng-show="vm.getExpand() == true" ng-if="(vm.pageType === \'discussion\')" class="cm-addCommentReplyEditorBar cm-expanded"><a class=cm-addCommentCancel ng-click=vm.setExpand(false)><i class="fa fa-times"></i></a><figure class=cm-userImg><img alt="" src=images/avatars/user_img2.png class="cm-userImgDp cm-userImgSm"></figure><div class=cm-addCommentReplyEditorBox><div class="cm-addCommentReplyEditorTextarea summernoteMaxHeight"><summernote config=vm.options class=form-control></summernote></div><div class=cm-addCREBoxFooter><div class=cm-dragAttachMediaText><span class="glyphicon glyphicon-paperclip"></span>To attach files drag &amp; drop here or <a>select files from your computer.</a></div><button type=submit class="btn cm-cmBtn">Add Comment</button></div></div></div></div></article></div>');
  $templateCache.put('views/experienceDrawerDiscussion.html',
    '<section class=cm-contentActionBar><a ng-click=vm.goToDiscussion(vm.timeLine.expId) class="cm-cmBtn cm-bdlArrowBtn"><i class="fa fa-angle-left"></i>Back to Discussions</a></section><section class=cm-expDiscussionWrapper ng-scrollbars><cm-discussion></cm-discussion></section><div class=cm-addCommentReplyEditorBar><figure class=cm-userImg><img alt="" ng-src={{vm.userDp}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-addCommentReplyEditorBox><input type=text class="cm-addCommentInputDeco form-control" placeholder="Add a comment to this message..."></div></div>');
  $templateCache.put('views/experienceDrawerInfo.template.html',
    '<section class=cm-expDrawerInfo><div ng-bind-html=vm.sideBarContent.info></div><a ui-sref="shell.myExperience.modification.editExperience({id: vm.sideBarContent.experienceId})" class=cm-editExpLink><i class="fa fa-pencil"></i> Edit Experience</a></section>');
  $templateCache.put('views/experienceDrawerSideBar.template.html',
    '<cm-feed-container ng-repeat="content in vm.sideBarContent" container=content on-card-click=vm.onCardClick() card-type=vm.cardType></cm-feed-container>');
  $templateCache.put('views/experienceDrawerTimeLine.html',
    '<section class=cm-contentActionBar><div class=cm-mainPageTitle>{{vm.timeLine.name}}</div><ul class="cm-bdBtnGroup clearfix"><li><a class="btn cm-cmBtn cm-bdBtn cm-btnSm"><i class="fa fa-video-camera"></i>Video Chat</a></li></ul><a ng-click=vm.gotoBottom() class="btn cm-scrollBtn cm-bdBtn cm-btnSm"><i class="fa fa-angle-double-down"></i></a></section><section class="cm-expTimelineWrapper cm-bglGreen cm-bubblesBg" ng-scrollbars><cm-time-line all-event=vm.timeLine.events></cm-time-line><section id=bottomEnd></section></section>');
  $templateCache.put('views/mail.folderView.html',
    '<div class="cm-messagePanelHeader clearfix"><a class=cm-messageNewBtn ui-sref=.newMessage><i class="fa fa-pencil-square-o"></i> New</a></div><div class=cm-messagePanelBody><ul class=cm-messageTabsList><li class=cm-active><a>Messages (1)</a></li><li><a>Sent</a></li><li><a>Trash</a></li></ul></div>');
  $templateCache.put('views/mail.html',
    '<div class="cm-messagePanel cm-messageList"><div class="cm-messagePanelHeader clearfix"><a class="btn cm-msgPanelHeaderOptBtn pull-left cm-dropdownBtn">All Messages<i class="fa fa-caret-down"></i></a><label class="cm-checkBoxAlone pull-right"><input type=checkbox> <span class="glyphicon glyphicon-ok"></span></label><a class="btn cm-msgPanelHeaderOptBtn pull-right cm-optionBtn" disabled><i class="fa fa-trash"></i>Trash</a></div><div class=cm-messagePanelBody><div class=cm-messageListBox><div class=cm-messageListTitle>Today</div><div ng-repeat="message in vm.messages"><div class=cm-messageListTitle ng-show="$index == 2">Yesterday</div><cm-message-excerpt message=message></cm-message-excerpt></div></div></div></div><div class="cm-messagePanel cm-messageView"><div class="cm-messagePanelHeader clearfix"><a class="btn cm-msgPanelHeaderOptBtn pull-left cm-optionBtn"><i class="fa fa-reply"></i>Reply</a> <a class="btn cm-msgPanelHeaderOptBtn pull-left cm-optionBtn"><i class="fa fa-trash"></i>Trash</a> <a class="btn cm-msgPanelHeaderOptBtn pull-right cm-pagiBtn cm-next" ng-disabled="vm.activeIndex >= vm.messages.length-1" ng-click=vm.navNextMsg()>Next<i class="fa fa-angle-right"></i></a> <a class="btn cm-msgPanelHeaderOptBtn pull-right cm-pagiBtn cm-prev" ng-disabled="vm.activeIndex <= 0" ng-click=vm.navPrevMsg()><i class="fa fa-angle-left"></i>Prev</a></div><div class=cm-messagePanelBody><div class=cm-singleMessage><div class=cm-singleMessageDetails><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" src={{vm.activeMessage.displaypicture}} alt=""></figure><div class=cm-singleMessageFrom><div class=cm-messageFromUser>{{vm.activeMessage.from}}</div><div class=cm-messageTime ng-bind="vm.activeMessage.created | date:\'MMMM-dd-yyyy HH:mm a\'"></div></div></div><div class=cm-messageSubject>Video Chat?</div><div class=cm-singleMessageBody ng-bind-html=vm.activeMessage.text></div></div></div></div>');
  $templateCache.put('views/mail.receiveMessages.html',
    '');
  $templateCache.put('views/mail.sentMessages.html',
    '<table class="table table-hover table-striped table-bordered"><thead><tr><td>Name</td></tr></thead><tbody><tr><td>FW: Lestre Shire</td></tr><tr><td>RE: Rebica Lines</td></tr><tr><td>RE: Lisa Anderson</td></tr></tbody></table>');
  $templateCache.put('views/mail.trashMessages.html',
    '<table class="table table-hover table-striped table-bordered"><thead><tr><td>Name</td></tr></thead><tbody><tr><td>lancy Drew</td></tr><tr><td>Dave Hessey</td></tr><tr><td>Jerome D\'sillva</td></tr></tbody></table>');
  $templateCache.put('views/messages.html',
    '<div class="container cm-height100"><div class="cm-messageLayout clearfix"><div ui-view=messageFoldersColumn class="cm-messagePanel cm-messageTabs"></div><div ui-view=messageBodyColumn class="cm-height100 clearfix"></div></div></div>');
  $templateCache.put('views/newMessage.html',
    '<script type=text/ng-template id=customTemplate.html><a>\n' +
    '    <img ng-src="http://lorempixel.com/20/20/people/" width="16">\n' +
    '    <span bind-html-unsafe="match.label | typeaheadHighlight:query"></span>\n' +
    '  </a></script><div class="cm-messagePanel cm-messageCreate"><div class="cm-messagePanelHeader clearfix"><div class=cm-messageCreateTitle>New Message</div></div><div class=cm-messagePanelBody ng-scrollbars><div class="cm-singleMessage cm-singleCreateMessage"><div class="cm-greyForm cm-form"><div class=row><div class=col-md-7><div class="form-group cm-sendToField"><label>To</label><div class=cm-formControlWrap><tags-input ng-model=tags display-property=name placeholder="Search Friends" replace-spaces-with-dashes=false template=tag-template><auto-complete source=vm.loadCountries($query) min-length=0 load-on-focus=true load-on-empty=true max-results-to-show=32 template=autocomplete-template></auto-complete></tags-input><script type=text/ng-template id=tag-template><div class="cm-recipientBlock cm-recipientInputsBlock">\n' +
    '                        <figure class="cm-userImg"><img class="cm-userImgDp cm-userImgSm"  ng-src="{{data.picture}}" ng-if="data.picture"></figure>\n' +
    '                        <div class="cm-recipientName">{{$getDisplayText()}}</div>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <!--<div class="tag-template">-->\n' +
    '                        <!--<div class="left-panel">-->\n' +
    '                          <!--<img ng-src="{{data.picture}}" ng-if="data.picture"/>-->\n' +
    '                        <!--</div>-->\n' +
    '                        <!--<div class="right-panel">-->\n' +
    '                          <!--<span>{{$getDisplayText()}}</span>-->\n' +
    '                          <!--<a class="remove-button" ng-click="$removeTag()">&#10006;</a>-->\n' +
    '                        <!--</div>-->\n' +
    '                      <!--</div>--></script><script type=text/ng-template id=autocomplete-template><div class="cm-recipientBlock form-control">\n' +
    '                        <figure class="cm-userImg"><img class="cm-userImgDp cm-userImgSm" ng-src="{{data.picture}}" ></figure>\n' +
    '                        <div ng-bind-html="$highlight($getDisplayText())" class="cm-recipientName">Craig S</div>\n' +
    '                        <img alt="" class="cm-flag" src="{{data.flag}}">\n' +
    '                        <span>{{data.confederation}}</span>\n' +
    '                      </div></script></div></div></div><div class=col-md-7><div class=form-group><label>Subject</label><input type=text class=form-control value="More info about Wednesday’s project"></div></div><div class=col-md-11><div class=form-group><label>Your Message</label><textarea class=form-control>Hi Janet,\n' +
    '\n' +
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod.\n' +
    '\n' +
    'Best,\n' +
    'Jonathan</textarea></div></div><div class=col-md-12><a class="cm-cmBtn cm-attachFilesBtn"><span class="glyphicon glyphicon-paperclip"></span> Attach Files</a></div><div class=col-md-12><button class="btn cm-formBtn cm-submitBtn">Send Message</button> <button ui-sref=^ class="btn cm-formBtn">Cancel</button></div></div></div></div></div></div>');
  $templateCache.put('views/cmDialogWindow.html',
    '<div modal-render={{$isRendered}} tabindex=-1 role=dialog class=modal modal-animation-class=fade ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}"><div class=modal-dialog><div class=modal-content><div modal-transclude></div></div></div></div>');
  $templateCache.put('views/cmDialogWindowPenPal.html',
    '<div modal-render={{$isRendered}} tabindex=-1 role=dialog class=modal modal-animation-class=fade ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index * 10, display: \'block\'}"><div class=modal-dialog><div style=width:580px class=modal-content><div modal-transclude></div></div></div></div>');
  $templateCache.put('views/cmModalDiscussion.html',
    '<div modal-render={{$isRendered}} tabindex=-1 role=dialog class=modal modal-animation-class=fade ng-class="{in: animate, \'cm-modalLarge\': $$nextSibling.large}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click=close($event)><div class=modal-dialog ng-class="size ? \'modal-\' + size : \'\'"><div class=modal-content><div modal-transclude></div></div></div></div>');
  $templateCache.put('views/cmModalWindow.html',
    '<div modal-render={{$isRendered}} tabindex=-1 role=dialog class=modal modal-animation-class=fade ng-class="{in: animate, \'cm-modalLarge\': $$nextSibling.large}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click=close($event)><div class=modal-dialog ng-class="size ? \'modal-\' + size : \'\'"><div class=modal-content><div class=modal-header><button type=button class="close cm-closeModal" ng-click=$$nextSibling.$dismiss() aria-label=Close></button> <a class=cm-mainLogo></a></div><div modal-transclude></div></div></div></div>');
  $templateCache.put('views/myConnections.actionbar.template.html',
    '<ul class=cm-tabNavAB><li ng-repeat="state in vm.navStates | orderBy: \'myConnectionNavOrder\'" ui-sref={{state.name}} ng-class="{\'cm-active\': state.isSubActiveTab}"><i class="fa fa-caret-up"></i><a>{{state.myConnectionNavTitle}}</a><span class=cm-countBubble ng-if="(state.notificationCount>0)&&(!state.isSubActiveTab)">{{state.notificationCount}}</span></li></ul><div class=cm-changeViewOptions><a class=cm-listView ng-class={active:vm.row} ng-click=vm.rowDisplay(true)><span class="glyphicon glyphicon-th-list"></span></a> <a class=cm-GridView ng-class={active:!vm.row} ng-click=vm.rowDisplay(false)><span class="glyphicon glyphicon-th-large"></span></a></div>');
  $templateCache.put('views/myConnections.connections.template.html',
    '<div ng-if="vm.myConnections.length<=0" class=cm-noListingMessage>You have no {{vm.title}} requests at this time. <a class="btn cm-cmBtn" ui-sref=shell.connections>Find Connections</a></div><cm-connection ng-repeat="connection in vm.myConnections" to-profile=vm.toProfile(connection.id) profile=connection connect=vm.connect(connection.id,connection.displayname) view-profile=vm.toProfile(connection.id) type=vm.connectionCardType col-size="(vm.row)? 1:4 "></cm-connection>');
  $templateCache.put('views/myConnections.template.html',
    '<div class="container cm-mainContainer"><div class="cm-mainContentArea cm-GreyBg"><section ui-view=actionBar class="cm-contentActionBar cm-contentActionBarWhite"></section><section ui-view=connections class="clearfix cm-cardListing" ng-scrollbars></section></div></div>');
  $templateCache.put('views/myProfile.html',
    '<div class="container cm-height100"><div class="cm-profileLayout clearfix cm-height100" ng-scrollbars><div class=cm-profileDPColumn><figure class=cm-userImg><img class="cm-userImgDp cm-userImgLg" ng-src={{vm.profile.avatar}} alt=""></figure></div><div class=cm-profileBio><div class=cm-profileBioHeader><div ng-if=!vm.profile.membership class="alert alert-warning"><strong>Alerta!</strong> Debe completar el proceso de afiliacion!.</div><div class=cm-profileBioTitleWrap><div class=cm-NameTitle>{{vm.profile.displayName}}</div><div class=cm-residenceArea>{{vm.profile.location.state}}, {{vm.profile.location.city}}</div></div><a ng-click=vm.editProfile() class=cm-editProfileLink><i class="fa fa-pencil"></i> Editar Perfil</a></div><div class=cm-profileBioWrap><div class=row><div class="col-sm-6 col-xs-6"><div class=cm-bioRow><div class=cm-bioLabel>Cedula</div><div class=cm-bioEntry>{{vm.profile.id}}</div></div><div class="cm-bioRow cm-countryRow"><div class=cm-bioLabel>Nombres</div><div class=cm-bioEntry>{{vm.profile.firstName}}</div></div><div class=cm-bioRow><div class=cm-bioLabel>Apellidos</div><div class=cm-bioEntry>{{vm.profile.lastName}}</div></div><div class=cm-bioRow><div class=cm-bioLabel>Correo</div><div class=cm-bioEntry>{{vm.profile.email}}</div></div><div class=cm-bioRow><div class=cm-bioLabel>Puntos</div><div class=cm-bioEntry>{{vm.points}}</div></div></div></div></div><br><div ng-if=vm.referredLoaded class=cm-profileBioHeader><div class=cm-profileBioTitleWrap><div class=cm-NameTitle>Lista de Referidos</div><br><div style="font-weight: bold; font-size: 16px">Nivel 1</div><div class=row><div class="col-sm-6 col-xs-6"><div style="font-weight: bold">Cedula</div></div><div class="col-sm-6 col-xs-6"><div style="font-weight: bold">Nombres</div></div><div ng-repeat="referred in vm.referredList[\'referredList1\']"><div class="col-sm-6 col-xs-6"><div>{{referred.id}}</div></div><div class="col-sm-6 col-xs-6"><div class=cm-bioEntry>{{referred.displayName}}</div></div></div></div><div ng-if="vm.referredList[\'referredListCount1\'] == 0"><div class="alert alert-warning"><strong>Atencion!</strong> No tiene ningun Referido Indirecto.</div></div><br><div style="font-weight: bold; font-size: 16px">Nivel 2</div><div class=row><div class="col-sm-6 col-xs-6"><div style="font-weight: bold">Cedula</div></div><div class="col-sm-6 col-xs-6"><div style="font-weight: bold">Nombres</div></div><div ng-repeat="referred in vm.referredList[\'referredList2\']"><div class="col-sm-6 col-xs-6"><div class=cm-bioEntry>{{referred.id}}</div></div><div class="col-sm-6 col-xs-6"><div class=cm-bioEntry>{{referred.displayName}}</div></div></div></div><div ng-if="vm.referredList[\'referredListCount2\'] == 0"><div class="alert alert-warning"><strong>Atencion!</strong> No tiene ningun Referido Indirecto.</div></div></div></div></div></div></div>');
  $templateCache.put('views/myProfileEdit.html',
    '<div class="container cm-height100" ng-scrollbars><div class="cm-profileLayout clearfix"><div class=cm-profileDPColumn><figure class=cm-userImg><img class="cm-userImgDp cm-userImgLg" ng-src={{vm.profile.avatar}} alt=""></figure><a class=cm-editLink>Change Avatar</a> <a class=cm-editLink>Change Password</a></div><div class="cm-profileBio cm-editProfile cm-greyForm cm-form"><div class=cm-editProfileHeader><div class=cm-editProfileTitle>Edit My Profile</div><a class="cm-cmBtn btn cm-profileSaveBtn" ng-click=vm.saveProfile()>Save</a></div><div class=row><form name=myProfile novalidate><div class="col-sm-6 col-xs-6"><div class=row><div class="col-sm-6 col-xs-6"><div class=form-group><label>Nombres</label><input required name=firstName ng-model=vm.profile.firstname ng-pattern=/^(\\D)+$/ type=text class=form-control><ng-messages for=myProfile.firstName.$error ng-if=myProfile.firstName.$dirty><div ng-message=pattern>El Nombre debe contener solo texto</div><div ng-message=minlength>El Nombre es muy corto</div><div ng-message=required>Ingrese su Nombre</div></ng-messages></div></div><div class="col-sm-6 col-xs-6"><div class=form-group><label>Apellidos</label><input required name=lastName ng-model=vm.profile.lastname ng-pattern=/^(\\D)+$/ type=text class=form-control><ng-messages for=myProfile.lastName.$error ng-if=myProfile.lastName.$dirty><div ng-message=pattern>El Apellido debe contener solo texto</div><div ng-message=minlength>El Apellido es muy corto</div><div ng-message=required>Ingrese su Apellido</div></ng-messages></div></div></div><div class=form-group><label>Ubicación</label><input required ng-model=vm.profile.location name=userLocation type=text class=form-control><ng-messages for=myProfile.userLocation.$error ng-if=myProfile.userLocation.$dirty><div ng-message=required>Please provide your location</div></ng-messages></div><div class=form-group><label>Pais</label><cm-gray-drop-down place-holder={{vm.profile.country}} values=vm.filterCriteria[0].allValues></cm-gray-drop-down></div><div class=form-group><label>Correo electrónico</label><input ng-model=vm.profile.email name=userEmail required ng-pattern=/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i class=form-control ng-maxlength=254 id=cm-Email><ng-messages for=myProfile.userEmail.$error ng-if=myProfile.userEmail.$dirty><div ng-message=pattern>Please provide a valid email</div><div ng-message=required>A valid email is required</div></ng-messages></div><div class=form-group><label>Age of Students</label><div class=cm-customValueSlider><div class=cm-sliderBar><input ng-model=vm.profile.ages type=text slider options=vm.ageGroupOptions ng-disabled=disabled></div><div class=cm-sliderText>{{vm.profile.ages.replace(\';\', \' - \')}}</div></div></div><div class=form-group><label>Type of School</label><cm-gray-drop-down place-holder={{vm.profile.schooltype}} values=vm.filterCriteria[7].allValues></cm-gray-drop-down></div><div class=form-group><label>Name of School</label><input required name=schoolName ng-model=vm.profile.schoolname type=text class=form-control><ng-messages for=myProfile.schoolName.$error ng-if=myProfile.schoolName.$dirty><div ng-message=required>Please provide your school name</div></ng-messages></div></div><div class="col-sm-6 col-xs-6"><div class=form-group><label>Username</label><input required name=userName ng-model=vm.profile.username type=text class=form-control><ng-messages for=myProfile.userName.$error ng-if=myProfile.userName.$dirty><div ng-message=required>Please provide a valid username</div></ng-messages></div><div class=form-group><label>Subject(s) Taught</label><div class="cm-checkboxGroup clearfix"><div class=checkbox ng-repeat="sub in vm.profile.subjects | orderBy: \'name\'"><label><input type=checkbox checked> {{sub.name}} <span class="glyphicon glyphicon-ok"></span></label></div><a ng-click=vm.addSubject() ng-if="!vm.subjectFinished && !vm.addingSubject" class=cm-checkBoxAddBtn><span class=cm-addIcon><i class="fa fa-plus"></i></span>Add</a></div><cm-gray-drop-down ng-if=vm.addingSubject model=vm.selectedSubject place-holder={{vm.filterCriteria[4].placeHolder}} values=vm.filterCriteria[4].allValues onselect=vm.subjectAdded(val)></cm-gray-drop-down></div><div class=form-group><label>Language(s) Spoken</label><div class="cm-checkboxGroup clearfix"><div class=checkbox ng-repeat="lang in vm.profile.languages  | orderBy: \'name\'"><label><input type=checkbox checked> {{lang.name}} <span class="glyphicon glyphicon-ok"></span></label></div><a ng-click=vm.addLanguage() ng-if="!vm.languageFinished && !vm.addingLanguage" class=cm-checkBoxAddBtn><span class=cm-addIcon><i class="fa fa-plus"></i></span>Add</a></div><cm-gray-drop-down ng-if=vm.addingLanguage model=vm.selectedLanguage place-holder={{vm.filterCriteria[2].placeHolder}} values=vm.filterCriteria[2].allValues onselect=vm.languageAdded(val)></cm-gray-drop-down></div><div class=form-group><label>Class Size</label><cm-gray-drop-down place-holder="{{vm.profile[\'class-size\']}}" values=vm.filterCriteria[3].allValues></cm-gray-drop-down></div><div class=form-group><label>Interested In</label><cm-gray-drop-down place-holder={{vm.profile.interested_in}} values=vm.filterCriteria[6].allValues></cm-gray-drop-down></div><div class=form-group><label>Looking for</label><textarea required ng-model=vm.profile.looking_for class="form-control cm-height100px"></textarea></div></div><div class="col-sm-12 col-xs-12"><div class=form-group><label>A summary about yourself and your classroom(s)</label><textarea required ng-model=vm.profile.description class="form-control cm-height172px"></textarea></div></div></form></div></div></div></div>');
  $templateCache.put('views/parentDashboard.html',
    '<div class="cm-profileLayout clearfix cm-height100" ng-scrollbars><div class=cm-parentDashboard><div class=cm-parentDashboardHeader><div class=cm-primaryBar><div class=cm-parentName>{{vm.data.name}}<span>Parent</span></div><a class=cm-editMyAcc><i class="fa fa-pencil"></i> Edit My Account</a></div><div class=cm-secondaryBar><div class=cm-kidsHeading>My Kids</div><a class="cm-cmBtn cm-bdBtn cm-btnSm">Add Kids</a></div></div><div class=cm-myKidsListing><div ng-repeat="kid in vm.data.kids" class="cm-connecProfileCard cm-myKidsCard cm-greyBorderCard"><div class=cm-basicBio><div class=cm-connecNCWrap><div class=cm-connecName ng-bind=kid.displayname></div><div class=cm-connecAdrs><img ng-src={{kid.flag}} class=cm-flag alt=""><div class=cm-connecAdrsTxt>{{kid.location}}<br>{{kid.country}}</div></div></div><figure class=cm-userImg><img alt="" ng-src={{kid.avatar}} class="cm-userImgDp cm-userImgMd"></figure></div><button class="btn cm-kidsCardActionBtn cm-kidsActionViewBtn">View Work</button> <button class="btn cm-kidsCardActionBtn cm-kidsActionEditBtn">Edit</button></div></div></div></div>');
  $templateCache.put('views/registerUser.html',
    '<div class="container cm-mainContainer"><div class="cm-mainContentArea cm-GreyBg" ng-scrollbars><section class=cm-createExpForm><form class=cm-form name=register novalidate><div class=cm-row><div class="cm-column left" style=width:100%><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Datos Personales</div></div><div class=cm-whitePanelBody><div class=row><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><label for=cm-firstName>Nombres</label><div class=form-group><input name=firstName required type=text ng-pattern=/^(\\D)+$/ class=form-control id=cm-firstName ng-model=vm.user.firstName ng-minlength=6 ng-maxlength=30><ng-messages for=register.firstName.$error ng-if=register.firstName.$dirty><div ng-message=pattern>El Nombre debe contener solo texto</div><div ng-message=minlength>El Nombre es muy corto</div><div ng-message=required>Ingrese su Nombre</div><div ng-message=maxlength>El Nombre es muy largo</div></ng-messages></div></div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><label for=cm-lastName>Apellidos</label><div class=form-group><input name=lastName required type=text ng-pattern=/^(\\D)+$/ class=form-control id=cm-lastName ng-model=vm.user.lastName ng-minlength=6 ng-maxlength=30><ng-messages for=register.lastName.$error ng-if=register.lastName.$dirty><div ng-message=pattern>El Apellido debe contener solo texto</div><div ng-message=minlength>El Apellido es muy corto</div><div ng-message=maxlength>El Apellido es muy largo</div><div ng-message=required>Ingrese su Apellido</div></ng-messages></div></div></div><br><div class=row><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Fecha de Nacimiento</label><div class=input-group><input name=dob ng-change="" type=text class=form-control datepicker-popup={{vm.format}} ng-model=vm.user.dob is-open=vm.dobOpened ng-required=true close-text=Cerrar close-text=Cerrar required disabled><ng-messages for=register.dob.$error ng-if=register.dob.$dirty><div ng-message=required>Ingrese su Fecha de nacimiento</div></ng-messages><span class=input-group-btn><button type=button class="btn btn-default" ng-click=vm.dobOpen($event)><i class="glyphicon glyphicon-calendar"></i></button></span></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Estado Civil</label><div class=form-group><ui-select name="" on-select="" ng-model=vm.civilStatus class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.civilStatusCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select><input name=estadoCivil ng-model=vm.civilStatus type=hidden required><ng-messages for=register.estadoCivil.$error ng-if=register.estadoCivil.$dirty><div ng-message=required>Seleccione su Estado civil</div></ng-messages></div></div><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"><label>Peso</label><div class=form-group><input name=weight type=number ng-model=vm.user.weight ng-change="" class=form-control ng-maxlength=5><ng-messages for=register.weight.$error ng-if=register.weight.$dirty><div ng-message=maxlength>El Peso es muy largo</div></ng-messages></div></div><div class="col-xs-12 col-sm-1 col-md-1 col-lg-1"><label>Estatura</label><div class=form-group><input name=height type=number ng-model=vm.user.height ng-change="" class=form-control ng-maxlength=5><ng-messages for=register.height.$error ng-if=register.height.$dirty><div ng-message=maxlength>La estatura es muy largo</div></ng-messages></div></div></div><br><div class=row><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Teléfono Celular</label><div class=input-group><div class=input-group-btn><ui-select name="" on-select="" ng-model=vm.cellphoneType class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.cellphoneTypeCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select><input name=cellphoneType ng-model=vm.cellphoneType type=hidden required><ng-messages for=register.cellphoneType.$error ng-if=register.cellphoneType.$dirty><div ng-message=required>Ingrese su código de celular</div></ng-messages></div><input name=cellphone type=number ng-model=vm.cellphoneNumber ng-change="" class=form-control ng-maxlength=7 required><ng-messages for=register.cellphone.$error ng-if=register.cellphone.$dirty><div ng-message=maxlength>Número celular muy largo</div><div ng-message=required>Ingrese su número de celular</div></ng-messages></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Teléfono Habitacion</label><div class=input-group><div class=input-group-btn style=width:30%><input name=phoneType type=number ng-model=vm.phoneType ng-change="" class=form-control ng-maxlength=4 ng-minlength=4></div><ng-messages for=register.phoneType.$error ng-if=register.phoneType.$dirty><div ng-message=maxlength>Numero muy largo</div><div ng-message=minlength>Numero muy corto</div></ng-messages><input name=phoneNumber type=number ng-model=vm.phoneNumber ng-change="" class=form-control ng-maxlength=7 ng-minlength=7><ng-messages for=register.phoneType.$error ng-if=register.phoneType.$dirty><div ng-message=maxlength>Numero muy largo</div><div ng-message=minlength>Numero muy corto</div></ng-messages></div></div><div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><label>E-mail</label><div class=form-group><input name=email ng-pattern=/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i ng-maxlength=60 type=text ng-model=vm.user.email ng-change="" class=form-control required><ng-messages for=register.email.$error ng-if=register.email.$dirty><div ng-message=pattern>Correo electrónico inválido</div><div ng-message=maxlength>Correo electrónico muy largo</div><div ng-message=required>Ingrese su Correo electrónico</div></ng-messages></div></div></div></div></div><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Ubicacion</div></div><div class=cm-whitePanelBody><label>Dirección de Habitación</label><div class=row><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><div class=form-group><input name=address1 type=text placeholder="Calles y Avenidas" ng-model=vm.user.location.address1 ng-change="" class=form-control ng-maxlength=100 ng-minlength=10 required><ng-messages for=register.address1.$error ng-if=register.address1.$dirty><div ng-message=minlength>Dirección muy corta</div><div ng-message=maxlength>Dirección muy larga</div><div ng-message=required>Ingrese una Dirección</div></ng-messages></div></div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><div class=form-group><input name=address2 type=text placeholder="Urb, Casa, Edificio, Apto y Sector" ng-model=vm.user.location.address2 ng-change="" class=form-control ng-maxlength=100 ng-minlength=1 required><ng-messages for=register.address2.$error ng-if=register.address2.$dirty><div ng-message=minlength>Dirección muy larga</div><div ng-message=maxlength>Dirección muy larga</div><div ng-message=required>Ingrese tipo de habitación</div></ng-messages></div></div></div><br><div class=row><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Pais</label><div class=form-group><ui-select name="" on-select="" ng-model=vm.country class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.countryCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select><input name=country ng-model=vm.country type=hidden required><ng-messages for=register.country.$error ng-if=register.country.$dirty><div ng-message=required>Seleccione Pais</div></ng-messages></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Estado</label><div class=form-group><ui-select name="" on-select=vm.setCity(vm.state) ng-model=vm.state class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected.estado}}</ui-select-match><ui-select-choices repeat="list in vm.stateCollection | orderBy: \'estado\' | filter: {estado: $select.search}"><div ng-bind=list.estado></div></ui-select-choices></ui-select><input name=state ng-model=vm.state type=hidden required><ng-messages for=register.state.$error ng-if=register.state.$dirty><div ng-message=required>Seleccione Estado</div></ng-messages></div></div><div class="col-xs-12 col-sm-5 col-md-5 col-lg-5"><label>Ciudad</label><div class=form-group><ui-select name="" on-select="" ng-model=vm.city class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected}}</ui-select-match><ui-select-choices repeat="list in vm.cityCollection"><div ng-bind=list></div></ui-select-choices></ui-select><input name=city ng-model=vm.city type=hidden required><ng-messages for=register.city.$error ng-if=register.city.$dirty><div ng-message=required>Seleccione Ciudad</div></ng-messages></div></div></div><br><div class=row><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Código Postal</label><div class=form-group><input name=zip type=number placeholder="" ng-model=vm.user.location.zip ng-change="" class=form-control ng-maxlength=4 ng-minlength=4 required><ng-messages for=register.zip.$error ng-if=register.zip.$dirty><div ng-message=maxlength>Código postal muy largo</div><div ng-message=minlength>Código postal muy corto</div><div ng-message=required>Ingrese Código postal</div></ng-messages></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Tipo de Vivienda</label><div class=form-group><ui-select name="" on-select="" ng-model=vm.houseType class=cm-customSelectFilter><ui-select-match placeholder=-Seleccione->{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.houseTypeCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select><input name=houseType ng-model=vm.houseType type=hidden required><ng-messages for=register.houseType.$error ng-if=register.houseType.$dirty><div ng-message=required>Seleccione Tipo de vivienda</div></ng-messages></div></div></div></div></div><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Datos Laborales</div></div><div class=cm-whitePanelBody><div class=row><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Profesión</label><div class=form-group><input type=text ng-model=vm.user.bussiness.profession ng-change="" class=form-control></div></div><div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><label>Ocupación</label><div class=form-group><input type=text ng-model=vm.user.bussiness.job ng-change="" class=form-control></div></div><div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><label>Empresa</label><div class=form-group><input type=text ng-model=vm.user.bussiness.company ng-change="" class=form-control></div></div><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Ingreso Mesual</label><div class=form-group><input type=text ng-model=vm.user.bussiness.salary ng-change="" class=form-control></div></div></div></div></div><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Datos Complementarios</div></div><div class=cm-whitePanelBody><div class=row><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Marca del Vehiculo</label><div class=form-group><input type=text ng-model=vm.user.extraData.car.mark ng-change="" class=form-control></div></div><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Modelo</label><div class=form-group><input type=text ng-model=vm.user.extraData.car.model ng-change="" class=form-control></div></div><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Año</label><div class=form-group><input type=text ng-model=vm.user.extraData.car.year ng-change="" class=form-control></div></div></div></div></div><div ng-if="vm.stateUrl === \'shell.registerUser\'" class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Datos de la Afiliación</div></div><div class=cm-whitePanelBody><div class=row><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Cedula de Afiliador</label><div class=input-group><div class=input-group-btn><ui-select name="" on-select=vm.referredIdTypeSelected() ng-model=vm.referredIdType class=cm-customSelectFilter><ui-select-match>{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="list in vm.idTypeCollection | orderBy: \'name\' | filter: {name: $select.search}"><div ng-bind=list.name></div></ui-select-choices></ui-select><input name=referredIdType ng-model=vm.referredIdType type=hidden required><ng-messages for=register.referredIdType.$error ng-if=register.referredIdType.$dirty><div ng-message=required>Seleccione Tipo de Persona</div></ng-messages></div><input name=ci pattern=[0-9]* required type=text class=form-control id=cm-ci ng-model=vm.referredNumberId ng-minlength=6 ng-maxlength=10><ng-messages for=register.ci.$error ng-if=register.ci.$dirty><div ng-message=maxlength>Cédula muy larga</div><div ng-message=minlength>Cédula muy corta</div><div ng-message=required>Ingrese Cédula</div></ng-messages></div></div></div><br><div class=row><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Banco</label><div class=form-group><input name=bank type=text ng-model=vm.user.membership.pay.bankName ng-change="" class=form-control ng-minlength=6 ng-maxlength=10 required><ng-messages for=register.bank.$error ng-if=register.bank.$dirty><div ng-message=maxlength>Banco muy largo</div><div ng-message=minlength>Banco muy corto</div><div ng-message=required>Ingrese Banco</div></ng-messages></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Nro. Referencia</label><div class=form-group><input name=transferId type=text ng-model=vm.user.membership.pay.transferId ng-change="" class=form-control ng-minlength=6 ng-maxlength=20 required><ng-messages for=register.transferId.$error ng-if=register.transferId.$dirty><div ng-message=maxlength>Referencia muy larga</div><div ng-message=minlength>Referencia muy corta</div><div ng-message=required>Ingrese Referencia</div></ng-messages></div></div><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><label>Fecha de Pago</label><div class=input-group><input name=dop ng-change="" type=text class=form-control datepicker-popup={{vm.format}} ng-model=vm.user.membership.pay.payDate is-open=vm.payOpened ng-required=true close-text=Cerrar close-text=Cerrar required disabled><ng-messages for=register.dop.$error ng-if=register.dop.$dirty><div ng-message=required>Ingrese su Fecha de Pago</div></ng-messages><span class=input-group-btn><button type=button class="btn btn-default" ng-click=vm.payOpen($event)><i class="glyphicon glyphicon-calendar"></i></button></span></div></div><div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><label>Monto</label><div class=form-group><input name=amount type=number ng-model=vm.user.membership.pay.amount ng-change="" class=form-control ng-minlength=2 ng-maxlength=6 required><ng-messages for=register.amount.$error ng-if=register.amount.$dirty><div ng-message=maxlength>Monto muy largo</div><div ng-message=minlength>Monto muy corto</div><div ng-message=required>Ingrese Monto</div></ng-messages></div></div></div><div class=row><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><p class=text-center style="face=arial; font-size:12px;text-align:left">Declaro bajo Fe de Juramento que los Fondos Provenientes de mi Actividad Económica<br>son de una fuente lícita y no tienen relación alguna con capitales, bienes, haberes o<br>beneficios derivados de las actividades ilícitas de los delitos de <b>Legitimación de</b><br><b>Capitales y Financiamiento al Terrorismo Previstos en la Ley Orgánica Contra la</b><br><b>Delincuencia Organizada y demás Leyes que rigen la materia.</b><br><br>Todos los datos suministrados por mí son ciertos y autorizo a verificarlos en cualquier momento.<br><br>Asimismo, solicito que me participe acerca de los planes preferenciales a los cuales tenga<br>acceso mediante esta afiliación.<br><br><i>Inversiones Aprofe, CA, garantiza que estos datos serán de usuo exclusivo de la empresa</i><br><i>Cuenta Corriente Banesco 0134-0261-2926-1102-5549 de Inversiones Aprofe CA</i><br><i>Rif: J-31216127-2, inversionesaprofe@gmail.com</i><br></p></div></div><div class=row><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class=form-group></div></div></div></div></div><div class=cm-whitePanelFoot><button ng-if="vm.stateUrl === \'shell.myProfile.view.edit\'" type=submit class="btn cm-cmBtn cm-btnMd" ng-click=vm.saveProfile(register)>Guardar</button> <button ng-if="vm.stateUrl === \'shell.registerUser\'" class="btn cm-cmBtn cm-btnMd" ng-click=vm.createMembership(register)>Afiliar</button></div></div></div></form></section></div></div>');
  $templateCache.put('views/backSubNavBar.html',
    '<section class=cm-pageActionBar><div class=clearfix><a ui-sref=^ class="cm-cmBtn cm-bdlArrowBtn"><i class="fa fa-angle-left"></i>Back</a></div></section>');
  $templateCache.put('views/createExpSubNavBar.html',
    '<section class=cm-pageActionBar><div class=clearfix><h1 class=cm-mainPageTitle ng-click=vm.toggleNextButton()>{{vm.title}}</h1><a class=cm-crossBtnLg ui-sref={{vm.progressCrossNavClosePrevState}}></a> <a class=cm-progressBarBtn ng-click=vm.pgsStatusNext()><div ng-style="{\'width\' : vm.pgsStatusPercent}" class=cm-progressBar></div><span ng-bind=vm.pgsStatusText></span></a></div></section>');
  $templateCache.put('views/dropDownCrossNavBar.html',
    '<div class=clearfix><a class=cm-mainLogo></a> <a class=cm-crossBtnLg ui-sref={{vm.progressCrossNavClosePrevState}}></a><nav class=cm-tabGroup><ul class=clearfix><li class="cm-loggedUserTab cm-active"><a><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" ng-src={{vm.userDp}} alt=""></figure>Jonathan W</a></li></ul></nav></div>');
  $templateCache.put('views/marketingBanner.html',
    '<div class="container cm-height100"><div class="cm-marketingBannerInner clearfix"><div class=cm-marketingBnrText><h1>Welcome to the <span>Global Community</span></h1><p>Find and match with other classrooms, join projects, and create amazing spaces for collaborative projects.</p><div><a class="cm-cmBtn cm-focusedBtn">SIGN UP FOR FREE</a> <a class=cm-cmBtn>LEARN MORE</a></div></div><div class=cm-marketingBannerVideo></div></div><div class=clearfix><a class=cm-hideIntroBtn ng-click=vm.hideBanner()>Hide Intro <i class="fa fa-times"></i></a></div></div>');
  $templateCache.put('views/messageSubNavBar.html',
    '<section class=cm-pageActionBar><div class=clearfix><h1 class=cm-mainPageTitle>{{vm.title}}</h1><ul class="cm-bdBtnGroup clearfix"><li><a ng-click=vm.logout() class="cm-cmBtn cm-bdBtn cm-btnSm">Salir</a></li></ul><nav class=cm-tabGroup><ul class=clearfix><li ng-class="{\'cm-active\':state.isActiveTab}" ng-repeat="state in vm.navStates | orderBy: \'navOrder\'" ng-if=!vm.hidetabs><div ng-if="!state.isActiveTab && (state.notification>0)" class=cm-notificationCounter><span class=cm-countBubble>{{state.notification}}</span></div><a ui-sref={{state.name}}>{{state.title}}</a> <span ng-if=state.isActiveTab class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li></ul></nav></div></section>');
  $templateCache.put('views/messageTopNavBar.html',
    '<header class=cm-mainHeader><div class=clearfix><a class=cm-mainLogo></a><nav class=cm-tabGroup><ul class=clearfix><li><a ui-sref=shell.connections>Find Connections</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li><li class="cm-loggedUserTab cm-active"><a><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" src={{vm.userDp}} alt=""></figure>Jonathan W</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow" ng-class="{\'cm-selectedBannerArrow\': !vm.isBannerVisible()}"></span></li></ul></nav></div></header>');
  $templateCache.put('views/oneNavShell.html',
    '<header class=cm-singleBarHeader ng-class="{\'cm-mainHeader\':vm.dropDownCrossNav}" ui-view=topNavBar></header><section class=cm-singleBarContent ui-view=content></section>');
  $templateCache.put('views/profileSubNavBar.html',
    '<section class=cm-pageActionBar><div class="container clearfix"><h1 class=cm-mainPageTitle>My Profile</h1><ul class="cm-bdBtnGroup clearfix"><li><a class="cm-cmBtn cm-bdBtn cm-btnSm">Log In</a></li></ul><nav class=cm-tabGroup><ul class=clearfix><li><a>Experiences</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li><li><a>Connections</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li><li><a>Messages</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li><li class=cm-active><a>Profile</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li></ul></nav></div></section>');
  $templateCache.put('views/progressCrossNavBar.html',
    '<section class=cm-pageActionBar><div class=clearfix><h1 class=cm-mainPageTitle>{{vm.progressCrossNavtitle}}</h1><a class=cm-crossBtnLg ui-sref={{vm.progressCrossNavClosePrevState}}></a></div></section>');
  $templateCache.put('views/shell.html',
    '<header class=cm-twoBarHeader ng-class="{\'cm-marketingBnrOpen\': vm.isBannerVisible()}"><nav ui-view=topNavBar></nav><section class=cm-marketingBanner ng-if=vm.isBannerVisible() ui-view=marketingBanner></section><nav ui-view=subNavBar></nav></header><section ui-view=content class="cm-twoBarContent cm-bgWhite" ng-class="{\'cm-marketingBnrOpen\': vm.isBannerVisible()}"></section>');
  $templateCache.put('views/subNavBar.html',
    '<section class=cm-pageActionBar><div class=clearfix><h1 class=cm-mainPageTitle>Find Connections</h1><form class="navbar-form cm-pageSearchBar" role=search><input type=text class=form-control placeholder="Search Keywords..."> <button type=submit class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button></form></div></section>');
  $templateCache.put('views/topNavBar.html',
    '<div class=cm-mainHeader><div class=clearfix><a class=cm-mainLogo></a><ul ng-if=!vm.isLoggedIn() class="cm-bdBtnGroup clearfix"><li><a class="cm-cmBtn cm-bdBtn cm-btnSm" ng-click=vm.login()>Entrar</a></li></ul><nav ng-if=vm.isLoggedIn() class=cm-tabGroup><ul class=clearfix><li><a ui-sref=shell.connections>Buscar Productos</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow"></span></li><li class="cm-loggedUserTab cm-active"><a ui-sref=shell.myProfile.view><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" src={{vm.user.avatar}} alt=""></figure>{{vm.user.displayName}}</a><span class="glyphicon glyphicon-triangle-top cm-selectedArrow" ng-class="{\'cm-selectedBannerArrow\': !vm.isBannerVisible()}"></span></li></ul></nav></div></div>');
  $templateCache.put('views/cmConnection.template.html',
    '<div class="cm-cardListingBlock {{colClass}}"><div class="cm-connecProfileCard cm-greenBorderCard" ng-class="{\'cm-profileRequestCard\': (colSize === 1)&&(profile.status === \'request\')}"><div class=cm-basicBio><div class=cm-connecNCWrap><div class=cm-connecName ng-click=toProfile(profile.id)>{{profile.displayname}}</div><div class=cm-connecAdrs><img ng-src={{profile.flag}} class=cm-flag alt=""><div class=cm-connecAdrsTxt>{{profile.location}}<br>{{profile.country}}</div></div></div><figure class=cm-userImg ng-click=toProfile()><img alt="" ng-src={{profile.avatar}} class="cm-userImgDp cm-userImgMd"></figure></div><div class=cm-expandedBio><div class=cm-subLangWrap><div class=cm-bioField><span class=cm-biolabel>Subjects</span>{{profile.subjectsString}}</div><div class=cm-bioField><span class=cm-biolabel>Languages</span>{{profile.languagesString}}</div></div><div class=cm-AgeStatusBtnWrap><div class=cm-bioField><span class=cm-biolabel>Ages</span>{{profile.ages}}</div><a class=cm-statusBtn ng-if="profile.status === \'connect\'" ng-click=connect()>connect</a> <a class="cm-statusBtn cm-statusPending" ng-if="profile.status === \'pending\'" ng-click="">pending</a> <a class=cm-statusBtn ng-if="profile.status === \'message\'" ng-click="">message</a></div></div><div class=cm-requestRespondBtns ng-if="profile.status === \'request\'"><a class="btn cm-cmBtn cm-acceptBtn">Accept</a> <a class="btn cm-cmBtn">Cancel</a></div></div></div>');
  $templateCache.put('views/cmConnectionTag.template.html',
    '<div class="col-sm-6 cm-widgetBlock"><div class="cm-connecProfileCard cm-greyBorderCard {{connection.border}}" ng-disabled=connection.disabled><div class=cm-basicBio><div class=cm-connecNCWrap><div class=cm-connecName>{{connection.displayname}}</div><div class=cm-connecAdrs><img src={{connection.flag}} class=cm-flag alt=""><div class=cm-connecAdrsTxt>{{connection.location}}<br>{{connection.country}}</div></div></div><figure class=cm-userImg><img alt="" src={{connection.avatar}} class="cm-userImgDp cm-userImgMd"></figure></div></div></div>');
  $templateCache.put('views/cmCountChars.template.html',
    '<span ng-bind=countCharOf(chars) ng-class="countCharOf(chars) < 0 ? \'cm-highlightRed\' : \'\' "></span>');
  $templateCache.put('views/cmCountWords.template.html',
    '<span ng-bind=countOf(words) ng-class="countOf(words) < 0 ? \'cm-highlightRed\' : \'\' "></span>');
  $templateCache.put('views/cmDiscussion.template.html',
    '<div class=cm-expDiscussionBoard><h1>{{discussion.subject}}</h1><div class="cm-singleDBPost clearfix"><figure class=cm-userImg><img alt="" src={{discussion.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-singleDBPostContent><div class="cm-singleDBPostHdr clearfix"><div class=cm-userMetaInfo><div class=cm-userTitle>{{discussion.displayname}}<span class=cm-metaCountry>/ {{discussion.location}}</span></div><div class=cm-singleDBPostMeta>{{discussion.timestamp | date:\'MMM d, yyyy / hh:mma\'}}{{ " " +timeZone}} <span class=cm-MetaCommentsCount ng-class="{\'greyCommentIcon\': (comments.length>0)}"><span class="glyphicon glyphicon-comment"></span> {{comments.length}}</span></div></div><a class=cm-editExpLink ui-sref="shell.myExperience.modification.editExperience({id: discussion.experience_id})"><i class="fa fa-pencil"></i> Edit Experience</a></div><div class=cm-singleDBPostBody>{{discussion.body}}</div><div class="cm-singleDBPostFooter clearfix"><a class=cm-addCmntReplyLink ng-click=expandCommentBox()>Add Comment</a> <a ng-click=goToBottom() class="btn cm-scrollBtn cm-bdBtn cm-btnSm"><i class="fa fa-angle-double-down"></i></a></div><div ng-repeat="comment in comments" class="cm-singleDBPost cm-singleDBPostComment clearfix"><figure class=cm-userImg><img alt="" src={{comment.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-singleDBPostContent><div class="cm-singleDBPostHdr clearfix"><div class=cm-userMetaInfo><div class=cm-userTitle>{{comment.displayname}}<span class=cm-metaCountry>/ {{comment.location}}</span></div><div class=cm-singleDBPostMeta>{{comment.timestamp | date:\'MMM d, yyyy / hh:mma\'}}{{ " " +timeZone}} <a class=cm-metaEditPost>Edit</a></div></div></div><div class=cm-singleDBPostBody>{{comment.body}}<div class=cm-singleDBPostMedia><img ng-repeat="img in comment.attachedImages" src={{img.link}} alt=""></div></div><div class="cm-singleDBPostFooter clearfix"><a class=cm-addCmntReplyLink ng-click=expandCommentBox()>Reply</a></div><div ng-repeat="reply in comment.commentReply" class="cm-singleDBPost cm-singleDBPostReply clearfix"><figure class=cm-userImg><img alt="" src={{reply.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-singleDBPostContent><div class="cm-singleDBPostHdr clearfix"><div class=cm-userMetaInfo><div class=cm-userTitle>{{reply.displayname}}<span class=cm-metaCountry>/ {{reply.location}}</span></div><div class=cm-singleDBPostMeta>{{reply.timestamp | date:\'MMM d, yyyy / hh:mma\'}}{{ " " +timeZone}} <a class=cm-metaEditPost>Edit</a></div></div></div><div class=cm-singleDBPostBody>{{reply.body}}</div></div></div><div id=discussionEnd></div></div></div></div></div></div>');
  $templateCache.put('views/cmDropDown.template.html',
    '<div class=dropdown><div class="dropdown-toggle form-control" data-toggle=dropdown aria-expanded=false>{{placeHolder}}</div><ul class=dropdown-menu role=menu ng-scrollbars><li ng-repeat="val in values" ng-click=optionSelected(val)><a>{{val.name}}</a></li></ul></div>');
  $templateCache.put('views/cmExperienceInvitationTag.template.html',
    '<div class="cm-connecProfileCard cm-greyBorderCard"><div class=cm-basicBio><div class=cm-connecNCWrap><div class=cm-connecName>Janice A</div><div class=cm-connecAdrs><img alt="" class=cm-flag src=images/flags/usa.png><div class=cm-connecAdrsTxt>SEATTLE, WA<br>UNITED STATES</div></div></div><figure class=cm-userImg><img class="cm-userImgDp cm-userImgMd" src=images/avatars/user_img.png alt=""></figure></div><div class=cm-resetInviteBtnGroup><a class="btn cm-cmBtn">Resend Invite</a> <a class="btn cm-cmBtn">Remove</a></div></div>');
  $templateCache.put('views/cmExperienceTag.template.html',
    '<div ng-class="{\'col-sm-3 col-xs-3\': (cardType === \'full\'), \'cm-cardListingBlock\':(cardType === \'full\'),\'col-sm-6\':(cardType === \'half\'),\'cm-widgetBlock\':(cardType === \'half\')}"><div class=cm-expCard ng-class="{\'cm-greyBorderCard\':(cardType === \'half\')}"><span ng-if="(experience.notification > 0) && (cardType === \'full\')" class=cm-countBubble>{{experience.notification}}</span> <img class=cm-expImg ng-src={{experience.image}} alt="" ng-click=goToExperienceDrawer()><div class=cm-expDetails><figure class=cm-userImg><img alt="" ng-src={{experience.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-expTitle ng-click=goToExperienceDrawer()>{{experience.name}}</div><div class=cm-expDuration ng-click=goToExperienceDrawer()>{{experience.startdate | date:\'MMM d, yyyy\'}} — {{experience.enddate | date:\'MMM d, yyyy\' }}</div><p class=cm-expDesc ng-if="(cardType === \'full\')" ng-click=goToExperienceDrawer()>{{experience.description}}</p><div class=cm-expActionBar ng-if="(cardType === \'full\')"><div class=cm-expStatus ng-class="{\'cm-completed\': experience.status === \'completed\',\'cm-pending\': experience.status === \'pending\',}">{{experience.status}}</div><a class=cm-expEdit ng-click=editExperience(experience.id)><i class="fa fa-pencil"></i></a></div></div></div></div>');
  $templateCache.put('views/cmFeedCard.template.html',
    '<div ng-mouseenter="card.chat = (true && (type === \'participants\'))" ng-mouseleave="card.chat = (false && (type === \'participants\'))" class=cm-userDpInfoBox ng-click=isClicked() ng-class="{\'cm-unread\':card.new && !(type === \'chats\'), \'cm-active\':card.teacher, \'cm-chatLive\': card.chat}"><figure class=cm-userImg><span ng-if=card.online class=cm-countBubble></span> <img alt="" ng-src={{card.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div ng-if="(type === \'feeds\' || type === \'messages\' || type === \'chats\')" class=cm-userInfoArea><div ng-if="(type === \'chats\')" class=cm-publishTime2>{{card.time}}</div><div ng-if="!(type === \'chats\')" ng-class="{\'cm-userTitle3\': (type===\'messages\'),\'cm-userTitle2\': (type===\'feeds\')}">{{card.title.substring(0, 24) + \'...\'}}<div ng-if="(type===\'messages\')&&(card.add!==true)" class=cm-publishTime am-time-ago=card.createdon></div></div><div class=cm-feedGlimpse>{{card.text}}</div></div><div ng-if="(type === \'participants\')" class=cm-userInfoArea><div class=cm-userTitle>{{card.displayname}}</div><div class=cm-userState>{{card.teacher ? \'teacher/\' : \'\'}}{{card.location}}</div></div></div>');
  $templateCache.put('views/cmFeedContainer.template.html',
    '<div class=chatListBox><div class=cm-chatListLabel>{{container.title}}</div><cm-feed-card ng-repeat="card in container.cards" card-number=$index card=card type=cardType></cm-feed-card></div>');
  $templateCache.put('views/cmFilter.template.html',
    '<div class=cm-filterBlock><div class=cm-filterBlockHeader><div class=cm-filterBlockTitle>{{heading}}</div><a class=cm-filterBlockAddBtn ng-click=addClicked() ng-if="!allValuesEmpty && isSelectedEmpty && !isSelecting"><i class="fa fa-plus"></i></a></div><div class=cm-form><div class="checkbox form-group" ng-repeat="list in selected | orderBy: \'name\'"><label><input type=checkbox ng-model=list.isChecked> {{list.name}} <span class="glyphicon glyphicon-ok"></span></label></div><div class=form-group ng-if=isSelecting><cm-drop-down place-holder=placeHolder values=all model=newSelected on-select=onSelection(newSelected)></cm-drop-down></div><a class=cm-filterBlockAddBtn2 ng-click=addClicked() ng-if="!isSelectedEmpty && !allValuesEmpty && !isSelecting"><span class=cm-addIcon><i class="fa fa-plus"></i></span>Add</a></div></div>');
  $templateCache.put('views/cmGreyDropDown.template.html',
    '<div class=dropdown><div class="dropdown-toggle form-control" data-toggle=dropdown aria-expanded=false>{{placeHolder}}</div><ul class=dropdown-menu role=menu ng-scrollbars><li ng-repeat="val in values | orderBy: orderByAttr" ng-click=optionSelected(val)><a>{{val.name}}</a></li></ul></div>');
  $templateCache.put('views/cmMessageExcerpt.template.html',
    '<div class=cm-messageBlock ng-class="{\'cm-active\':message.isActive}"><div ng-show="message.state === \'unread\'" class=cm-messageUnreadTag></div><figure class=cm-userImg><img class="cm-userImgDp cm-userImgSm" src={{message.displaypicture}} alt=""></figure><div class=cm-messageInfoMini><div class=cm-messageBlockHeader><div class=cm-messageFrom ng-bind=message.from></div><label class=cm-checkBoxAlone><input type=checkbox> <span class="glyphicon glyphicon-ok"></span></label><div class=cm-messageTime am-time-ago=message.created></div></div><div class=cm-messageSubject ng-bind=message.subject></div><div class=cm-messageDesc ng-bind-html=message.text></div></div></div>');
  $templateCache.put('views/cmPostDiscussion.template.html',
    '<div class=cm-height100><section class=cm-contentActionBar><div class=cm-mainPageTitle>Post a New Discussion</div></section><section class=cm-postDiscussionWrapper><div class=cm-postDiscussionInner><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Discussion Title</div><a class=cm-whitePanelHeaderLink ng-click=cancelPost()>Delete this Discussion</a></div><div class=cm-whitePanelBody><div class="cm-greyForm cm-form"><div class=form-group><label class=sr-only>Discussion Title</label><input type=text class=form-control></div></div></div></div><div class=cm-whitePanel><div class=cm-whitePanelHead><div class=cm-whitePanelTitle>Message</div><a class="btn cm-cmBtn cm-bdBtn cm-btnSm cm-whitePanelHdrBtn">Add Image(s) or Video</a></div><div class=cm-whitePanelBody><div class="cm-greyForm cm-form"><div class=form-group><label class=sr-only>Message</label><div><summernote ng-model=content config="{ height: 177,toolbar: [[\'style\', [\'bold\', \'italic\', \'underline\', \'clear\']],[\'color\', [\'color\']],[\'para\', [\'ul\', \'ol\', \'paragraph\']],[\'height\', [\'height\']]]}" class=form-control></summernote></div></div></div></div><div class=cm-whitePanelFoot><div class=cm-rytTxt>Word Count:<cm-word-count words=content></cm-word-count></div></div></div><div><button class="btn cm-formBtn cm-submitBtn" ng-click=cancelPost()>Post Discussion</button> <button class="btn cm-formBtn" ng-click=cancelPost()>Cancel</button></div></div></section></div>');
  $templateCache.put('views/cmSearch.template.html',
    '<div><div class=cm-saveSearchPresetTitle>{{heading}}</div><ul><li ng-repeat="search in searches">{{(showCharacters === "")? search.name : (search.name.substr(0,showCharacters)+\'...\')}} <a class=cm-removeSearch ng-click=removeSearch(search)><i class="fa fa-times"></i></a></li></ul></div>');
  $templateCache.put('views/cmTimeLine.template.html',
    '<div class=cm-expTimelineInner><div class=cm-expTimelineHeader><div class="expTimelineTitle cm-bdBtn cm-btnSm">Latest Discussions</div></div><div class=cm-expTimelineBody><div class=clearfix><div class="cm-expPostPanel left" id=leftPanel><time-line-event ng-repeat="event in timeLineleft" event=event></time-line-event></div><div class="cm-expPostPanel right" id=rightPanel><time-line-event ng-repeat="event in timeLineRight" event=event></time-line-event></div></div></div><div class=cm-expTimelineFooter><div class="expTimelineTitle cm-bdBtn cm-btnSm">Begin Project // Apr 15, 2015</div></div></div>');
  $templateCache.put('views/sideBarContainer.template.html',
    '<aside class=cm-sideBarWrapper ng-class="{\'cm-sideBarExpanded\': open }"><a class=cm-sideBarExpandBtn ng-click=invertState()><i class="fa fa-angle-left"></i><i class="fa fa-angle-right"></i></a><div ng-transclude class=transclude></div></aside>');
  $templateCache.put('views/timeLineEvent.template.html',
    '<section class="cm-expSinglePost cm-greenBorderCard" ng-class="{\'marginTop40\':event.applyMargin}"><div class=cm-singlePostHeader ng-click=goToDiscussion()><h1 class=cm-singlePostTitle>{{event.title}}</h1></div><div class=cm-singlePostBody><div class=cm-multipleMedia><div ng-repeat="media in event.media" style=background-image:url({{media}}) class=cm-mediaBox ng-class="{\'cm-singleRowMedia\':($index === 0),\'cm-halfRowMedia\':($index !==0)}"></div></div><p class=cm-singlePostDesc>{{event.text}}</p></div><div class=cm-singlePostFooter><div class=cm-singlePostPublishTime am-time-ago=event.createdon></div><a class="btn cm-cmBtn cm-readmoreBtn" ng-click=goToDiscussion()><i class="fa fa-angle-right"></i></a> <a class="btn cm-cmBtn cm-commentBtn" ng-click=goToDiscussion() ng-class="{\'cm-commentActive\': (event.comments.count>0)}"><span class="glyphicon glyphicon-comment"></span> {{event.comments.count}}</a></div><div ng-if="event.comments.latestComment.length > 0" class=cm-latestComment><div class=cm-latestCmtTitle>Latest Comment</div><div class=cm-userDpInfoBox ng-repeat="comment in event.comments.latestComment"><figure class=cm-userImg><img alt="" src={{comment.avatar}} class="cm-userImgDp cm-userImgSm"></figure><div class=cm-userInfoArea><div class=cm-userTitle>{{comment.title}}</div><div class=cm-publishTime2>{{comment.time}}</div><div class=cm-feedGlimpse>{{comment.text}}</div></div></div></div></section>');
}]);
