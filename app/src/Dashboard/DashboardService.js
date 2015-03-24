/**
 * Created by leo on 3/24/15.
 */


(function(){
    'use strict';

    angular.module('Dashboard')
        .service('DashboardService', ['$q','$http', DashboardService]);

    /**
     * Dashboard DataService
     * Dashboard embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function DashboardService($q,$http){


        var self = this;
        self.dashboardOrgUnits = [];
        self.dashboardDatasets = [];
        self.dashboardOrgUnits = [];
        self.dashboardPeriods  = [];

        self.loadOrgUnits = function(){

            var   url = "src/data/organisationUnits.json";

            $http({
                method:"GET",
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(response) {
                self.dashboardOrgUnits.push(response.organisationUnits);
            }).
                error(function(response) {

                });
            return false;

        }
        self.loadOrgUnits();



        return null;
    }

})();
///api/dataValueSets?dataSet=TfoI3vTGv1f&orgUnit=SuoqM5pXPWG