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
}());
