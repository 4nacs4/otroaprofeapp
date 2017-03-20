/**
 * @ngdoc controller
 * @name app.myProfile.controller:ParentDashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.myProfile')
		.controller('ParentDashboard', ParentDashboard);

  /* @ngInject */
	function ParentDashboard(dashboardData){
		var vm = this;
        vm.data = dashboardData;


        


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.myProfile.controller:ParentDashboard
     * @description
     * My Description rules
     */

	}

}());
