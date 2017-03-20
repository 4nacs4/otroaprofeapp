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
}());
