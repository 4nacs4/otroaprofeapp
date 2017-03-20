(function(){
    'use strict';

    angular
        .module('app.registerUser')
        .factory('registerUser', registerUser);

    /* @ngInject */
    function registerUser($http){

        function getSingleExperience(experienceId){
            return $http.get('datastore/singleExperience.json');
        }
        function getExperiences(userId){
            return $http.get('datastore/myExperiences.json');
        }

        function getExperienceInviteList(){
            return $http.get('datastore/profiles.json');
        }

        var service = {
            getExperiences: getExperiences,
            getSingleExperience: getSingleExperience,
            getExperienceInviteList: getExperienceInviteList
        };

        return service;
    }
}());
