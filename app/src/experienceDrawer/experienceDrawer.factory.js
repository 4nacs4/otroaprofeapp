(function(){
    'use strict';

    angular
        .module('app.experienceDrawer')
        .factory('experienceDrawer', experienceDrawer);

    /* @ngInject */
    function experienceDrawer($http){

        var expanded = false;

        function getExpanded(){

          return expanded;
        }

        function setExpanded(toggle){

          expanded = toggle;
        }

        function getTimeLine(experienceId){
            return $http.get('datastore/timeline.json');
        }
        function getSideBarNotification(experienceId){
            return $http.get('datastore/experiencedrawernotification.json');
        }

        function getSideBarFeeds(experienceId){
            return $http.get('datastore/experienceDrawerFeeds.json');
        }

        function getSideBarParticipants(experienceId){
            return $http.get('datastore/experienceDrawerParticipants.json');
        }

        function getSideBarExpInfo(experienceId){
            return $http.get('datastore/experienceDrawerInfo.json');
        }

        function getSideBarMessages(){
            return $http.get('datastore/experienceDrawerMessages.json');
        }

        function getSideBarMessagesChat(messageId){
            return $http.get('datastore/experienceDrawerChats.json');
        }

        function getAddParticipantTeachers(){
            return $http.get('datastore/addParticipantTeachers.json');
        }

        function getAddParticipantStudents(){
            return $http.get('datastore/addParticipantStudents.json');
        }

        function findStudentsByName(name){
            return $http.get('datastore/addParticipantStudentByName.json');
        }

        function findTeacherByName(name){
            return $http.get('');
        }

        function populateDiscussionBoard(){
          return $http.get('datastore/discussion.json');

        }

        var service = {
            getTimeLine: getTimeLine,
            getSideBarNotification: getSideBarNotification,
            getSideBarFeeds: getSideBarFeeds,
            getSideBarParticipants: getSideBarParticipants,
            getSideBarExpInfo: getSideBarExpInfo,
            getSideBarMessages: getSideBarMessages,
            getSideBarMessagesChat: getSideBarMessagesChat,
            getAddParticipantTeachers: getAddParticipantTeachers,
            getAddParticipantStudents: getAddParticipantStudents,
            findStudentsByName: findStudentsByName,
            findTeacherByName: findTeacherByName,
            populateDiscussionBoard : populateDiscussionBoard,
            setExpanded : setExpanded,
            getExpanded : getExpanded
        };

        return service;
    }
}());

