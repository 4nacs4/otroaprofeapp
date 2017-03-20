(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('cmDiscussion', cmDiscussion);

    /* @ngInject */
    function cmDiscussion($location, $anchorScroll, experienceDrawer){

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'src/widgets/cmDiscussion.template.html',
            scope:{
                discussionId: '=',
                expand: '='
            },
            replace:true
        };

        return directive;

        /////////////////////

        function link (scope, elem, attrs){
              experienceDrawer.populateDiscussionBoard(scope.discussionId).then(function(res) {
              scope.discussion = res.data.discussion;
              scope.comments = res.data.comments;
              scope.timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
              scope.goToBottom = function(){
                var old = $location.hash();
                $location.hash('discussionEnd');
                $anchorScroll();
                $location.hash(old);
              };
            });

          scope.expandCommentBox = function(){

            experienceDrawer.setExpanded(true);


          }
        }
    }
}());
