(function(){
    'use strict';

    angular
        .module('app.experienceDrawer')
        .controller('experienceDrawer', experienceDrawer)
        .controller('sideBarControllerExpDrawer', sideBarControllerExpDrawer);

    function sideBarControllerExpDrawer(data, cardType){
        var vm = this;
        vm.sideBarContent = data;
        vm.cardType = cardType;
    }

    /* @ngInject */
    function experienceDrawer(pageType,expId, timeLine, notification, experienceDrawer, $state , $location, $anchorScroll, navigation){
        var vm = this;
        vm.sideBarTabs = [];
        vm.options = {
          height: 125,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
          ]
        };

        init();
        /////////////////////
        function init(){
            vm.expanded = true;
            vm.userDp = navigation.getUserDp();
            vm.pageType = pageType;
            vm.expId = expId;
            vm.timeLine = timeLine;
            vm.sideFilterOpen = true;
            vm.sideFilterClosed = false;
            vm.notification = notification;
            vm.goToAddParticipant = goToAddParticipant;
            vm.goToDiscussion = goToDiscussion;
            vm.sideBarTabs.push(new sideBarTab ('Participants', vm.notification.participants,'shell.experienceDrawer.participants' ,'', vm.goToAddParticipant,true));
            vm.sideBarTabs.push(new sideBarTab ('The Feed', vm.notification.feeds,'shell.experienceDrawer.feeds','cm-feeds',  undefined, false));
            vm.sideBarTabs.push(new sideBarTab ('Messages', vm.notification.messages,'shell.experienceDrawer.messages' ,'cm-messages',  vm.goToChats, true));
            vm.sideBarTabs.push(new sideBarTab ('Experience Information', vm.notification.info,'shell.experienceDrawer.info','cm-expInfo',  undefined, false));
            vm.activeSideBarIndex= $state.current.navIndex;
            vm.sideBarHeading = vm.sideBarTabs[vm.activeSideBarIndex].title;
            vm.sideBarButtonVisible = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonVisible;
            vm.sideBarButtonClick = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonClick;
            vm.sideBarButtonClass = vm.sideBarTabs[vm.activeSideBarIndex].iconClass;
            vm.sideBarTabs[vm.activeSideBarIndex].active = true;
        }

        vm.goToPostDiscussion = function(){
          console.log("post");
          $state.go($state.$current.name,{
            pageType: 'post',
            expId: expId
          });

        };

        vm.gotoBottom = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
            var old = $location.hash();
            $location.hash('bottomEnd');
            $anchorScroll();
            $location.hash(old);
      };

        function goToDiscussion(expId){
            $state.go($state.$current.name,{
                pageType: 'timeLine',
                expId: expId
            });
        }

        vm.getExpand = function(){
            return experienceDrawer.getExpanded();
        };

        vm.setExpand = function(bool){
            experienceDrawer.setExpanded(bool);
        };

        function goToAddParticipant(){

            $state.go('shell.addParticipants');
        }



        function sideBarTab(title, notification, state, iconClass, headingButtonClick, headingButtonVisible , active) {
            var tab = this;
            tab.title = title;
            tab.notification = notification;
            tab.state = state;
            tab.iconClass = iconClass;
            tab.active = active || false;
            tab.isVisited = false;
            tab.headingButtonClick = headingButtonClick;
            tab.headingButtonVisible = headingButtonVisible;
            tab.clicked = function(tab){
                tab.isVisited = true;
                tab.active = true;
                vm.sideBarTabs[vm.activeSideBarIndex].active = false;
                vm.activeSideBarIndex = vm.sideBarTabs.indexOf(tab);
                vm.sideBarHeading = vm.sideBarTabs[vm.activeSideBarIndex].title;
                vm.sideBarButtonVisible = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonVisible;
                vm.sideBarButtonClick = vm.sideBarTabs[vm.activeSideBarIndex].headingButtonClick;
                vm.sideBarButtonClass = vm.sideBarTabs[vm.activeSideBarIndex].iconClass;
                $state.go(tab.state);
            };
        }

    }
})(window.angular);
