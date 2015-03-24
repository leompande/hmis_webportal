/**
 * Created by leo on 3/19/15.
 */

(function(){
    'use strict';

    angular.module('Download')
        .service('DownloadService', ['$q', DownloadService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function DownloadService($q){
        return null;
    }

})();

