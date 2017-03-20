/**
 * @ngdoc controller
 * @module app.registerUser
 * @name registerUser
 * @description Controller for the register Users
 */

(function() {
    'use strict';

    angular
            .module('app.registerUser')
            .controller('registerUser', registerUser);

    /* @ngInject */
    function registerUser($scope, $state, registerUser, $stateParams, $location, allFilters, dataCollections, restApi, navigation, auth) {
        //vars
        var vm = this;
        vm.profile = navigation.getUserDp();
        vm.stateUrl = $state.current.name;
        console.log(vm.stateUrl)
        vm.idTypeCollection = dataCollections.getIdTypeCollection();
        vm.civilStatusCollection = dataCollections.getCivilStatusCollection();
        vm.countryCollection = dataCollections.getCountryCollection();
        vm.cellphoneTypeCollection = dataCollections.getCellphoneTypeCollection();
        vm.houseTypeCollection = dataCollections.getHouseTypeCollection();
        vm.cityCollection = dataCollections.getCityCollection();
        vm.user = {
            _id: '',
            firstName: '',
            displayName: '',
            lastName: '',
            dob: '',
            civilStatus: '',
            weight: '',
            height: '',
            email: '',
            cellphone: '',
            phone: '',
            location: {
                address1: '',
                address2: '',
                country: '',
                state: '',
                city: '',
                zip: '',
                houseType: '',
            },
            bussiness: {
                profession: '',
                job: '',
                company: '',
                salary: ''
            },
            extraData: {
                car: {
                    mark: '',
                    model: '',
                    year: ''
                }
            },
            membership: {
                referredId: '',
                pay: {
                    date: '',
                    transferId: '',
                    bankName: '',
                    amount: ''
                },
            },
        };

        vm.country = vm.countryCollection[0];
        vm.referredIdType = vm.idTypeCollection[0];
        vm.referredNumberId = '';
        vm.format = 'dd-MMMM-yyyy';

        //functions
        vm.setCity = setCity;
        vm.createMembership = createMembership;
        vm.saveProfile = saveProfile;
        vm.loadSelectList = loadSelectList;
        vm.setListValues = setListValues;

        vm.dobToday = function() {
            vm.user.dob = new Date();
        };

        vm.dobClear = function() {
            vm.user.dob = null;
        };

        vm.payToday = function() {
            vm.user.membership.pay.date = new Date();
        };

        vm.payClear = function() {
            vm.user.membership.pay.date = null;
        };

        vm.dobOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dobOpened = true;
        };

        vm.payOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.payOpened = true;
        };


        function init() {
            vm.user = _.merge(vm.user, _.pick(vm.profile, _.keys(vm.user)))
            vm.user.userId = vm.user._id;
            delete vm.user._id;
            if (vm.user.membership)
                vm.loadSelectList();
            console.log(vm.user)
        }
        function loadSelectList() {
            vm.civilStatus = _.find(vm.civilStatusCollection, function(o) {
                return o.id === vm.user.civilStatus;
            });
            vm.country = _.find(vm.countryCollection, function(o) {
                return o.id === vm.user.location.country;
            });
            vm.houseType = _.find(vm.houseTypeCollection, function(o) {
                return o.id === vm.user.location.houseType;
            });
            vm.referredIdType = _.find(vm.idTypeCollection, function(o) {
                return o.id === vm.user.membership.referredId.split("-")[0]
            });
            vm.cellphoneType = _.find(vm.cellphoneTypeCollection, function(o) {
                return o.id === vm.user.cellphone.split("-")[0];
            });
            vm.cellphoneNumber = Number((vm.user.cellphone.split("-"))[1]);
            if(vm.user.phone.split("-")[0] != "null")
                vm.phoneType = Number(vm.user.phone.split("-")[0]);
            if(vm.user.phone.split("-")[1] != "null")
                vm.phoneNumber = Number(vm.user.phone.split("-")[1]);
            

            dataCollections.getStateCollection().then(function(res, err) {
                vm.stateCollection = res.data;
                vm.state = _.find(vm.stateCollection, function(o) {
                    return o.estado === vm.user.location.state;
                });
                if (vm.state) {
                    vm.setCity(vm.state);
                    vm.city = vm.user.location.city;
                }
            });

        }
        function setListValues() {
            vm.user.civilStatus = vm.civilStatus.id;
            vm.user.location.country = vm.country.id;
            vm.user.location.state = vm.state.estado;
            vm.user.location.city = vm.city;
            vm.user.location.houseType = vm.houseType.id;
            vm.user.cellphone = vm.cellphoneType.id + '-' + vm.cellphoneNumber;
            vm.user.phone = vm.phoneType + '-' + vm.phoneNumber;
            if (vm.stateUrl === 'shell.registerUser')
                vm.user.membership.referredId = vm.referredIdType.id + '-' + vm.referredNumberId;
        }
        function setCity(state) {
            dataCollections.setCityCollection(state);
            vm.cityCollection = dataCollections.getCityCollection();
            vm.city = vm.cityCollection[0];
        }
        function createMembership(form) {
            if (vm.stateUrl === 'shell.registerUser') {
                if (form.$valid) {
                    vm.setListValues();
                    restApi.updateUserProfile(vm.user).then(function(res) {
                        console.log(res)
                        return restApi.createMembership(vm.user)
                    }).then(function(res) {
                        navigation.setUserDp(res.data.data.user);
                        $state.go('shell.myProfile.view');
                    }). catch (function(err) {
                        auth.showMessage('Hay un error en los Datos ingresados');
                        console.log(err)
                    });
                } else {
                    _.forEach(form.$error.required, function(field) {
                        field.$setDirty();
                    });
                    angular.element("[name='" + form.$name + "']").find('.ng-invalid:first').prev().find('input').focus();
                    angular.element("[name='" + form.$name + "']").find('.ng-invalid:visible:first').focus();
                }
            }
        }
        function saveProfile(form) {
            if (form.$valid) {
                vm.setListValues();
                restApi.updateUserProfile(vm.user).then(function(res) {
                    navigation.setUserDp(res.data.data.user);
                    $state.go('shell.myProfile.view');
                    console.log(res)
                }). catch (function(err) {
                    console.log(err)
                });
            }
            else {
                _.forEach(form.$error.required, function(field) {
                    field.$setDirty();
                });
                angular.element("[name='" + form.$name + "']").find('.ng-invalid:first').prev().find('input').focus();
                angular.element("[name='" + form.$name + "']").find('.ng-invalid:visible:first').focus();
            }
        }
        init();
    }
})();
