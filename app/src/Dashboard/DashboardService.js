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
        self.dashboardOrgUnits = null;
        self.dashboardDatasets = [];
        self.dashboardOrgUnits = [];
        self.dashboardPeriods  = [];





        return null;
    }

})();
///api/dataValueSets?dataSet=TfoI3vTGv1f&orgUnit=SuoqM5pXPWG