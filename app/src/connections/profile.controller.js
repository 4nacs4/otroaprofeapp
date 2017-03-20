 /**
 * @ngdoc controller
 * @module app.connections
 * @name Profile
 * @description Controller for connection profile view
 */

(function(){
  'use strict';

  angular
    .module('app.connections')
    .controller('Profile', Profile);

  /* @ngInject */
  function Profile(profile, widgetContainer, $stateParams, auth){
    var vm = this;
    init();
    var profileAttributes  = [
      {title : 'GRADE(S) TAUGHT', detail : 'grades-taught', upperCase : 'false'},
      {title : 'AGE OF STUDENTS', detail : 'ages', upperCase : 'true'},
      {title : 'TYPE OF SCHOOL', detail : 'schooltype', upperCase : 'true'},
      {title : 'NAME OF SCHOOL', detail : 'schoolname', upperCase : 'true'},
      {title : 'SUBJECTS(S)', detail : 'subjects', upperCase : 'true'},
      {title : 'LANGUAGE(S)', detail : 'languages', upperCase : 'true'},
      {title : 'CLASS SIZE', detail : 'class-size', upperCase : 'true'},
      {title : 'INTERESTED IN', detail : 'interested_in', upperCase : 'true'},
      {title : 'LOOKING FOR', detail : 'looking_for', upperCase : 'false'}
    ];
    /////////////////////
    function init(){
        profile.get($stateParams.id)
          .then(function(res){
            vm.connect = connect;
            vm.connectionProfile = res.data;
            vm.profileAttributes = [];
            for(var i = 0 ; i <= profileAttributes.length - 1 ; i++){
              vm.profileAttributes[i] =  fillDetails(vm.connectionProfile, profileAttributes[i]);
            }

            vm.connectionWidget = widgetContainer.newWidgetContainer([
              new widgetContainer.tab('connections', vm.connectionProfile['connections'], 4),
              new widgetContainer.tab('mutual connections', vm.connectionProfile['shared-connections'], 4, true)
            ], 1);

            vm.experienceWidget = widgetContainer.newWidgetContainer([
              new widgetContainer.tab('experiences', vm.connectionProfile.experiences, 4, true)
            ]);
          });
    }
    function connect(id, displayName){
      auth.sendInvite(id, displayName);
    }
    function fillDetails(connectionProfile, accessor){
      return {
        title: accessor.title,
        data: (connectionProfile[accessor.detail]),
        upperCase: accessor.upperCase,
        defaultValue: 'N/A'
      };
    }
  }
}());
