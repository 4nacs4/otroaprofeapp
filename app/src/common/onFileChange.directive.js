/**
 * @ngdoc directive
 * @name app.common.directive:onFileChange
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

(function () {

  'use strict';

  angular
    .module('app.common')
    .directive('onFileChange', onFileChange);

  /* @ngInject */
  function onFileChange() {

    return {
      link: link,
      restrict: 'A'
    };

    /////////////////////

    function link(scope, elem, attrs) {
      var onChangeHandler = scope.$eval(attrs.onFileChange);
      elem.bind('change', onChangeHandler);
    }
  }

}());
