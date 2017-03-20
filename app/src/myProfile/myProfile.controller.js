/**
 * @ngdoc controller
 * @module app.myProfile
 * @name myProfile
 * @description Controller for my profile Info
 */
(function (){
    
  'use strict';

    angular
        .module('app.myProfile')
        .controller('myProfile', myProfile);

    /* @ngInject */
    function myProfile(navigation, $state, profileInfo, cmFilters, restApi){
        var vm = this;
        
        vm.referredList = [];
        vm.referredLoaded = false;
        vm.searchReferredList = searchReferredList;
        vm.editProfile = editProfile;
        vm.points = 0;
        init();
        function init (){
            vm.profile = navigation.getUserDp();
            vm.isBannerVisible = navigation.getMarketingBannerStatus;
            vm.languages = cmFilters.getFilterStringForm(vm.profile.languages);
            vm.subjects = cmFilters.getFilterStringForm(vm.profile.subjects);
            vm.searchReferredList();
        }
        function editProfile(){
            $state.go('shell.myProfile.view.edit');
        }
        function searchReferredList(){
            restApi.getReferredList(vm.profile._id, 1).then(function(res) {
                console.log(res)
                vm.referredList['referredList1'] = res.data.data.users;
                vm.referredList['referredListCount1'] = res.data.data.count;
                return restApi.getReferredList(vm.profile._id, 2);
            }).then(function(res) { 
                console.log(res)
                vm.referredList['referredList2'] = res.data.data.users;
                vm.referredList['referredListCount2'] = res.data.data.count;
                vm.points = (vm.referredList['referredListCount1']*800) + (vm.referredList['referredListCount2']*500);
                vm.referredLoaded = true;
            }).catch (function(err) {
                console.log(err)
            });
        }
    }
})();
