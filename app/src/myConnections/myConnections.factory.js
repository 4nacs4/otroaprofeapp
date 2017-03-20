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
}());
