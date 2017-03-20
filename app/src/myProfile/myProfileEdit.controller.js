/**
 * @ngdoc controller
 * @module app.myProfile
 * @name myProfile
 * @description Controller for edit my profile
 */
(function (){

  'use strict';

  angular
    .module('app.myProfile')
    .controller('profileEdit', profileEdit);

  /* @ngInject */
  function profileEdit(myProfile, navigation, profile, profileInfo, cmFiltersInfo, $state){
    var vm = this;
    init();

    function init (){
        vm.addingSubject = false;
        vm.addingLanguage = false;
        vm.profile = profileInfo;
        vm.profile.ages = vm.profile.ages.replace('-', ';');
        vm.ageGroupOptions = {
            from: 3,
            to: 50,
            floor: true,
            step: 1,
            vertical: false,
            callback: function(value, elt) {
            }
        };
        vm.languageFinished = false;
        vm.subjectFinished = false;
        vm.filterCriteria = cmFiltersInfo;
        vm.isBannerVisible = navigation.getMarketingBannerStatus;
        vm.addSubject = addSubject;
        vm.addLanguage = addLanguage;
        vm.subjectAdded  = subjectAdded;
        vm.languageAdded = languageAdded;
        vm.saveProfile = saveProfile;
    }
    function addSubject(){
        if(vm.filterCriteria[4].allValues.length>0){
            vm.addingSubject = true;
            if(vm.filterCriteria[4].allValues.length === 1){
                vm.subjectFinished = true;
            }
        }

    }
    function addLanguage(){
        if(vm.filterCriteria[2].allValues.length>0) {
            vm.addingLanguage = true;
            if(vm.filterCriteria[2].allValues.length === 1){
                vm.languageFinished = true;
            }
        }
    }
    function subjectAdded(val){
        vm.filterCriteria[4].allValues.splice(vm.filterCriteria[4].allValues.indexOf(val),1);
        vm.addingSubject = false;
        vm.profile.subjects.push(val);
    }
    function languageAdded(val){
        vm.filterCriteria[2].allValues.splice(vm.filterCriteria[2].allValues.indexOf(val),1);
        vm.addingLanguage = false;
        vm.profile.languages.push(val);
    }
    function saveProfile(){
        $state.go('^');
    }

  }
})();
