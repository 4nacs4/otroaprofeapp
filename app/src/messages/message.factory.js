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
}());
