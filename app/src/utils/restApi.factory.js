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
}());
