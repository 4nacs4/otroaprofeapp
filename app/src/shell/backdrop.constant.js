/**
 * @ngdoc constant
 * @module app.shell
 * @name backdrop
 * @description Defines the CSS classes to be added on each type of backdrop
 */

(function(){
	'use strict';

  var backdrop = {
    greenBubbles: 'cm-bubblesBg cm-bgDGreen',
    clearWhite: ''
  };

	angular
		.module('app.shell')
		.constant('backdrop', backdrop)

}());
