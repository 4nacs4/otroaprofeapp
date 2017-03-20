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
