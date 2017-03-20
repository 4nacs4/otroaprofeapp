/**
 * @ngdoc controller
 * @module app.messages
 * @name newMessage
 * @description Controller for the new message
 */

(function(){
  'use strict';

  angular
    .module('app.messages')
    .controller('newMessage', newMessage);

  /* @ngInject */
  function newMessage(friendList,$http){

    var vm = this;
    init();
    vm.selected = undefined;

    vm.loadCountries = function($query) {
      return $http.get('datastore/searchList.json', { cache: true}).then(function(response) {
        var friends = response.data.friendList;
        return friends.filter(function(friend) {
          return friend.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
      });
    };

    function init (){
    friendList.findFriends().then(function(res){
      vm.friendList = res.data.friendList;
      });
    }

}})();
