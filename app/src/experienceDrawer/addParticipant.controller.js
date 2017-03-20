(function () {
    'use strict';
    angular
        .module('app.experienceDrawer')
        .controller('addParticipants', addParticipants);
    /* @ngInject */

    function addParticipants(students, teachers, experienceDrawer, $scope , $state) {
        var vm = this;
        vm.studentSearchText = '';
        $scope.$watch('vm.studentSearchText', function() {
            if(vm.studentSearchText.length === 0){
                vm.studentSearching = false;
            }
        });
        vm.teacherSearchText = '';
        vm.students = students;
        vm.teachers = teachers;
        vm.studentSelected = [];
        vm.teacherSelected = [];
        vm.studentInviteList = [];
        vm.teacherInviteList = [];
        vm.studentSearching = false;
        vm.teacherSearching = false;
        vm.matchedStudent = [];
        vm.matchedTeacher = [];
        vm.accountCreated = false;
        vm.accountCreatedTitle = '';
        vm.creatingAccount = false;
      vm.progressCrossNavClosePrevState ='';
        vm.newStudent = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            dob: {
                month: '',
                date: '',
                year: ''
            }
        };
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
        for(i=1; i<=31;i++){
            vm.days.push(new Option(i, i));
        }
        for(i=vm.startYear; i<=vm.endYear; i++){
            vm.years.push(new Option(i,i));
        }
        function Option(id, name){
            this.id = id;
            this.name = name;
        }

        vm.connectionSelected = function(connection, selectedList){
            if(connection.disabled){
                return;
            }
            if(connection.isSelected === undefined || !connection.isSelected){
                connection.isSelected = true;
                selectedList.push(connection);
                connection.border = 'cm-selected';
            }
            else if(connection.isSelected){
                connection.isSelected = false;
                selectedList.splice(selectedList.indexOf(connection),1);
                connection.border = '';
            }
        };
        vm.addSelected = function(selected, inviteList){
            var conn;
            while(selected.length > 0){
                conn = selected.pop();
                conn.border = '';
                inviteList.push( JSON.parse(JSON.stringify(conn)));
                conn.disabled = true;
            }
        };

        vm.searchStudent = function(){
            if(vm.studentSearchText.length>0){
                vm.studentSearching = true;
                experienceDrawer.findStudentsByName(name).then(function(res){
                    vm.matchedStudent =  res.data.students;
                });
            }
        };
      vm.sendInviteClick = function () {
          if(vm.studentInviteList.length !== 0 || vm.teacherInviteList.length !== 0){
            vm.progressCrossNavClosePrevState =  (typeof($state.$current.oneNavBarClosePrevState) !== undefined)? $state.$current.oneNavBarClosePrevState : '^';
            if(vm.progressCrossNavClosePrevState === '') {
              vm.progressCrossNavClosePrevState = 'shell.connections';
            }
            $state.go(vm.progressCrossNavClosePrevState);

          }
      };

        vm.createStudentAccount = function(){
            vm.studentSearchText = '';
            vm.accountCreated = true;
            vm.accountCreatedTitle = vm.newStudent.firstName + ' ' + vm.newStudent.lastName;
            vm.creatingAccount = false;
            vm.studentSearching = false;
        };

        vm.searchTeacher = function(){
            if(name.length>0){
                vm.teacherSearching = true;
                experienceDrawer.findTeacherByName(name).then(function(res){
                    vm.matchedTeacher =  res.data.teachers;
                });
            }
        };

        vm.stopSearchStudent = function(){
            vm.studentSearching = false;
            vm.studentSearchText = '';
        };

        vm.stopSearchTeacher = function(){
            vm.teacherSearching = false;
            vm.teacherSearchText = '';
        };
    }


})();
