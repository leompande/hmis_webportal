/**
 * Created by leo on 3/19/15.
 */

(function(){
    'use strict';

    angular.module('Analysis')
        .service('AnalysisService', ['$q', AnalysisService]);

    /**
     * Analysis DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function AnalysisService($q){
        return null;
    }

})();

