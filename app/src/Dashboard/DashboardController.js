/**
 * Created by leo on 3/24/15.
 */
(function(){

    angular
        .module('Dashboard')
        .controller('DashboardController', [
            'DashboardService','$scope' , '$timeout', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            DashboardController
        ]);

    /**
     * Dashboard Controller for the Angular Material Portal App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function DashboardController( DashboardService,$scope,  $timeout, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        $scope.dashboardOrgunits = null;
        if(!angular.isUndefined(DashboardService.dashboardOrgunits) && DashboardService.dashboardOrgunits.length>0)
        $scope.dashboardOrgunits = DashboardService.dashboardOrgunits;






    }
})();