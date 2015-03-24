/**
 * Created by leo on 3/19/15.
 */
(function(){

    angular
        .module('Analysis')
        .controller('AnalysisController', [
            'AnalysisService','$scope' , '$timeout', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            AnalysisController
        ]);

    /**
     * Analysis Controller for the Angular Material Portal App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function AnalysisController( AnalysisService,$scope,  $timeout, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;

        $scope.toggleAnalysis = function() {
            $mdSidenav('leftAnalysis').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        };

        $scope.close = function() {
            $mdSidenav('leftAnalysis').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };


    

    }

})();
