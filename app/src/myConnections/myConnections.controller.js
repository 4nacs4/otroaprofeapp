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
  }

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
})();
