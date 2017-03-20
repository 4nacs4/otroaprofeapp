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
}());

