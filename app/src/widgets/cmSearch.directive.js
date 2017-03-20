(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('cmSearch', cmSearch);

  /* @ngInject */
  function cmSearch($document){

    var directive = {
      scope: {
        heading: '@',
        searches: '=',
        showCharacters: '@'
      },
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/cmSearch.template.html',
      replace:true
    };

    return directive;

    /////////////////////

    function link (scope, elem, attrs){
      scope.removeSearch = function(value){
        var i = scope.searches.indexOf(value);
        if(i !== -1){
          scope.searches.splice(i, 1);
        }
      };
    }
  }
}());
