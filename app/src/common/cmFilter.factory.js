(function(){
    'use strict';

    angular
        .module('app.common')
        .factory('cmFilters', cmFilters);

    /* @ngInject */
    function cmFilters($http){
        function getTypeOfSchools(){
            return $http.get('datastore/schooltype.json');
        }
        function getLanguageFilter(){
            return $http.get('datastore/languages.json');
        }
        function getAgesFilter(){
            return $http.get('datastore/studentages.json');
        }
        function getSubjectsFilter(){
            return $http.get('datastore/subjects.json') ;
        }
        function getClassSizeFilter(){
            return $http.get('datastore/gradestaught.json');
        }
        function getCountryFilter(){
            return $http.get('datastore/country.json');
        }
        function getInterestFilter(){
            return $http.get('');
        }
        function getLookingForFilter(){
            return $http.get('datastore/lookingfor.json');
        }
        function getSavedSearches(){
            return $http.get('datastore/savedsearches.json');
        }
        function getRecentSearches(){
            return $http.get('datastore/recentsearches.json');
        }
        function getFilterStringForm(filterVal){
            var string = '';
            angular.forEach(filterVal, function(filter){
                string = string + filter.name + ', ';
            });
            return string.substring(0,string.length-2);
        }
        function convertProfilesArrayToString(profiles){
            angular.forEach(profiles, function(profile){
                profile.subjectsString = (getFilterStringForm(profile.subjects));
                profile.languagesString = (getFilterStringForm(profile.languages));
            });
        }

        function returnFilterCriteria(selectedFilters){
            var filterCriteria = [
                {
                    jsonArrayName: 'country',
                    heading: 'country',
                    selectedValues: [],
                    placeHolder: 'Add a country',
                    allValues: [],
                    getAllValues: getCountryFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'student-ages',
                    heading: 'age group',
                    selectedValues: [],
                    placeHolder: 'Add an Age Group',
                    allValues: [],
                    getAllValues: getAgesFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'languages',
                    heading: 'language(s) spoken',
                    selectedValues: [],
                    placeHolder: 'Add a Language',
                    allValues: [],
                    getAllValues: getLanguageFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'gradestaught',
                    heading: 'class size',
                    selectedValues: [],
                    placeHolder: 'Add a Class Size',
                    allValues: [],
                    getAllValues: getClassSizeFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'subjects',
                    heading: 'subjects',
                    selectedValues: [],
                    placeHolder: 'Add a Subject',
                    allValues: [],
                    getAllValues: getSubjectsFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'interests',
                    heading: 'interests',
                    selectedValues: [],
                    placeHolder: 'Add an Interest',
                    allValues: [],
                    getAllValues: getInterestFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'lookingfor',
                    heading: 'looking for',
                    selectedValues: [],
                    placeHolder: 'Add Looking For',
                    allValues: [],
                    getAllValues: getLookingForFilter,
                    newSelectedValue: '',
                    inSideBar: true
                },
                {
                    jsonArrayName: 'schooltype',
                    heading: 'school type',
                    selectedValues: [],
                    placeHolder: 'Add School Type',
                    allValues: [],
                    getAllValues: getTypeOfSchools,
                    newSelectedValue: '',
                    inSideBar: false
                }
            ];
            angular.forEach(filterCriteria, function(filter){
                filter.getAllValues().then(function(res){
                    filter.allValues = res.data[filter.jsonArrayName];
                    if(selectedFilters !== undefined){
                        filter.selectedValues = selectedFilters[filter.jsonArrayName];
                        angular.forEach(filter.selectedValues,function(selected){
                            angular.forEach(filter.allValues, function(value){
                                if(selected.name === value.name){
                                    var i = filter.allValues.indexOf(value);
                                    if(i !== -1) {
                                        filter.allValues .splice(i, 1);
                                    }
                                }
                            });
                        });
                    }
                });

            });
            return filterCriteria;
        }
        function returnSearches(){
            var searches = [
                {
                    heading: 'Recent Searches',
                    list: [] ,
                    getList: getRecentSearches,
                    showCharacters: 26,
                    jsonArrayName: 'recentsearches'
                },
                {
                    heading: 'Saved Searches',
                    list: [],
                    getList: getSavedSearches,
                    jsonArrayName: 'savedsearches'
                }
            ];
            angular.forEach(searches, function(search){
                search.getList().then(function(res){
                    search.list = res.data[search.jsonArrayName];
                });
            });
            return searches;
        }
        var service = {
            getLanguageFilter: getLanguageFilter,
            getAgesFilter: getAgesFilter,
            getSubjectsFilter: getSubjectsFilter,
            getClassSizeFilter: getClassSizeFilter,
            getCountryFilter: getCountryFilter,
            getInterestFilter: getInterestFilter,
            getLookingForFilter: getLookingForFilter,
            getSavedSearches: getSavedSearches,
            getRecentSearches: getRecentSearches,
            returnFilterCriteria: returnFilterCriteria,
            returnSearches: returnSearches,
            getTypeOfSchools: getTypeOfSchools,
            getFilterStringForm: getFilterStringForm,
            convertProfilesArrayToString: convertProfilesArrayToString
        };
        return service;
    }
}());

