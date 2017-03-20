/**
 * @ngdoc controller
 * @module app.common
 * @name LoginModal
 * @description Controller for the Login Modal Instance
 */

(function() {
    'use strict';

    angular
            .module('app.common')
            .controller('LoginModal', LoginModal);

    /* @ngInject */
    function LoginModal($modalInstance, $http, $location, $timeout, $auth, $state, dataCollections) {
        var vm = this;
        vm.currentPage = 1;
        vm.itemsPerPage = 40;
        vm.maxSize = 10; //Number of pager buttons to show
        vm.showAvatarList = false;
        vm.idTypeCollection = dataCollections.getIdTypeCollection();
        vm.idType = vm.idTypeCollection[0];
        vm.idNumber = '';
        vm.user = {
            id: '',
            password: '',
            email: '',
            confirmPassword: '',
            firstName:'',
            displayName:'',
            lastName:'',
            personType:'',
            avatar: '/images/avatars/noAvatar.png'
        };
        
        if ($location.$$path === '/student/signUp') {
            $http.get('datastore/avatars.json').then(function(res) {
                vm.data = res.data;
                vm.totalItems = vm.data.length;
                console.log(vm.totalItems + "total");
            });
            vm.activeState = 'signUpStudent';
            vm.size = true;
        } else {
            vm.activeState = 'signIn';
            vm.size = true;
        }
        vm.updateUserImg = function(item) {
            vm.user.profileAvatar = item.image;
            vm.showList();
        };
        vm.setPage = function(pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
        };

        vm.setItemsPerPage = function(num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first paghe
        }
        vm.avatarList = {};
        vm.setActiveState = setActiveState;
        vm.login = login;
        vm.signUp = signUp;
        vm.setListValues = setListValues;
        vm.showOnState = showOnState;
        vm.months = [
            {
                id: 1,
                name: 'Jan'
            },
            {
                id: 2,
                name: 'Feb'
            },
            {
                id: 3,
                name: 'Mar'
            },
            {
                id: 4,
                name: 'Apr'
            },
            {
                id: 5,
                name: 'May'
            },
            {
                id: 6,
                name: 'Jun'
            },
            {
                id: 7,
                name: 'Jul'
            },
            {
                id: 8,
                name: 'Aug'
            },
            {
                id: 9,
                name: 'Sep'
            },
            {
                id: 10,
                name: 'Oct'
            },
            {
                id: 11,
                name: 'Nov'
            },
            {
                id: 12,
                name: 'Dec'
            }
        ];
        vm.startYear = 1970;
        vm.endYear = (new Date()).getFullYear();
        var i;
        vm.days = [];
        vm.years = [];
        for (i = 1; i <= 31; i++) {
            vm.days.push(new Option(i, i));
        }
        for (i = vm.startYear; i <= vm.endYear; i++) {
            vm.years.push(new Option(i, i));
        }
        function Option(id, name) {
            this.id = id;
            this.name = name;
        }
        vm.setAvatar = function(avatar) {
            console.log(avatar);
            vm.user.profileAvatar = avatar;
        }

        vm.showList = function() {

            if (!vm.showAvatarList) {
                vm.showAvatarList = true;
            } else {

                vm.showAvatarList = false;

            }


        }

        /////////////////////

        function setActiveState(nextState) {
            vm.activeState = nextState;
            vm.showForgotPasswordText = false
            vm.size = true
            if (nextState === 'forgotPassword') {
                $timeout(function() {
                    vm.showForgotPasswordText = true;
                }, 400);
            }
            vm.id = '';
            vm.user.id = '';
            vm.user.password = '';
            vm.user.email = '';
            vm.user.confirmPassword = '';

        }

        function showOnState(state) {
            return vm.activeState === state;
        }

        function login() {
            vm.setListValues();
            $auth.login(vm.user)
            .then(function(res) {
                $modalInstance.close(res);
            })
            .catch (function(err) {
                console.log(err)
            });
        }
        function signUp() {
            vm.setListValues();          
            $auth.signup(vm.user)
            .then(function(res) {
                $modalInstance.close(res);
            })
            .catch (function(err) {
                console.log(err)
            });
        }
        function setListValues() {
            vm.user.personType = vm.idType.id;
            vm.user.id = vm.idType.id + '-' + vm.idNumber;
            vm.user.displayName = vm.user.firstName + " " + vm.user.lastName.substr(0, 1);
        }

    }
}());
