/**
 * Created by leo on 3/24/15.
 */


angular
    .module('portalApp', ['ngMaterial','Dashboard', 'coverages','Analysis','Download','highcharts-ng','ui.bootstrap','openlayers-directive'])
    .constant("ApplicationTitle","HMIS - Web Portal")
    .config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

    }).controller("portalController",['$scope','$http','ApplicationTitle', '$mdSidenav', '$mdBottomSheet', '$log', '$q',function($scope,$http,ApplicationTitle, $mdSidenav, $mdBottomSheet, $log, $q){
        $scope.Application = ApplicationTitle;
        $scope.tabs = [
            { title: 'Dashboard',rightNav: "src/Dashboard/view/navigation-bar.html",dataDiv:"src/Dashboard/view/data-container.html"},
            { title: 'Data Coverage',rightNav: "src/coverage/view/navigation-bar.html",dataDiv:"src/coverage/view/data-container.html"},
            { title: 'Analysis',rightNav: "src/analysis/view/navigation-bar.html",dataDiv:"src/analysis/view/data-container.html"},
            { title: 'Downloads',rightNav: "src/downloads/view/navigation-bar.html",dataDiv:"src/downloads/view/data-container.html"}
        ];

        $scope.toggleRight = function(){

                var pending = $mdBottomSheet.hide() || $q.when(true);

                pending.then(function(){
                    $mdSidenav('right').toggle();
                });

        }


    }]);

