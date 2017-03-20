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
}());
