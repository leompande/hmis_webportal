/**
 * Created by leo on 3/19/15.
 */
(function(){

    angular
        .module('Analysis')
        .controller('AnalysisController', [
            'AnalysisService','$scope' ,'$http','olData','$timeout', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            AnalysisController
        ]);

    /**
     * Analysis Controller for the Angular Material Portal App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function AnalysisController( AnalysisService,$scope,$http,olData, $timeout, $mdSidenav, $mdBottomSheet, $log, $q) {

        var self = this;
        $scope.latitude      = -6.4;
        $scope.longitude     = 37;
        $scope.zooming       = 6;
        $scope.geoJson       = [];
        self.defaultOrg      = [ {
            name: 'Tanzania',
            source: {
                type: 'GeoJSON',
                url: 'http://localhost/OpenLayerApp/json/tanzania.json'
            },
            style: {
                fill: {
                    color: 'rgba(0, 255, 0, 0.6)'
                },
                stroke: {
                    color: 'white',
                    width: 3
                }
            }
        }];
        $scope.organisationUnit = self.defaultOrg;



        $scope.analysisOrgunits = [
            {
                "id": "YtVMnut7Foe",
                "level": 2,
                "name": "Arusha Region"
            },
            {
                "id": "acZHYslyJLt",
                "level": 2,
                "name": "Dar Es Salaam Region"
            },
            {
                "id": "Cpd5l15XxwA",
                "level": 2,
                "name": "Dodoma Region"
            },
            {
                "id": "MAL4cfZoFhJ",
                "level": 2,
                "name": "Geita Region"
            },
            {
                "id": "sWOWPBvwNY2",
                "level": 2,
                "name": "Iringa Region"
            },
            {
                "id": "Crkg9BoUo5w",
                "level": 2,
                "name": "Kagera Region"
            },
            {
                "id": "DWSo42hunXH",
                "level": 2,
                "name": "Katavi Region"
            },
            {
                "id": "RD96nI1JXVV",
                "level": 2,
                "name": "Kigoma Region"
            },
            {
                "id": "lnOyHhoLzre",
                "level": 2,
                "name": "Kilimanjaro Region"
            },
            {
                "id": "VMgrQWSVIYn",
                "level": 2,
                "name": "Lindi Region"
            },
            {
                "id": "qg5ySBw9X5l",
                "level": 2,
                "name": "Manyara Region"
            },
            {
                "id": "vYT08q7Wo33",
                "level": 2,
                "name": "Mara Region"
            },
            {
                "id": "A3b5mw8DJYC",
                "level": 2,
                "name": "Mbeya Region"
            },
            {
                "id": "Sj50oz9EHvD",
                "level": 2,
                "name": "Morogoro Region"
            },
            {
                "id": "bN5q5k5DgLA",
                "level": 2,
                "name": "Mtwara Region"
            },
            {
                "id": "hAFRrgDK0fy",
                "level": 2,
                "name": "Mwanza Region"
            },
            {
                "id": "qarQhOt2OEh",
                "level": 2,
                "name": "Njombe Region"
            },
            {
                "id": "yyW17iCz9As",
                "level": 2,
                "name": "Pwani Region"
            },
            {
                "id": "vAtZ8a924Lx",
                "level": 2,
                "name": "Rukwa Region"
            },
            {
                "id": "ZYYX8Q9SGoV",
                "level": 2,
                "name": "Ruvuma Region"
            },
            {
                "id": "EO3Ps3ny0Nr",
                "level": 2,
                "name": "Shinyanga Region"
            },
            {
                "id": "IgTAEKMqKRe",
                "level": 2,
                "name": "Simiyu Region"
            },
            {
                "id": "LGTVRhKSn1V",
                "level": 2,
                "name": "Singida Region"
            },
            {
                "id": "kZ6RlMnt2bp",
                "level": 2,
                "name": "Tabora Region"
            },
            {
                "id": "vU0Qt1A5IDz",
                "level": 2,
                "name": "Tanga Region"
            }
        ];
        // selection modals
        $scope.dataGroup = "District Populations";
        $scope.period    = "2014";
        $scope.orgUnit   = "All Regions";
        $scope.category  = "period";
        $scope.table     = null;
        $scope.chart     = null;
        $scope.map       = null;

        $scope.snippets = [
            //{
            //    name:"Population By District 2014",
            //    html:"",
            //    layout: {
            //        columns: [
            //            {name:"ANC"},
            //            {id:"L&D"}
            //        ],
            //        rows: [
            //            {name:"Orgunit"}
            //        ],
            //        filters: [
            //            {name:"Period"}
            //        ]
            //    },
            //    placeHolder:"chartx"
            //},
            {
                name:"Regional Populations ",
                url:"src/data/regionPopulation.json",
                html:"",
                layout: {
                    columns: [
                        {label:"Population",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Population count in Millions"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"District Populations ",
                url:"src/data/districtPopulation.json",
                html:"",
                layout: {
                    columns: [
                        {label:"Population",name:"dx",type:"column"}
                    ],
                    row: {label:"Districts",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Population count in Millions"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of HMIS Forms For Regions ",
                url:"src/data/allHMISCompletenesss.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"column"},
                        {label:"HMIS_Wagonjwa wa Kulazwa (IPD) ",name:"dx",type:"line"},
                        {label:"HMIS_Kliniki ya Wajawazito (ANC)",name:"dx",type:"spline"},
                        {label:"HMIS_Kutoka Wodi ya Wazazi (L&D)",name:"dx",type:"area"},
                        {label:"HMIS_Magonjwa ya Kuhara (DTC) ",name:"dx",type:"column"},
                        {label:"HMIS_Ufuatiliaji wa Watoto (Child Health)",name:"dx",type:"column"},
                        {label:"HMIS_Tracer Medicine",name:"dx",type:"column"},
                        {label:"HMIS_Uzazi wa Mpango (FP)",name:"dx",type:"column"},
                        {label:"HMIS_Huduma Baada ya Kujifungua (Postnatal)",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of OPD and IPD For Regions ",
                url:"src/data/OpdIpdCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"column"},
                        {label:"HMIS_Wagonjwa wa Kulazwa (IPD) ",name:"dx",type:"line"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of ANC and L&D For Regions ",
                url:"src/data/AncLandDCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Kliniki ya Wajawazito (ANC)",name:"dx",type:"spline"},
                        {label:"HMIS_Kutoka Wodi ya Wazazi (L&D)",name:"dx",type:"area"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of PNC and Family Planning For Regions ",
                url:"src/data/PncAndFPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Uzazi wa Mpango (FP)",name:"dx",type:"column"},
                        {label:"HMIS_Huduma Baada ya Kujifungua (Postnatal)",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of Tracer Drugs and Child Health For Regions ",
                url:"src/data/tracerAndChildHealthCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Ufuatiliaji wa Watoto (Child Health)",name:"dx",type:"column"},
                        {label:"HMIS_Tracer Medicine",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of HMIS Forms By Ownership for Tanzania ",
                url:"src/data/completenessByOwnership.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"column"},
                        {label:"HMIS_Wagonjwa wa Kulazwa (IPD) ",name:"dx",type:"line"},
                        {label:"HMIS_Kliniki ya Wajawazito (ANC)",name:"dx",type:"spline"},
                        {label:"HMIS_Kutoka Wodi ya Wazazi (L&D)",name:"dx",type:"area"},
                        {label:"HMIS_Magonjwa ya Kuhara (DTC) ",name:"dx",type:"column"},
                        {label:"HMIS_Ufuatiliaji wa Watoto (Child Health)",name:"dx",type:"column"},
                        {label:"HMIS_Tracer Medicine",name:"dx",type:"column"},
                        {label:"HMIS_Uzazi wa Mpango (FP)",name:"dx",type:"column"},
                        {label:"HMIS_Huduma Baada ya Kujifungua (Postnatal)",name:"dx",type:"column"}
                    ],
                    row: {label:"Ownership",name:"IymWT9V0HZI"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of HMIS Forms By Type for Tanzania ",
                url:"src/data/completenessByType.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"column"},
                        {label:"HMIS_Wagonjwa wa Kulazwa (IPD) ",name:"dx",type:"line"},
                        {label:"HMIS_Kliniki ya Wajawazito (ANC)",name:"dx",type:"spline"},
                        {label:"HMIS_Kutoka Wodi ya Wazazi (L&D)",name:"dx",type:"area"},
                        {label:"HMIS_Magonjwa ya Kuhara (DTC) ",name:"dx",type:"column"},
                        {label:"HMIS_Ufuatiliaji wa Watoto (Child Health)",name:"dx",type:"column"},
                        {label:"HMIS_Tracer Medicine",name:"dx",type:"column"},
                        {label:"HMIS_Uzazi wa Mpango (FP)",name:"dx",type:"column"},
                        {label:"HMIS_Huduma Baada ya Kujifungua (Postnatal)",name:"dx",type:"column"}
                    ],
                    row: {label:"Type",name:"VG4aAdXA4JI"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NACP Forms For Regions ",
                url:"src/data/allNACPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NACP_HIV Care and Treatment Reporting Form",name:"dx",type:"column"},
                        {label:"NACP_Home Based Care ( HUWANYU)",name:"dx",type:"line"},
                        {label:"NACP_HIV Testing and Counselling (HTC)",name:"dx",type:"spline"},
                        {label:"NACP_Sexually Transmitted Infections (STI)",name:"dx",type:"area"},
                        {label:"NACP_PMTCT MC Quaterly",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NACP HIV Care and Treatment for Regions ",
                url:"src/data/allNACPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NACP_HIV Care and Treatment Reporting Form",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NACP Home based Care(HUWANYU) For Regions ",
                url:"src/data/allNACPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NACP_Home Based Care ( HUWANYU)",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NACP HIV Testing and Counselling (HTC) For Regions ",
                url:"src/data/allNACPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NACP_HIV Testing and Counselling (HTC)",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NACP_Sexually Transmitted Infections (STI) For Regions ",
                url:"src/data/allNACPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NACP_Sexually Transmitted Infections (STI)",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NMCP Forms For Regions ",
                url:"src/data/allNMCPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NMCP_National Malaria Control Programme",name:"dx",type:"column"},
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"line"},
                        {label:"HMIS_Wagonjwa wa Kulazwa (IPD) ",name:"dx",type:"spline"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NMCP_National Malaria Control Programme For Regions ",
                url:"src/data/allNMCPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NMCP_National Malaria Control Programme",name:"dx",type:"column"},
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of Wagonjwa wa Nje (OPD) For Regions ",
                url:"src/data/allNMCPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"HMIS_Wagonjwa wa Nje (OPD) ",name:"dx",type:"line"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP Form For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP09 a) PB Leprosy patients Treatment outcome",name:"dx",type:"column"},
                        {label:"NTLP_LEP09 b) MB Leprosy patients treatment outcome",name:"dx",type:"line"},
                        {label:"NTLP_LEP09 c) Outcome of standard treatment for reaaction",name:"dx",type:"spline"},
                        {label:"NTLP_LEP08 Leprosy Drugs Order Calculation Form",name:"dx",type:"area"},
                        {label:"NTLP_LEP07 case notification report of leprosy",name:"dx",type:"column"},
                        {label:"NTLP_LEP10 Annual_Report on Prevention of Disability",name:"dx",type:"column"},
                        {label:"NTLP_TB08 Drugs and Lab Supplies Order Calculation Form",name:"dx",type:"column"},
                        {label:"NTLP_TB07_Tuberculosis and TB/HIV",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP09 a) PB Leprosy patients Treatment outcome For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP09 a) PB Leprosy patients Treatment outcome",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP09 b) MB Leprosy patients treatment outcome For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP09 b) MB Leprosy patients treatment outcome",name:"dx",type:"line"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP09 c) Outcome of standard treatment for reaction For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP09 c) Outcome of standard treatment for reaaction",name:"dx",type:"spline"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP08 Leprosy Drugs Order Calculation Form For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP08 Leprosy Drugs Order Calculation Form",name:"dx",type:"area"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP07 case notification report of leprosy For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP07 case notification report of leprosy",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_LEP10 Annual_Report on Prevention of Disability For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_LEP10 Annual_Report on Prevention of Disability",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_TB08 Drugs and Lab Supplies Order Calculation Form For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_TB08 Drugs and Lab Supplies Order Calculation Form",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            },
            {
                name:"Data Reporting Rate of NTLP_TB07_Tuberculosis and TB/HIV For Regions ",
                url:"src/data/allNTLPCompleteness.json",
                html:"",
                layout: {
                    columns: [
                        {label:"NTLP_TB07_Tuberculosis and TB/HIV",name:"dx",type:"column"}
                    ],
                    row: {label:"Regions",name:"ou"},
                    filters: [
                        {label:"Year",name:"value"}
                    ],
                    yAxis: "Data Reporting Rate(%)"
                },
                object:"chart",
                type:"column",
                placeHolder:"populationChart"
            }
        ];
        $scope.snippetIndex = null;
        self.drawChart = function(){
            angular.forEach($scope.snippets,function(snippet,snippetIndex){

                if(snippet.name.indexOf($scope.dataGroup)>=0){
                    $scope.snippetIndex = snippetIndex;
                    if(!angular.isUndefined(snippet.url) && snippet.url.length>0) {
                        //Fetch data from url
                        var tableObject = {};
                        $http.get(snippet.url).success(function(data){
                                tableObject.orgunits = data.metaData.ou;
                                tableObject.names = data.metaData.names;
                                tableObject.rows = data.rows;

                            if(data.metaData.pe[0]===$scope.period){

                            //Initiate higchart for snippet
                            snippet.highchartsNG = {};
                            //snippet.highchartsNG.legend = {enabled:true};
                            //Set Chart Options
                            if(!angular.isUndefined(snippet.object)) {
                                // Deal with object, currently only charts
                                snippet.highchartsNG.options={};
                                snippet.highchartsNG.options[snippet.object] = {};
                                if(!angular.isUndefined(snippet.type)) {

                                    snippet.highchartsNG.options[snippet.object].type=snippet.type;
                                    snippet.highchartsNG.options[snippet.object].renderTo=snippet.placeHolder;
                                }else {
                                    snippet.highchartsNG.options[snippet.object].type="bar";
                                    snippet.highchartsNG.options[snippet.object].renderTo=snippet.placeHolder;
                                }
                                //snippet.highchartsNG.options[snippet.object].height=700;
                            }
                            /*
                             * Insert Series data and their titles
                             * Note: Column can be many in chart but there will always be one row.
                             */
                            //Go through each column to make a series with data and it's label
                            snippet.highchartsNG.series = [];
                            snippet.highchartsNG.yAxis = [];
                            snippet.highchartsNG.xAxis = {labels:{rotation:-45}};
                            snippet.highchartsNG.xAxis.categories=[];
                            angular.forEach(snippet.layout.columns,function(column,columnIndex){
                                //Prepare a series to push into series object
                                var serie = {};
                                serie.name=column.label;
                                serie.id=column.label;
                                serie.data=[];
                                //Determine column index for value extraction
                                var serieIndex = null;
                                angular.forEach(data.headers,function(header,index){
                                    if(header.name==column.name) {
                                        serieIndex=index;
                                    }
                                });
                                //Go through data and extract serie value
                                angular.forEach(data.rows,function(row){
                                    //Use column index to check if the column match name of our serie
                                    //and extract value or skip
                                    if(data.metaData.names[ row[serieIndex] ] == column.label) {
                                        var dataLabel='';
                                        if(serieIndex==0) {
                                            if(! $scope.contains(snippet.highchartsNG.xAxis.categories,data.metaData.names[ row[1] ])) {
                                                dataLabel=  data.metaData.names[ row[1] ];
                                                snippet.highchartsNG.xAxis.categories.push( dataLabel);
                                            }
                                        }else {
                                            if(! $scope.contains(snippet.highchartsNG.xAxis.categories,data.metaData.names[ row[0] ])) {
                                                dataLabel = data.metaData.names[ row[0] ];
                                                snippet.highchartsNG.xAxis.categories.push(dataLabel);
                                            }
                                        }
                                        serie.data.push([dataLabel+"("+Number(row[2])+")",Number(row[2])]);//Push eligible value to serie
                                    }
                                });
                                snippet.highchartsNG.series.push(serie);
                                if(snippetIndex==2) {

                                }
                            });
                            //Add pie chart plot options
                            snippet.highchartsNG.plotOptions= {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true,
                                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                        style: {
                                            textShadow: '0 0 3px black'
                                        }
                                    }
                                },
                                pie: {
                                    showInLegend: true
                                }
                            };

                            //Setup yAxis for the column
                            if(snippet.layout.yAxis=="Data Reporting Rate(%)") {
                                //Hack to set maximum for completeness
                                snippet.highchartsNG.yAxis.push({
                                    "title":{ "text":snippet.layout.yAxis, "style":{"color":"#0D0DC1"} },
                                    "max":100,
                                    stackLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                        }
                                    }
                                });
                            }else {

                                snippet.highchartsNG.yAxis.push({
                                    "title":{ "text":snippet.layout.yAxis, "style":{"color":"#0D0DC1"} },
                                    stackLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                        }
                                    }
                                });
                            }
                            //Additional settings
                            //snippet.highchartsNG.loading="false";
                            snippet.highchartsNG.credits={position:{align:'left',verticalAlign:'bottom',x:10,y:-10}};
                            snippet.highchartsNG.labels = {align:"right",x:-10,y:0};
                            snippet.highchartsNG.legend = {align:"left",verticalAlign:"top",float:true, enabled:true};
                            //Set title of the snippet
                            if(!angular.isUndefined(snippet.name)) {

                                snippet.highchartsNG.title={text:snippet.name+' '+$scope.period};
                            }else if(!angular.isUndefined(snippet.type) && !angular.isUndefined(snippet.object) ) {
                                snippet.highchartsNG.title={text:snippet.name+' '+$scope.period};
                            }

                        }else{
                                snippet.highchartsNG.title={text:snippet.name+' '+$scope.period};
                                snippet.highchartsNG.series = [];
                                snippet.highchartsNG.yAxis = [];
                                snippet.highchartsNG.xAxis = {labels:{rotation:-45}};
                                snippet.highchartsNG.xAxis.categories=[];
                            }
                        }
                        ).error(function(data){
                            console.log('Data fetching failed');
                        })
                    }
                }

            });
        }
        self.drawTable = function(){
            angular.forEach($scope.snippets,function(snippet,snippetIndex){

                if(snippet.name.indexOf($scope.dataGroup)>=0){
                    $scope.snippetIndex = snippetIndex;
                    if(!angular.isUndefined(snippet.url) && snippet.url.length>0) {
                        //Fetch data from url
                        var tableObject = {};
                        $http.get(snippet.url).success(function(data){

                                tableObject.orgunits = data.metaData.ou;
                                tableObject.names = data.metaData.names;
                                tableObject.rows = data.rows;
                                var table = "<div layout='row'>";
                                    table += "<p>";
                                    table += $scope.dataGroup+" : "+$scope.period;
                                    table += "</p>";
                                    table += "</div>";
                                    table += "<div layout='row'>";
                                    table += "<table class='table table-condensed table-responsive table-bordered table-striped'>";
                                    table += "<thead>";
                                    table += "<th>";
                                    table += "Organisation Unit";
                                    table += "</th>";
                                    table += "<th>";
                                    table += "";
                                    table += "</th>";
                                    table += "</thead>";
                                    table += "<tbody>";
                            angular.forEach(tableObject.orgunits,function(orgunit,orgunitIndex){
                                table += "<tr>";
                                    angular.forEach(tableObject.rows,function(row,rowIndex){
                                        if(row[1]==orgunit && !angular.isArray($scope.orgUnit) && $scope.orgUnit=="All Regions"){
                                            table += "<td>";
                                            table += tableObject.names[orgunit];
                                            table += "</td>";
                                            table += "<td>";
                                            table += row[2];
                                            table += "</td>";
                                            //console.log("ID: "+orgunit+ ", Name: "+tableObject.names[orgunit]+ " Rate: "+row[2]);
                                        }
                                        if(row[1]==orgunit && angular.isArray($scope.orgUnit) && $scope.orgUnit.indexOf(orgunit)>=0){
                                            table += "<td>";
                                            table += tableObject.names[orgunit];
                                            table += "</td>";
                                            table += "<td>";
                                            table += row[2];
                                            table += "</td>";
                                            //console.log("ID: "+orgunit+ ", Name: "+tableObject.names[orgunit]+ " Rate: "+row[2]);
                                        }
                                    });
                                table += "</tr>";
                                 });
                                table += "</tbody>";
                                table += "</table>";
                                table += "</div>";


                                $("section[ng-if='table']").html(table);
                            }
                        ).error(function(data){
                                console.log('Data fetching failed');
                            })
                    }
                }

            });
        }
        self.drawMap = function(){
            if(angular.isArray($scope.orgUnit)){
                self.newOrgObject = [];
                if($scope.orgUnit.length!==0&&$scope.orgUnit.length!==25){

                    angular.forEach($scope.orgUnit,function(selectedOrgs){

                        angular.forEach($scope.analysisOrgunits,function(orgs){
                            if(selectedOrgs==orgs.id){

                                self.newOrgObject.push({name:orgs.name,uid:orgs.id,source:{type:'GeoJSON',url:self.getUrl(orgs.id)},style:{fill:{color:self.randomColor()},stroke:{color:'white',width:3}}});
                            }

                        });
                    });
                    if($scope.orgUnit.length===1){
                        $scope.zooming = 8;
                        $scope.latitude = -2.3437;
                        $scope.longitude = 36.4172;
                        self.latitude($scope.orgUnit[0]);

                    }else{
                        $scope.zooming = 6;
                        $scope.zooming =6;
                        $scope.latitude = -6.4;
                        $scope.longitude = 37;
                    }

                    $scope.organisationUnit = self.newOrgObject;

                }else{
                    $scope.zooming =6;
                    $scope.latitude = -6.4;
                    $scope.longitude = 37;
                    $scope.organisationUnit = self.defaultOrg;
                }
            }else{
                $scope.zooming =6;
                $scope.latitude = -6.4;
                $scope.longitude = 37;
                $scope.organisationUnit = self.defaultOrg;
            }

            angular.extend($scope, {
                tanzania: {
                    lat: $scope.latitude,
                    lon: $scope.longitude,
                    zoom:$scope.zooming
                },
                geojson: $scope.organisationUnit
            });
        }

        $scope.isChartObject = function(snippet) {
            return angular.isUndefined(snippet.object) ? false : true;
        }
        $scope.contains = function(array,item) {
            angular.forEach(array,function(entity){
                if(entity==item) return true;
            });
            return false;
        }

        //$scope.tabs = tabs;
        $scope.selectedIndex = 0;
        $scope.currentDashTab = 'tab-1';


        $scope.$watch('selectedIndex', function(current, old){
            if ( old && (old != current)) $log.debug('Goodbye ' + tabs[old].title + '!');
            if ( current )                $log.debug('Hello ' + tabs[current].title + '!');
        });
        $scope.$watch('dataGroup', function(current, old){
            $scope.chart = null;
            self.drawTable();
        });
        $scope.$watch('orgUnit', function(current, old){
            //$scope.orgUnit = "All Regions";
            $scope.orgUnit = self.checkIfAll($scope.orgUnit);
            //$scope.orgUnit = current;
            if($scope.chart!==null){
                self.drawChart();
            }
            if($scope.table!==null){
                self.drawTable();
            }
            if($scope.map!==null){
                self.drawMap();
            }
        });

        $scope.addTab = function (title, view) {
            view = view || title + " Content View";
            tabs.push({ title: title, url: view, disabled: false});
        };

        $scope.removeTab = function (tab) {
            for (var j = 0; j < tabs.length; j++) {
                if (tab.title == tabs[j].title) {
                    $scope.tabs.splice(j, 1);
                    break;
                }
            }
        };


        $scope.loadOrgUnits = function(){

            var   url = "src/data/organisationUnits.json";

            $http({
                method:"GET",
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(response) {
                $scope.dashboardOrgUnits = response.organisationUnits;
            }).
                error(function(response) {

                });
            return false;

        }
        $scope.loadOrgUnits();

        $scope.showTable = function(){
            $scope.table = "table";
            $scope.chart = null;
            $scope.map   = null;
            self.drawTable();
        }
        $scope.showChart = function(){
            $scope.chart = "chart";
            $scope.table = null;
            $scope.map   = null;
            self.drawChart();
        }
        $scope.showMap = function(){
            $scope.map = "map";
            $scope.chart = null;
            $scope.table = null;

            //self.drawMap();
        }
        $scope.modalChange = function(){

                self.drawChart();

        }
        $scope.showMap();
        self.drawMap();

        //$scope.modalChange();
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
        self.randomColor = function()
        {
            var r = function () { return Math.floor(Math.random()*256) };
            return "rgba(" + r() + "," + r() + ",0,0.6)";
        }
        self.latitude = function(uid){
            angular.forEach(self.newOrgObject,function(selectedOrgs){
                if(selectedOrgs.uid === uid){
                    console.log(selectedOrgs);
                }
            });
        }
        self.longitude = function(uid){

        }
        self.getUrl = function(uid){
            return "http://localhost/OpenLayerApp/json/"+uid+".json";
        }
        self.checkIfAll = function(arr){

            if(arr.indexOf("All Regions")>=0){
                arr = null;
                arr = "All Regions";
            }else{}

            return arr;
        }
    }

})();
