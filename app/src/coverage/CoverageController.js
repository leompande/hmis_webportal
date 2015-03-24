/**
 * Created by leo on 3/19/15.
 */
(function(){

    angular
        .module('coverages')
        .controller('CoverageController', [
            'coverageService','$scope' , '$timeout', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            CoverageController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function CoverageController( CoverageService,$scope,  $timeout, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        };

        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };


    

    }

})();
