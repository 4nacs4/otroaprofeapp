(function(){
  'use strict';

  angular
    .module('app.shell')
    .controller('Shell', Shell);

  /* @ngInject */
  function Shell(navigation, $state){
    var vm = this;
    vm.isBannerVisible = navigation.getMarketingBannerStatus;
    vm.hideBanner = navigation.hideMarketingBannner;
    vm.userDp = navigation.getUserDp();
    /////////////////////
  }
}());
