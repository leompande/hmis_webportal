/**
 * Created by leo on 3/19/15.
 */
(function(){

    angular
        .module('Download')
        .controller('DownloadController', [
            'DownloadService','$scope' , '$timeout', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            DownloadController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function DownloadController( DownloadService,$scope,  $timeout, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;

        $scope.toggleLeftDownloads = function() {
            $mdSidenav('leftDownloads').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        };

        $scope.close = function() {
            $mdSidenav('leftDownloads').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };


    

    }

})();
