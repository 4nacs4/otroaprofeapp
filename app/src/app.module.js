(function (){

  'use strict';

  angular.module('app', [
    'app.core',
    'app.common',
  /**
   * Application modules
   **/
    'app.shell',
    'app.widgets',
    'app.connections',
    'app.modals',
    'app.messages',
    'app.myProfile',
    'app.registerUser',
    'app.myConnections',
    'app.experienceDrawer'
  ]);
}());
