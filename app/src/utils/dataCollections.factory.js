(function() {
    'use strict';

    angular
            .module('app')
            .factory('dataCollections', dataCollections);

    /* @ngInject */
    function dataCollections($http) {
        var idTypeCollection = [
            {"id": "V", "name": "V"},
            {"id": "E", "name": "E"},
            {"id": "J", "name": "J"},
            {"id": "G", "name": "G"}
        ];
        var civilStatusCollection = [
            {"id": "S", "name": "Soltero(a)"},
            {"id": "C", "name": "Casado(a)"},
            {"id": "V", "name": "Viudo(a)"},
            {"id": "X", "name": "Concubino"}
        ];
        var cityCollection = [];
        var countryCollection = [
            {"id": "Venezuela", "name": "Venezuela"}
        ];
        var houseTypeCollection = [
            {"id": "Propia", "name": "Propia"},
            {"id": "Alquilada", "name": "Alquilada"}
        ];
        var cellphoneTypeCollection = [
            {"id": "0416", "name": "0416"},
            {"id": "0426", "name": "0426"},
            {"id": "0412", "name": "0412"},
            {"id": "0414", "name": "0414"},
            {"id": "0424", "name": "0424"}
        ];
        var service = {
            getIdTypeCollection: getIdTypeCollection,
            getCivilStatusCollection: getCivilStatusCollection,
            getStateCollection: getStateCollection,
            getCountryCollection: getCountryCollection,
            getHouseTypeCollection: getHouseTypeCollection,
            getCellphoneTypeCollection: getCellphoneTypeCollection,
            getCityCollection: getCityCollection,
            setCityCollection: setCityCollection
        };

        return service;
        //getters
        function getIdTypeCollection() {
            return idTypeCollection;
        }
        function getCivilStatusCollection() {
            return civilStatusCollection;
        }
        function getCountryCollection() {
            return countryCollection;
        }
        function getCityCollection() {
            return cityCollection;
        }
        function getStateCollection() {
            return $http.get('datastore/venezuela.json');
        }
        function getHouseTypeCollection() {
            return houseTypeCollection;
        }
        function getCellphoneTypeCollection() {
            return cellphoneTypeCollection;
        }
        
        //setters
        function setCityCollection(state) {
            cityCollection = state.ciudades;
            console.log(state)
        }
    }
}());
