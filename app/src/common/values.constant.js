/**
 * @ngdoc constant
 * @module app.common
 * @name values
 * @description Defines values which are common to the application
 */

(function(){
	'use strict';

  var values = {
    messagesValid: '<ng-messages for="{0}" ng-if="{0}.$dirty"><div ng-message="$valid">'
                    + '<span class="glyphicon glyphicon-ok cm-okIcon"></span></div></ng-messages>'
  };


	angular
		.module('app.common')
		.constant('values', values);

}());

