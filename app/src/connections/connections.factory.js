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
}());

