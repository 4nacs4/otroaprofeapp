(function () {
  'use strict';

  angular
    .module('app.messages', ['angularMoment' , 'ui.bootstrap'])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {

    //mappings
    $stateProvider
      .state('shell.messageBox', {
        url: '/messageBox',
        nav: 'subNavMessage2',
        title: 'Messages',
        navTitle: 'My Mail',
        navOrder: 3,
        subNavNotificationJsonName: 'messages',
        views: {
          // the main template
          'content@shell': {
            templateUrl: 'src/messages/messages.html'
          },
          // child view
          'messageFoldersColumn@shell.messageBox': {
            templateUrl: 'src/messages/mail.folderView.html'
          },
          // child views
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'src/messages/mail.html'  ,
            controller:  'mailItem as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'src/shell/messageSubNavBar.html',
            controller: 'messageSubNavBar as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'src/shell/messageTopNavBar.html'
          }
        }
      })
      .state('shell.messageBox.newMessage', {
        url: '/newMessage',
        title: 'New Mail',
        views: { 'messageBodyColumn@shell.messageBox': {
          templateUrl: 'src/messages/newMessage.html',
          controller:'newMessage as vm'
          }
        }
      })
      .state('shell.messageBox.sentItem', {
        url: '/sentItem',
        title: 'sent',
        views: {
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'src/messages/mail.sentMessages.html'
          }
        }
      })
      .state('shell.messageBox.trash', {
        url: '/trash',
        title: 'Trash',
        views: {
          'messageBodyColumn@shell.messageBox': {
            templateUrl: 'src/messages/mail.trashMessages.html'
          }
        }
      });
  }
}());
