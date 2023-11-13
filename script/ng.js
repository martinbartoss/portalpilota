// application
angular.module('ngApp', ['angular.filter'])

 .directive('onlyInteger', function () {
     return {
         require: 'ngModel',
         restrict: 'A',
         link: function (scope, element, attr, ctrl) {
             function inputValue(val) {
                 if (val) {
                     var digits = val.replace(/[^0-9]/g, '');

                     if (digits !== val) {
                         ctrl.$setViewValue(digits);
                         ctrl.$render();
                     }
                     return parseInt(digits, 10);
                 }
                 return undefined;
             }
             ctrl.$parsers.push(inputValue);
         }
     };
 })

 .directive('onlyDecimal', function () {
     return {
         require: 'ngModel',
         restrict: 'A',
         link: function (scope, element, attr, ctrl) {
             function inputValue(val) {
                 if (val) {
                     var digits = val.replace(/[^0-9.,]/g, '');
                     digits = digits.replace(',', '.');
                     if (digits.split('.').length > 2) {
                         digits = digits.substring(0, digits.length - 1);
                     }

                     if (digits !== val) {
                         ctrl.$setViewValue(digits);
                         ctrl.$render();
                     }
                     return parseFloat(digits);
                 }
                 return undefined;
             }
             ctrl.$parsers.push(inputValue);
         }
     };
 })

.directive('bezUvozovek', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/['"]+/g, '');
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return digits;
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
})

.directive('valueWatch', function () {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            scope.$watch(function (){
                return ngModel.$modelValue;
            }, function (v) {
                console.log('!!!' + v);
            })
        }
    };
})

.directive('toggleClass', function () {
    return {
        //require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
            element.bind('click', function () {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
})

.directive('dtpMonth', function () {
    return {
        //require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
            $('.form_month').datetimepicker({
                language: 'cs',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 0,
                startView: 3,
                minView: 3,
                maxView: 3,
                forceParse: 0
            });

        }
    };
})

.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.loadingFile = true;
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.$apply();

                var f = (e.srcElement || e.target).files[0];

                switch ($scope.file.type) {
                    case "application/vnd.ms-excel":
                        $scope.file.t = 'xls';
                        $scope.readAsBase64(f);
                        break;
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        $scope.file.t = 'xls';
                        $scope.readAsBase64(f);
                        break;
                    default:
                        console.log($scope.file);
                    break;
                }
                //                $scope.readAsBinaryString();
            });
        }
    }
})

.factory("fileReader", fileReader)

.factory('Excel', function ($window) {
    //var uri = 'data:application/vnd.ms-excel;base64,',
    //    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    //    base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
    //    format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    //var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
    //    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
    //    base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
    //    format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };

    // var uri = 'data:application/octet-stream;base64,',
    //     template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
    //     base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
    //     format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };

    var uri = 'data:application/vnd.ms-excel;base64,';
    // var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    return {
        tableToExcel: function (tableId, worksheetName) {
            var elem = $(tableId);
            var elemClone = elem.clone();
            //elemClone = elemClone.find('th:last-child, td:last-child').remove().end();
            elemClone = elemClone.find('.noxls').remove().end();
            //elemClone = elemClone.find('th.noxls, td.noxls').remove().end();

            //document.getElementById("xyz").style["padding-top"] = "10px";
            angular.forEach(elemClone.find('.tableHeader1'), function (el) {
                //el.style["background-color"] = "#880000 !important";
                el.setAttribute('style', 'background-color:#880000 !important;color:white;font-weight: bold;');
            });
            //document.getElementById("xyz").setAttribute('style','padding-top:10px');
            angular.forEach(elemClone.find('.tableHeader2'), function (el) {
                el.setAttribute('style', 'background-color:#444444 !important;color:white;');
            });
            angular.forEach(elemClone.find('.green-text'), function (el) {
                el.setAttribute('style', 'color:green;');
            });
            angular.forEach(elemClone.find('.red-text'), function (el) {
                el.setAttribute('style', 'color:red;');
            });

            //elemClone = elemClone.find('table tr td span.ng-hide').remove().end();
            //var table = $(tableId),
            //    ctx = { worksheet: worksheetName, table: elemClone.html() };
            //var link = document.createElement("a");
            //link.download = worksheetName + ".xlsx";
            //link.href = uri + base64(format(template, ctx));
            //link.click();

            //origo
            var ctx = { worksheet: worksheetName, table: elemClone.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }

    };
})

.controller('pnlCtrl', ['$http', '$scope', '$compile', '$window', '$filter', '$timeout', '$log', '$interval', 'Excel', 'fileReader', function ($http, $scope, $compile, $window, $filter, $timeout, $log, $interval, Excel, fileReader) {
    $scope.testView = false;
    $scope.search = {};
    $scope.search.airframeInfo = '';
    $scope.search.e = '';
    $scope.viewMode = 0;

    $scope.showFileContent = 0;

    // *0 - home
    // *1 - login
    // *2 - registration
    // *3 - logged - sitemap
    // *4 - account status
    // *5 - flight entry
    // *6 - payments overview
    // *7 - flights overview
    // *8 - weather
    // *9 - users overview
    // 10 - payment entry

    $scope.logged = false;
    $scope.usr = {};
    $scope.usrEdit = {};
    $scope.filter = {};
    $scope.filter.e = '';

    // $scope.selectedVEH = {};
    // $scope.selectedVEH.date = '2022-01-13';
    // $scope.selectedVEH.time = '16:30:00';
    // $('#dtp_consShipDate').val($scope.selectedVEH.date);

    $scope.updateSelectedVehDateTime = function(elem_id){
        console.log(elem_id);
    }

    $scope.home = function(forceHomePage){
        if ($scope.logged == true){
            if ((forceHomePage==1)||($scope.filter.e == '')||(($scope.viewMode != 5)&&($scope.viewMode != 6)&&($scope.viewMode != 7)&&($scope.viewMode != 10))){
                $scope.viewMode = 3;
            } else {
                if ($scope.viewMode != $scope.filter.origView){
                    $scope.viewMode = $scope.filter.origView;
                } else {
                    $scope.viewMode = 9;
                }
            }
        } else {
            $scope.viewMode = 0;
        }
    }

    $scope.resetUser = function(usr){
        usr.admin = 0;
        usr.n = '';
        usr.fn = '';
        usr.sn = '';
        usr.phone = '';
        usr.cpp = '';
        usr.cps = '';
        usr.ppp = '';
        usr.pps = '';
        usr.plp = '';
        usr.ppp_dt = '';
        usr.pps_dt = '';
        usr.plp_dt = '';
        usr.e = '';
        usr.t = '';
        usr.pwd = '';
        usr.pwd2 = '';
        usr.qual = '';
        usr.defaultPrice = 0;

        usr.accountEUR = 0;
        usr.accountMinutes = 0;
    }

    $scope.resetUser($scope.usr);

    $scope.login = function(){

        $http({
            url: "JSON/api.asmx/LKMB_login_portal",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, pwd: $scope.usr.pwd
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            // $scope.usr.n = 'Fake login name';
            var ret =  JSON.parse(data.d)[0];
            if (ret.ret == 1) {
                $scope.usr = JSON.parse(data.d)[0];
                if (($scope.usr.admin == 1)||($scope.usr.adminReservation == 1)){
                    $scope.refreshUserEmails();
                    $scope.getMonthsFilter();
                }
                $scope.refreshListAircraft();
                $scope.logged = true;
                $scope.viewMode = 3;
    
                console.log('Logged in.');
            } else {
                $scope.usr.ret = ret.ret;
                $scope.usr.msg = ret.msg;
            }

            console.log(data);
        }).error(function (data, status, headers, config) {
            $scope.handleERR("login", data, status);
        });

    }

    // $scope.meteoRecent = function (stationId) {
    //     //https://api.weather.com/v2/pws/observations/current?stationId=IMLADB8&format=json&units=m&apiKey=e0c2374024e3494682374024e31946ec
    //     $scope.processingMeteo = true;
    //     $http({
    //         // url: "https://api.weather.com/v2/pws/observations/current?stationId=" + stationId + "&format=json&units=m&apiKey=e0c2374024e3494682374024e31946ec",
    //         url: "https://api.cw-portal.eu/LKMB/mb01/meteoRecent?password=4B60C16F&station=" + stationId,
    //         method: 'POST',
    //         contentType: "text/plain; charset=utf-8",
    //         dataType: 'json',
    //         // data: {
    //         //     eai: $scope.usr.eai, usr: $scope.usr.n, token: $scope.usr.t
    //         // },
    //         headers: { 'Content-Type': 'application/json' }
    //     }).success(function (data, status, headers, config) {
    //         $scope.processingMeteo = false;
    //         $scope.meteoInfoRecent = data.observations;
    //     }).error(function (data, status, headers, config) {
    //         $scope.handleERR("meteoActual", data, status);
    //     });
    // }

    $scope.logout = function(){
        $scope.viewMode = 0;
        $scope.logged = false;
        $scope.userEmails.length = 0;

        $http({
            url: "JSON/api.asmx/LKMB_logout_portal",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            console.log('Logged out.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("logout", data, status);
        });

        $scope.resetUser($scope.usr);
    }

    $scope.registerNewPilot = function(usr){
        if (usr.pwd == undefined){
            usr.pwd = '';
        }
        if (usr.pwd != usr.pwd2){
            console.log('Zadání hesla nesouhlasí.');
            return;
        }
        if (usr.pwd == ''){
            console.log('Není zadáno heslo.');
            return;
        }
        if (usr.AIRCRAFT_CATEGORY == undefined){
            usr.AIRCRAFT_CATEGORY = '-';
        }

        $http({
            url: "JSON/api.asmx/LKMB_pilot_update",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: usr.e, token: '',  insertRecord: 1, updatePWD: 1, PWD: usr.pwd, 
                FIRSTNAME: usr.fn, SURNAME: usr.sn, EMAIL: usr.e, PHONE: usr.phone, 
                PP_NUMBER: usr.cpp, PP_VALID_TO: usr.ppp_dt.yyyymmddhhmm(), 
                PS_NUMBER: usr.cps, PS_VALID_TO: usr.pps_dt.yyyymmddhhmm(), 
                MEDICAL_VALID_TO: usr.plp_dt.yyyymmddhhmm(), QUALIFICATION: usr.qual,
                DEFAULT_MINUTE_PRICE: usr.defaultPrice, AIRCRAFT_CATEGORY: usr.AIRCRAFT_CATEGORY
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.viewMode = 3;

            $scope.refreshUserEmails();

            console.log('User registered.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("registerNewPilot", data, status);
        });
    }

    $scope.createAccount = function(){
        $scope.resetUser($scope.usrEdit);
        $scope.viewMode = 2;
        $scope.usrEdit.insert = 1;
        // $scope.usrEdit = angular.copy($scope.usr);
    }

    $scope.updateAccount = function(usr){
        $scope.viewMode = 2;
        $scope.usrEdit = angular.copy(usr);

        $scope.usrEdit.plp_dt = new Date($scope.usrEdit.plp_dt.replace(' ','T'));
        $scope.usrEdit.ppp_dt = new Date($scope.usrEdit.ppp_dt.replace(' ','T'));
        if ($scope.usrEdit.pps_dt !=undefined){
            $scope.usrEdit.pps_dt = new Date($scope.usrEdit.pps_dt.replace(' ','T'));
        }

        $scope.usrEdit.insert = 0;
        $scope.usrEdit.pwd = '';
        $scope.usrEdit.pwd2 = '';
        $scope.usrEdit.ChangePwd = false;
    }

    $scope.updatePilot = function(usr){
        var updatePWD = 0;
        var pwd = '';
        if ((usr.pwd2 != '')&&(usr.pwd == usr.pwd2)){
            updatePWD = 1;
            pwd = usr.pwd;
        }
        if (usr.AIRCRAFT_CATEGORY == undefined){
            usr.AIRCRAFT_CATEGORY = '-';
        }

        $http({
            url: "JSON/api.asmx/LKMB_pilot_update",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  insertRecord: 0, updatePWD: updatePWD, PWD: pwd, 
                FIRSTNAME: usr.fn, SURNAME: usr.sn, EMAIL: usr.e, PHONE: usr.phone, 
                PP_NUMBER: usr.cpp, PP_VALID_TO: usr.ppp_dt.yyyymmddhhmm(), 
                PS_NUMBER: usr.cps, PS_VALID_TO: usr.pps_dt.yyyymmddhhmm(), 
                MEDICAL_VALID_TO: usr.plp_dt.yyyymmddhhmm(), QUALIFICATION: usr.qual,
                DEFAULT_MINUTE_PRICE: usr.defaultPrice, AIRCRAFT_CATEGORY: usr.AIRCRAFT_CATEGORY
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {

            if ($scope.usr.e == usr.e){
                $scope.viewMode = 3;
                $scope.usr.n = usr.fn + ' ' + usr.sn;
                $scope.usr.fn = usr.fn;
                $scope.usr.sn = usr.sn;
                $scope.usr.phone = usr.phone;
                $scope.usr.cpp = usr.cpp;
                $scope.usr.ppp = usr.ppp;
                $scope.usr.cps = usr.cps;
                $scope.usr.pps = usr.pps;
                $scope.usr.plp = usr.plp;
                $scope.usr.ppp_dt = usr.ppp_dt;
                $scope.usr.pps_dt = usr.pps_dt;
                $scope.usr.plp_dt = usr.plp_dt;
                $scope.usr.e = usr.e;
                $scope.usr.qual = usr.qual;
                $scope.usr.defaultPrice = usr.defaultPrice;
            } else {
                $scope.showUsersOverview();
            }
    
            console.log('User updated.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("updatePilot", data, status);
        });
    }

    $scope.LKMB_flight = function(flight){
        if (flight.MINUTE_PRICE == ''){
            flight.MINUTE_PRICE = '0';
        }
        if (flight.counterBegin == ''){
            flight.counterBegin = '0';
        }
        if (flight.counterEnd == ''){
            flight.counterEnd = '0';
        }
        $http({
            url: "JSON/api.asmx/LKMB_flight",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: flight.ID, DATE: flight.d_dt.yyyymmddhhmm(), TAKE_OFF: flight.takeoff, 
                USER_EMAIL: flight.USER_EMAIL,
                LANDING: flight.landing, FLIGHT_TIME_MINUTES: flight.duration, NUMBER_OF_STARTS: flight.startsNumber, 
                NOTE: flight.note, FLIGHT_TYPE: flight.flightType, IMATRIKULACE: flight.imatrikulace, POSADKA: flight.POSADKA,
                COUNTER_BEGIN: flight.counterBegin, COUNTER_END: flight.counterEnd,
                MINUTE_PRICE: flight.MINUTE_PRICE, PRICE: flight.PRICE, INSTRUKTOR: flight.INSTRUKTOR
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.showFlightsOverview();
            console.log('Flight inserted.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_flight", data, status);
        });
    }

    $scope.LKMB_flight_delete = function(flight){
        if (flight.MINUTE_PRICE == ''){
            flight.MINUTE_PRICE = '0';
        }
        if (flight.counterBegin == ''){
            flight.counterBegin = '0';
        }
        if (flight.counterEnd == ''){
            flight.counterEnd = '0';
        }
        flight.flightType = 'DELETE';
        $http({
            url: "JSON/api.asmx/LKMB_flight",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: flight.ID, DATE: flight.d, TAKE_OFF: flight.takeoff, 
                USER_EMAIL: flight.USER_EMAIL,
                LANDING: flight.landing, FLIGHT_TIME_MINUTES: flight.duration, NUMBER_OF_STARTS: flight.startsNumber, 
                NOTE: flight.note, FLIGHT_TYPE: flight.flightType, IMATRIKULACE: flight.imatrikulace, POSADKA: flight.POSADKA,
                COUNTER_BEGIN: flight.counterBegin, COUNTER_END: flight.counterEnd,
                MINUTE_PRICE: flight.MINUTE_PRICE, PRICE: flight.PRICE, INSTRUKTOR: flight.INSTRUKTOR
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.showFlightsOverview();
            console.log('Flight deleted.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_flight_delete", data, status);
        });
    }

    $scope.LKMB_flight_approve = function(flight, APPROVED){
        $http({
            url: "JSON/api.asmx/LKMB_flight_approve",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: flight.ID, APPROVED: APPROVED, 
                USER_EMAIL: flight.USER_EMAIL
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            // $scope.showFlightsOverview();
            flight.APPROVED = APPROVED;
            console.log('Flight approved.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_flight_approve", data, status);
        });
    }

    $scope.LKMB_flight_Import_All= function(){
        var totalImportFlights = $scope.xlsJSON[0].rows.length;
        var i = 0;
        $scope.xlsJSON[0].rows.forEach(function(flight){
            i++;
            $scope.LKMB_flight_Import(flight, totalImportFlights-i);        
        });
    }

    $scope.LKMB_flight_Import = function(flight, importFlightsRemaining){
        if (importFlightsRemaining == undefined){
            importFlightsRemaining = 0;
        }
        if (flight.sazba == ''){
            flight.sazba = '0';
        }
        if (flight.Instruktor == undefined){
            flight.Instruktor = '';
        }
        if (flight.poznamka == undefined){
            flight.poznamka = '';
        }

        $http({
            url: "JSON/api.asmx/LKMB_flight_Import",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, FLIGHT_DATE: flight.datum, IMATRIKULACE: flight.imatrikulace, POSADKA: flight.posadka, 
                TAKE_OFF: flight.takeoff, LANDING: flight.landing, FLIGHT_TIME_MINUTES: flight.DL_MM, NUMBER_OF_STARTS: flight.starty, 
                NOTE: flight.poznamka, FLIGHT_TYPE: flight.flightType,
                COUNTER_BEGIN: 0, COUNTER_END: 0,
                MINUTE_PRICE: flight.sazba, PRICE: flight.CZK, INSTRUKTOR: flight.Instruktor
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            // $scope.showFlightsOverview();
            flight.OK = 1;
            flight.ERR = 0;
            flight.errSave = '';
            console.log('Flight inserted.');
            console.log(data);
            if (importFlightsRemaining == 0){
                $scope.refreshFlightsOverview();
            }
        }).error(function (data, status, headers, config) {
            flight.OK = 0;
            flight.ERR = 1;
            flight.errSave = 'ERR';
            $scope.handleERR("LKMB_flight_Import", data, status);
        });
    }

    $scope.LKMB_payment = function(payment){
        $http({
            url: "JSON/api.asmx/LKMB_payment",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: payment.ID, DATE: payment.d_dt.yyyymmddhhmm(), AMOUNT: payment.AMOUNT, 
                USER_EMAIL: payment.USER_EMAIL, PAYMENT_TYPE: payment.PAYMENT_TYPE, DOCUMENT: payment.DOCUMENT
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.showPaymentsOverview();
            console.log('Payment inserted.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_payment", data, status);
        });
    }

    $scope.showWeather = function(){
        $scope.viewMode = 8;
        $scope.meteoActual('IMLADB8');
    }

    $scope.showAccountStatus = function(){
        // $scope.usr.accountEUR = 1230;
        // $scope.usr.accountMinutes = 55;
        
        $scope.viewMode = 4;
    }

    $scope.refreshAccountStatus = function(){

        $http({
            url: "JSON/api.asmx/LKMB_getAccountStatus",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            var ret = JSON.parse(data.d)[0];
            $scope.usr.accountCZK = ret.accountCZK;
            $scope.usr.accountMinutes = ret.accountMinutes;
    
            console.log(data);
            console.log('Logged in.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("login", data, status);
        });

    }
    
    $scope.fillReservationDropdown = function(reservation){
        reservation.timeFromDropdown = [];
        reservation.timeToDropdown = [];

        //find first available index
        var firstMapIndex = -1;
        var lastMapIndex = -1;
        if ($scope.reservationsMap[reservation.imatrikulace] == undefined){
            //full range from 0500 to 2200
            firstMapIndex = 0;
            lastMapIndex = $scope.reservationsMapHrs.length - 1;
        } else {
            var hhmm = 1 * (reservation.t_from.replace(':',''));
            firstMapIndex = $scope.reservationsMapHrs.indexOf(hhmm);
            lastMapIndex = $scope.reservationsMapHrs.indexOf(hhmm);
            while ((firstMapIndex > 0) && 
                    (
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[firstMapIndex - 1]] == undefined) || 
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[firstMapIndex - 1]].ID == reservation.ID) || 
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[firstMapIndex - 1]].STATUS < 0)
                    )
            ){
                firstMapIndex--;
            }
            while ((lastMapIndex < $scope.reservationsMapHrs.length - 1) && 
                    (
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[lastMapIndex]] == undefined) || 
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[lastMapIndex]].ID == reservation.ID) || 
                    ($scope.reservationsMap[reservation.imatrikulace][$scope.reservationsMapHrs[lastMapIndex]].STATUS < 0)
                    )
            ){
                lastMapIndex++;
            }
            if (firstMapIndex > 0){
                firstMapIndex++;
            }
            if (lastMapIndex < $scope.reservationsMapHrs.length - 1){
                lastMapIndex--;
            }
        }

        for (var i = firstMapIndex; i < lastMapIndex; i++){
            var mm_from = $scope.reservationsMapHrs[i] % 100;
            var hh_from = ($scope.reservationsMapHrs[i] - mm_from) / 100;
            reservation.timeFromDropdown.push(((hh_from<10)?'0':'') + hh_from + ':' + ((mm_from<10)?'0':'') + mm_from);
        }
        for (var i = firstMapIndex + 1; i <= lastMapIndex; i++){
            var mm_from = $scope.reservationsMapHrs[i] % 100;
            var hh_from = ($scope.reservationsMapHrs[i] - mm_from) / 100;
            reservation.timeToDropdown.push(((hh_from<10)?'0':'') + hh_from + ':' + ((mm_from<10)?'0':'') + mm_from);
        }
        if (lastMapIndex == $scope.reservationsMapHrs.length - 1){
            reservation.timeFromDropdown.push('21:30');
            reservation.timeToDropdown.push('22:00');
        }
    
    }

    $scope.reservation = {};
    $scope.showReservationEntry = function(reservation, imatrikulace, hhmm){
        // $scope.reservationsMap[x.imatrikulace][hhmm] = x;

        if (reservation == undefined){
            var mm_from = hhmm % 100;
            var hh_from = (hhmm - mm_from) / 100;
            var hh_to = hh_from;
            var mm_to = 30;
            if (mm_from == 30){
                hh_to++;
                mm_to = 0;
            }

            var currentdate = new Date($scope.actualWeek.days[$scope.actualWeek.d].d_from); 
            // var t_from = new Date($scope.actualWeek.days[$scope.actualWeek.d].d_from);
            // var t_to = new Date($scope.actualWeek.days[$scope.actualWeek.d].d_from); 

            // if ((hh_from != undefined)&&(mm_from != undefined)){
            //     t_from.setHours(hh_from, mm_from); 
            // }
            // if ((hh_to != undefined)&&(mm_to != undefined)){
            //     t_to.setHours(hh_to, mm_to); 
            // }

            $scope.reservation = {};
            $scope.reservation.ID = 0;
            if ($scope.usr.admin == 0){
                $scope.reservation.USER_EMAIL = $scope.usr.e;
            } else {
                $scope.filter.origView = $scope.viewMode * 1;
                $scope.reservation.USER_EMAIL = $scope.filter.e;
            }
            $scope.reservation.d = currentdate.ddmmyyyy();
            $scope.reservation.d_dt = currentdate;
            $scope.reservation.t_from = ((hh_from<10)?'0':'') + hh_from + ':' + ((mm_from<10)?'0':'') + mm_from;
            $scope.reservation.t_to = ((hh_to<10)?'0':'') + hh_to + ':' + ((mm_to<10)?'0':'') + mm_to;
            $scope.reservation.imatrikulace = imatrikulace;
            $scope.reservation.airfield = 'LKMB';
            $scope.reservation.STATUS = 0;
            $scope.reservation.instruktor = 0;
            $scope.reservation.flightType = '';
            $scope.reservation.note = '';
            $scope.reservation.instruktorName = '';
        } else {
            $scope.reservation = reservation;
            $scope.reservation.d = new Date($scope.reservation.t_from_ymd.replace(' ','T')).ddmmyyyy();
            $scope.reservation.d_dt = new Date($scope.reservation.t_from_ymd.replace(' ','T'));
            $scope.reservation.t_from = $scope.reservation.t_from_ymd.split(' ')[1];
            $scope.reservation.t_to = $scope.reservation.t_to_ymd.split(' ')[1];
        }

        $scope.fillReservationDropdown($scope.reservation);
        
        $scope.viewMode = 11;
    }

    $scope.fillFullDayReservation_Aircraft = function(flightType, interval){
        $scope.reservation.USER_EMAIL = $scope.usr.e;
        $scope.reservation.instruktor = 0;
        $scope.reservation.instruktorName = '';
        $scope.reservation.flightType = flightType;
        $scope.reservation.t_from = '05:00';
        $scope.reservation.t_to = '22:00';
    }

    $scope.fillFullDayReservation_Instruktor = function(flightType, interval){
        $scope.reservation.USER_EMAIL = $scope.usr.e;
        $scope.reservation.instruktor = 1;
        $scope.reservation.instruktorName = '';
        $scope.reservation.flightType = flightType;
        $scope.reservation.t_from = '05:00';
        $scope.reservation.t_to = '22:00';
    }

    $scope.showReservationDeleteQuestion = function(reservation){
        $scope.dialogAction = { "kod": 2 };
        $scope.dialogHeader = 'Smazat rezervaci: ' + reservation.d + ' ' + reservation.t_from + ' - ' + reservation.t_to + ', ' + reservation.imatrikulace + '?';
        $scope.selectedRecord = reservation;

        $('#divDialogYesNo').modal('show');
    }

    $scope.showReservationsOverviewSimple = function(){
        $scope.viewMode = 12;
        $scope.refreshReservationsOverview($scope.actualWeek.days[$scope.actualWeek.d].d_from);
    }

    $scope.showReservationsOverview = function(e){
        $scope.viewMode = 12;
        if (e != undefined){
            $scope.filter.e = e;
        }
        $scope.filter.origView = (e=='')?0:9;
        $scope.refreshListWeeks($scope.actualYear);
    }

    $scope.scrollToActualValue = function(el, pos){
        // $('#yourUL').scrollTop($('#yourUL li:nth-child(14)').position().top);
        // $('#yourUL').scrollLeft($('#yourUL li:nth-child(14)').position().left);

        // $('#yourUL').scrollTop(0).scrollTop($('#yourUL li:nth-child(14)').position().top);
        var scrollTo = el + ' li:nth-child(' + pos + ')';
        $(el).scrollTop(0).scrollTop($(scrollTo).position().top);

        console.log('scrollToActualValue: pos='+pos)
    }

    $scope.actualYear = new Date().getFullYear();
    $scope.actualWeek = {};

    $scope.refreshReservations = function(wk){
        $scope.actualWeek = wk;
        if (wk.WK == wk.WK_TODAY){
            var now = new Date();
            var today = now.getDay();
            $scope.actualWeek.d = (today==0)?7:today;
        } else {
            $scope.actualWeek.d = 1;
        }
        $scope.refreshReservations_setDay($scope.actualWeek.d);
        console.log($scope.actualWeek);
    }

    $scope.refreshReservations_setDay = function(d){
        $scope.actualWeek.d = d;
        console.log($scope.actualWeek.days[d]);

        $scope.refreshReservationsOverview($scope.actualWeek.days[d].d_from);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.reservations = [];
    $scope.reservationsMap = [];
    $scope.reservationsMapHrs = [500,530,600,630,700,730,800,830,900,930,1000,1030,1100,1130,1200,1230,1300,1330,1400,1430,1500,1530,1600,1630,1700,1730,1800,1830,1900,1930,2000,2030,2100,2130];
    $scope.refreshReservationsOverview = function(d_from){
        $http({
            url: "JSON/api.asmx/LKMB_getReservations",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, d_from: d_from
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.reservations.length = 0;
            $scope.reservationsMap = [];
            JSON.parse(data.d).forEach(function(x){
                if (x.ID > 0){
                    x.preview = x.n;
                    x.tooltip = x.n + '\nTyp letu: ' + x.flightType;
                    if (x.instruktorName != ''){
                        // x.previewInstruktor = x.imatrikulace;
                        x.previewInstruktor = x.n;
                        x.tooltipInstruktor = 'Imatrikulace: ' + x.imatrikulace + '\n' + x.tooltip;
                        x.tooltip += '\nInstruktor: ' + x.instruktorName;
                    }
                    if (x.note != ''){
                        x.tooltip += '\nPoznámka: ' + x.note;
                    }
                } else {
                    x.STATUS += 10;
                    x.tooltip = 'Typ letu: ' + x.flightType;
                    x.preview = x.flightType;
                    if (x.instruktorName != ''){
                        x.tooltip += '\nInstruktor: ' + x.instruktorName;
                        // x.preview += '\nInstruktor: ' + x.instruktorName;
                        // x.previewInstruktor = x.imatrikulace;
                        x.previewInstruktor = x.n;
                        x.tooltipInstruktor = 'Imatrikulace: ' + x.imatrikulace + '\nTyp letu: ' + x.flightType;
                    }
                }

                x.colspan = x.map.split(',').length;

                if ((x.colspan < 3)&&(x.STATUS > 10)&&(x.instruktorName == '')) {
                    //flightType
                    x.preview = '';
                }
                if ((x.colspan < 4)&&((x.STATUS < 10)||(x.instruktorName != ''))) {
                    var shortPreview = '';
                    var arrPreview = x.n.split(' ');
                    var indexPreviewMax = arrPreview.length;
                    if (indexPreviewMax > 2) {
                        indexPreviewMax = 2;
                    }
                    for (i = 0; i < indexPreviewMax; i++){
                        shortPreview += arrPreview[i].charAt(0).toUpperCase();
                    }
                    //name
                    x.preview = shortPreview;
                    if (x.instruktorName != ''){
                        x.previewInstruktor = shortPreview;
                    }
                }
                if (x.colspan < 3) {
                    //no icons
                    x.instruktor = 0;
                    x.eye_icon = 0;
                    x.servis_icon = 0;
                    x.lend_icon = 0;
                }
                if (x.colspan == 1) {
                    x.preview = '';
                    x.previewInstruktor = '';
                }
                // x.tooltip += '\n\ncolspan: ' + x.colspan;

                var firstMapIndex = -1;
                var lastMapIndex = -1;
                x.map.split(',').forEach(function(hhmm){
                    hhmm = hhmm * 1;
                    if ($scope.reservationsMap[x.imatrikulace] == undefined){
                        $scope.reservationsMap[x.imatrikulace] = [];
                    }
                    if (firstMapIndex == -1){
                        firstMapIndex = $scope.reservationsMapHrs.indexOf(hhmm);
                        lastMapIndex = firstMapIndex;
                    } else {
                        lastMapIndex = $scope.reservationsMapHrs.indexOf(hhmm);
                    }
                    $scope.reservationsMap[x.imatrikulace][hhmm] = x;
                    if (x.instruktorName != ''){
                        if ($scope.reservationsMap[x.instruktorName] == undefined){
                            $scope.reservationsMap[x.instruktorName] = [];
                        }
                        $scope.reservationsMap[x.instruktorName][hhmm] = x;
                    }
                });

                x.firstMapIndex = firstMapIndex;
                x.firstHHMM = $scope.reservationsMapHrs[x.firstMapIndex];
                // x.tooltip += '\nfirstMapIndex: ' + x.firstMapIndex;
                // x.tooltip += '\nfirstMapIndex HHMM: ' + x.firstHHMM;

                $scope.reservations.push(x);

                var fakeReservation_30minutes_pause = {};
                fakeReservation_30minutes_pause.STATUS = -1;
                fakeReservation_30minutes_pause.colspan = 1;
                if (firstMapIndex > -1){
                    if (firstMapIndex > 0){
                        $scope.reservationsMap[x.imatrikulace][$scope.reservationsMapHrs[firstMapIndex - 1]] = angular.copy(fakeReservation_30minutes_pause);
                        $scope.reservationsMap[x.imatrikulace][$scope.reservationsMapHrs[firstMapIndex - 1]].firstHHMM = $scope.reservationsMapHrs[firstMapIndex - 1];
                        if (x.instruktorName != ''){
                            $scope.reservationsMap[x.instruktorName][$scope.reservationsMapHrs[firstMapIndex - 1]] = angular.copy(fakeReservation_30minutes_pause);
                            $scope.reservationsMap[x.instruktorName][$scope.reservationsMapHrs[firstMapIndex - 1]].firstHHMM = $scope.reservationsMapHrs[firstMapIndex - 1];
                        }
                    }
                    if (lastMapIndex < $scope.reservationsMapHrs.length - 1){
                        $scope.reservationsMap[x.imatrikulace][$scope.reservationsMapHrs[lastMapIndex + 1]] = angular.copy(fakeReservation_30minutes_pause);
                        $scope.reservationsMap[x.imatrikulace][$scope.reservationsMapHrs[lastMapIndex + 1]].firstHHMM = $scope.reservationsMapHrs[lastMapIndex + 1];
                        if (x.instruktorName != ''){
                            $scope.reservationsMap[x.instruktorName][$scope.reservationsMapHrs[lastMapIndex + 1]] = angular.copy(fakeReservation_30minutes_pause);
                            $scope.reservationsMap[x.instruktorName][$scope.reservationsMapHrs[lastMapIndex + 1]].firstHHMM = $scope.reservationsMapHrs[lastMapIndex + 1];
                        }
                    }
                }
            });

            var fakeReservation_empty = {};
            fakeReservation_empty.STATUS = -2;
            fakeReservation_empty.colspan = 1;

            $scope.listAircraft.forEach(function(x){
                if ($scope.reservationsMap[x.imatrikulace] == undefined){
                    $scope.reservationsMap[x.imatrikulace] = [];
                }
                $scope.reservationsMapHrs.forEach(function(hrs){
                    if ($scope.reservationsMap[x.imatrikulace][hrs] == undefined){
                        $scope.reservationsMap[x.imatrikulace][hrs] = angular.copy(fakeReservation_empty);
                        $scope.reservationsMap[x.imatrikulace][hrs].firstHHMM = hrs;
                    }
                });
            });

            // console.log($scope.reservationsMap['OK-NUU 86']);

            $scope.listInstruktor.forEach(function(x){
                if ($scope.reservationsMap[x] == undefined){
                    $scope.reservationsMap[x] = [];
                }
                $scope.reservationsMapHrs.forEach(function(hrs){
                    if ($scope.reservationsMap[x][hrs] == undefined){
                        $scope.reservationsMap[x][hrs] = angular.copy(fakeReservation_empty);
                        $scope.reservationsMap[x][hrs].firstHHMM = hrs;
                    }    
                });
            });

        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshReservationsOverview", data, status);
        });
    }
    
    $scope.LKMB_reservation = function(reservation){
        var dYMD = reservation.d_dt.yyyymmdd();

        $http({
            url: "JSON/api.asmx/LKMB_reservation",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: reservation.ID, D_FROM: dYMD + ' ' + reservation.t_from, D_TO: dYMD + ' ' + reservation.t_to
                , AIRFIELD: reservation.airfield, USER_EMAIL: reservation.USER_EMAIL
                , INSTRUKTOR: reservation.instruktor, INSTRUKTOR_NAME: reservation.instruktorName, STATUS: reservation.STATUS,
                NOTE: reservation.note, FLIGHT_TYPE: reservation.flightType, IMATRIKULACE: reservation.imatrikulace
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            var ret = JSON.parse(data.d)[0];
            if (ret.ret == 'OK'){
                $scope.showReservationsOverviewSimple();
                console.log('Reservation inserted.');
            } else {
                reservation.err = 1;
                reservation.errMsg = ret.ret;
            }
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_reservation", data, status);
        });
    }

    $scope.LKMB_reservation_delete = function(reservation){
        var dYMD = reservation.d_dt.yyyymmdd();
        
        reservation.note = 'DELETE';
        $http({
            url: "JSON/api.asmx/LKMB_reservation",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: reservation.ID, D_FROM: dYMD + ' ' + reservation.t_from, D_TO: dYMD + ' ' + reservation.t_to
                , AIRFIELD: reservation.airfield, USER_EMAIL: reservation.USER_EMAIL
                , INSTRUKTOR: reservation.instruktor, INSTRUKTOR_NAME: reservation.instruktorName, STATUS: reservation.STATUS,
                NOTE: reservation.note, FLIGHT_TYPE: reservation.flightType, IMATRIKULACE: reservation.imatrikulace
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.showReservationsOverviewSimple();
            console.log('Reservation deleted.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_reservation_delete", data, status);
        });
    }

    $scope.LKMB_reservation_status = function(reservation, STATUS){
        reservation.STATUS = STATUS;
        $scope.LKMB_reservation(reservation);
        // $http({
        //     url: "JSON/api.asmx/LKMB_reservation_status",
        //     method: 'POST',
        //     contentType: "text/plain; charset=utf-8",
        //     dataType: 'json',
        //     data: {
        //         usr: $scope.usr.e, token: $scope.usr.t,  ID: reservation.ID, STATUS: STATUS, 
        //         USER_EMAIL: reservation.USER_EMAIL
        //     },
        //     headers: { 'Content-Type': 'application/json' }
        // }).success(function (data, status, headers, config) {
        //     // $scope.showFlightsOverview();
        //     reservation.STATUS = STATUS;
        //     console.log('Reservation updated.');
        // }).error(function (data, status, headers, config) {
        //     $scope.handleERR("LKMB_reservation_status", data, status);
        // });
    }

    $scope.showPaymentsOverviewSimple = function(){
        $scope.viewMode = 6;
    }

    $scope.showFailuresOverview = function(){
        $scope.viewMode = 13;
        $scope.refreshFailuresOverview();
    }

    $scope.failures = [];
    $scope.refreshFailuresOverview = function(){
        $http({
            url: "JSON/api.asmx/LKMB_getFailures",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.failures.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.failures.push(x);
            });
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshFailuresOverview", data, status);
        });
    }

    $scope.failure = {};
    $scope.showFailureEntry = function(failure){
        if (failure == undefined){
            var currentdate = new Date(); 
            $scope.failure = {};
            $scope.failure.ID = 0;
            $scope.failure.d = currentdate.ddmmyyyy();
            $scope.failure.d_dt = currentdate;
            if ($scope.usr.admin == 1){
                $scope.failure.USER_EMAIL = $scope.filter.e;
                $scope.filter.origView = $scope.viewMode * 1;
            } else {
                $scope.failure.USER_EMAIL = $scope.usr.e;
            }
            $scope.failure.PRICE = 0;
            $scope.failure.IMATRIKULACE = '';
            $scope.failure.NOTE = '';
        } else {
            $scope.failure = failure;
            $scope.failure.d_dt = new Date($scope.failure.dYMD.replace(' ','T'));
        }
        $scope.viewMode = 14;
    }

    $scope.LKMB_failure = function(failure){
        $http({
            url: "JSON/api.asmx/LKMB_failure",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: failure.ID, DATE: failure.d_dt.yyyymmddhhmm(), PRICE: failure.PRICE, 
                USER_EMAIL: failure.USER_EMAIL, IMATRIKULACE: failure.IMATRIKULACE, NOTE: failure.NOTE
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.showFailuresOverview();
            console.log('Failure inserted.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_failure", data, status);
        });
    }

    $scope.LKMB_failure_solve = function(failure, SOLVED){
        $http({
            url: "JSON/api.asmx/LKMB_failure_solve",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t,  ID: failure.ID, SOLVED: SOLVED, 
                USER_EMAIL: failure.USER_EMAIL
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            // $scope.showFlightsOverview();
            failure.SOLVED = SOLVED;
            console.log('Failure solved.');
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_failure_solve", data, status);
        });
    }

    $scope.showPaymentsOverview = function(e){
        $scope.viewMode = 6;
        if (e != undefined){
            $scope.filter.e = e;
        }
        $scope.filter.origView = (e=='')?0:9;
        $scope.refreshPaymentsOverview();
    }

    $scope.listInstruktor = ['Radomír Pečínka','Tomáš Svárovský', 'Ondřej Süsser'];

    $scope.listAircraft = [];
    $scope.refreshListAircraft = function(){

        $http({
            url: "JSON/api.asmx/LKMB_getAircraft",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.listAircraft.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.listAircraft.push(x);
            });
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshListAircraft", data, status);
        });
    }

    $scope.listWeeks = [];
    $scope.refreshListWeeks = function(yyyy){

        $http({
            url: "JSON/api.asmx/LKMB_getWeeks",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, yyyy: yyyy
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.listWeeks.length = 0;
            JSON.parse(data.d).forEach(function(x){
                var wd_arr = [];
                wd_arr.push({});
                wd_arr.push({'d_DMY': x.MON_DMY, 'd_from': x.MON_FROM, 'd_to': x.MON_TO});
                wd_arr.push({'d_DMY': x.TUE_DMY, 'd_from': x.TUE_FROM, 'd_to': x.TUE_TO});
                wd_arr.push({'d_DMY': x.WED_DMY, 'd_from': x.WED_FROM, 'd_to': x.WED_TO});
                wd_arr.push({'d_DMY': x.THU_DMY, 'd_from': x.THU_FROM, 'd_to': x.THU_TO});
                wd_arr.push({'d_DMY': x.FRI_DMY, 'd_from': x.FRI_FROM, 'd_to': x.FRI_TO});
                wd_arr.push({'d_DMY': x.SAT_DMY, 'd_from': x.SAT_FROM, 'd_to': x.SAT_TO});
                wd_arr.push({'d_DMY': x.SUN_DMY, 'd_from': x.SUN_FROM, 'd_to': x.SUN_TO});
                x.days = wd_arr;
                $scope.listWeeks.push(x);
            });

            $scope.listWeeks.forEach(function(wk){
                if (wk.WK == wk.WK_TODAY){
                    $scope.refreshReservations(wk);
                }
            });
                    }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_getWeeks", data, status);
        });

    }

    $scope.userEmails = [];
    $scope.defaultPriceList = [];
    $scope.refreshUserEmails = function(){

        $http({
            url: "JSON/api.asmx/LKMB_getUsers",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, ACTIVE_ONLY: 1
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.userEmails.length = 0;
            $scope.defaultPriceList.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.userEmails.push({'e':x.e, 'n':x.sn + ' ' + x.fn, 'defaultPrice': x.defaultPrice});
                if ($scope.defaultPriceList.indexOf(x.defaultPrice) == -1){
                    $scope.defaultPriceList.push(x.defaultPrice);
                }
            });
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshUserEmails", data, status);
        });

    }

    $scope.updateAccountEmail = function(x, eNew){

        $http({
            url: "JSON/api.asmx/LKMB_updateAccountEmail",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, eOld: x.e, eNew: eNew
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            x.act = act;
        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_updateAccountEmail", data, status);
        });

    }

    $scope.updateAccountActive = function(x, act){

        $http({
            url: "JSON/api.asmx/LKMB_updateAccountActive",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, e: x.e, act: act
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            x.act = act;
        }).error(function (data, status, headers, config) {
            $scope.handleERR("updateAccountActive", data, status);
        });

    }

    $scope.monthsFilter = [];
    $scope.getMonthsFilter = function(){
        $http({
            url: "JSON/api.asmx/getMonthsFilter",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, email: $scope.filter.e
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.monthsFilter.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.monthsFilter.push(x);
            });
        }).error(function (data, status, headers, config) {
            $scope.handleERR("getMonthsFilter", data, status);
        });

    }

    $scope.payments = [];
    $scope.paymentsTotal = [];
    $scope.refreshPaymentsOverview = function(mn, mm, yy){
        // $scope.search.e = '';
        if (mn == undefined) { mn = new Date().toLocaleString("cs-cz", { month: "long" });}
        if (mm == undefined) { mm = new Date().getMonth() + 1;}
        if (yy == undefined) { 
            if ($scope.usr.admin == 1){
                yy = 0;
            } else {
                yy = new Date().getFullYear();
            }
        }

        if (yy == 0){
            $scope.filterMonth.mn = ' - všechna data - ';
            $scope.filterMonth.mm = '';
            $scope.filterMonth.yy = '';
        } else {
            $scope.filterMonth.mn = ' z měsíce ' + mn;
            $scope.filterMonth.mm = mm;
            $scope.filterMonth.yy = yy;
        }
        $http({
            url: "JSON/api.asmx/LKMB_getPayments",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, email: $scope.filter.e, mm: mm, yy: yy
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.payments.length = 0;
            $scope.paymentsTotal.length = 0;
            $scope.showFileContent = 0;
            JSON.parse(data.d).forEach(function(x){
                x.AMOUNT_F = numberWithCommas(x.AMOUNT);
                if (x.d == '000000'){
                    $scope.paymentsTotal.push(x);
                }else{
                    $scope.payments.push(x);
                }
            });
            $scope.updatePaymentsTotalsFiltered();
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshPaymentsOverview", data, status);
        });
    }

    $scope.payment = {};
    $scope.showPaymentEntry = function(payment){
        if (payment == undefined){
            var currentdate = new Date(); 
            $scope.payment = {};
            $scope.payment.ID = 0;
            $scope.payment.d = currentdate.ddmmyyyy();
            $scope.payment.d_dt = currentdate;
            if ($scope.usr.admin == 1){
                $scope.payment.USER_EMAIL = $scope.filter.e;
                $scope.filter.origView = $scope.viewMode * 1;
            } else {
                $scope.payment.USER_EMAIL = $scope.usr.e;
            }
            $scope.payment.AMOUNT = 0;
            $scope.payment.PAYMENT_TYPE = '';
            $scope.payment.DOCUMENT = '';
        } else {
            $scope.payment = payment;
            $scope.payment.d_dt = new Date($scope.payment.dYMD.replace(' ','T'));
        }

        
        $scope.viewMode = 10;
    }

    $scope.showFlightsOverviewSimple = function(){
        $scope.viewMode = 7;
    }

    $scope.showFlightsOverview = function(e){
        if (e != undefined){
            $scope.filter.e = e;
        }
        $scope.viewMode = 7;
        $scope.filter.origView = (e=='')?0:9;
        $scope.refreshFlightsOverview();
    }

    $scope.flights = [];
    $scope.flightsTotal = [];
    $scope.filterMonth = {};
    $scope.refreshFlightsOverview = function(mn, mm, yy){
        // $scope.search.e = '';
        if (mn == undefined) { mn = new Date().toLocaleString("cs-cz", { month: "long" });}
        if (mm == undefined) { mm = new Date().getMonth() + 1;}
        if (yy == undefined) { 
            if ($scope.usr.admin == 1){
                yy = 0;
            } else {
                yy = new Date().getFullYear();
            }
        }
        if (yy == 0){
            $scope.filterMonth.mn = ' - všechna data - ';
            $scope.filterMonth.mm = '';
            $scope.filterMonth.yy = '';
        } else {
            $scope.filterMonth.mn = ' z měsíce ' + mn;
            $scope.filterMonth.mm = mm;
            $scope.filterMonth.yy = yy;
        }
        $http({
            url: "JSON/api.asmx/LKMB_getFlights",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, email: $scope.filter.e, mm: mm, yy: yy
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.flights.length = 0;
            $scope.flightsTotal.length = 0;
            $scope.showFileContent = 0;
            JSON.parse(data.d).forEach(function(x){
                x.PRICE_F = numberWithCommas(x.PRICE);
                x.durationHH = x.durationHHMM.split(':')[0];
                x.durationMM = x.durationHHMM.split(':')[1];
        
                if (x.d == '000000'){
                    $scope.flightsTotal.push(x);
                }else{
                    $scope.flights.push(x);
                }
            });
            $scope.updateFlightsTotalsFiltered();
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshFlightsOverview", data, status);
        });

    }

    $scope.flight = {};
    $scope.showFlightEntry = function(flight){
        if (flight == undefined){
            var currentdate = new Date(); 
            $scope.flight = {};
            $scope.flight.ID = 0;
            if ($scope.usr.admin == 0){
                $scope.flight.USER_EMAIL = $scope.usr.e;
                $scope.flight.MINUTE_PRICE = $scope.usr.defaultPrice;
                $scope.flight.POSADKA = $scope.usr.n;
            } else {
                $scope.filter.origView = $scope.viewMode * 1;
                $scope.flight.USER_EMAIL = $scope.filter.e;
                $scope.flight.MINUTE_PRICE = '';
                $scope.flight.POSADKA = '';
            }
            $scope.flight.d = currentdate.ddmmyyyy();
            $scope.flight.d_dt = currentdate;
            $scope.flight.imatrikulace = '';
            $scope.flight.takeoff = 'LKMB';
            $scope.flight.landing = 'LKMB';
            $scope.flight.duration = 0;
            $scope.flight.startsNumber = 1;
            $scope.flight.flightType = '';
            $scope.flight.note = '';
            $scope.flight.counterBegin = '';
            $scope.flight.counterEnd = '';
            
            $scope.flight.PRICE = 0;
            $scope.flight.INSTRUKTOR = 0;
            $scope.flight.APPROVED = 0;
        } else {
            $scope.flight = flight;
            $scope.flight.d_dt = new Date($scope.flight.dYMD.replace(' ','T'));
            $scope.flightUpdatePrice($scope.flight);
        }
        
        $scope.viewMode = 5;
    }
    $scope.showFlightEntry_Copy = function(flight){
        $scope.flight = flight;
        $scope.flight.ID = 0;
        $scope.flight.APPROVED = 0;
        $scope.flight.d_dt = new Date($scope.flight.dYMD.replace(' ','T'));
        $scope.flightUpdatePrice($scope.flight);

        $scope.viewMode = 5;
    }

    $scope.showFlightDeleteQuestion = function(flight){
        $scope.dialogAction = { "kod": 1 };
        $scope.dialogHeader = 'Smazat let: ' + flight.d + ', ' + flight.imatrikulace + ', ' + flight.POSADKA + '?';
        $scope.selectedRecord = flight;

        $('#divDialogYesNo').modal('show');
    }

    $scope.flightUpdateDuration = function(flight){
        if ((flight.counterBegin != '')&&(flight.counterBegin < flight.counterEnd)){
            flight.duration = Math.round((flight.counterEnd - flight.counterBegin) * 60.0);
            $scope.flightUpdatePrice(flight);    
        }
    }

    $scope.flightUpdatePrice = function(flight){
        flight.PRICE = flight.duration * flight.MINUTE_PRICE;
    }

    $scope.showUsersOverview = function(){
        // $scope.search.e = '';
        $scope.viewMode = 9;
        $scope.search.act = 1;
        $scope.refreshUsersOverview();
    }

    $scope.users = [];
    $scope.refreshUsersOverview = function(){

        $http({
            url: "JSON/api.asmx/LKMB_getUsers",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                usr: $scope.usr.e, token: $scope.usr.t, ACTIVE_ONLY: 0
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.users.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.users.push(x);
            });
            $scope.userEmails.length = 0;
            $scope.defaultPriceList.length = 0;
            JSON.parse(data.d).forEach(function(x){
                $scope.userEmails.push({'e':x.e, 'n':x.sn + ' ' + x.fn, 'defaultPrice': x.defaultPrice});
                if ($scope.defaultPriceList.indexOf(x.defaultPrice) == -1){
                    $scope.defaultPriceList.push(x.defaultPrice);
                }
            });
        }).error(function (data, status, headers, config) {
            $scope.handleERR("refreshUsersOverview", data, status);
        });

    }

    $scope.genJSON = function(x) {
        $scope.obj_json = JSON.stringify(x, null, 4);
    }

    $scope.formatJSON = function(x) {
        return JSON.stringify(x, null, 4);
    }

    $scope.saveJSON = function(jsonData, name) {
        var text = JSON.stringify(jsonData);
        var a = document.createElement('a');
        // a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
        a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
        a.setAttribute('download', name);
        document.body.appendChild(a);
        a.click()
    }

    $scope.file = {};
    $scope.fileContentBase64 = '';
    $scope.readAsBase64 = function (f) {
        $scope.file = f;
        fileReader.readAsBase64(f, $scope)
                      .then(function (result) {
                          $scope.fileContentBase64 = result.match(/,(.*)$/)[1];
                          $scope.parseXlsToJSON_base64($scope.fileContentBase64);
                      });
    };

    
    $scope.xlsJSON = [];
    $scope.zipJSON = [];
    $scope.parseXlsToJSON_base64 = function (b64) {
        $scope.xlsJSON.length = 0;
        $scope.error = '';

        // var XLSX = require('xlsx');
        // var workbook = XLSX.readFile('./test.xlsx');
        // var sheet_name_list = workbook.SheetNames;
        // let columnHeaders = [];
        // for (var sheetIndex = 0; sheetIndex < sheet_name_list.length; sheetIndex++) {
        //     var worksheet = workbook.Sheets[sheet_name_list[sheetIndex]];
        //     for (let key in worksheet) {
        //         let regEx = new RegExp("^\(\\w\)\(1\){1}$");
        //         if (regEx.test(key) == true) {
        //             columnHeaders.push(worksheet[key].v);
        //         }
        //     }
        // }

        try {
            var workbook = XLSX.read(b64, { type: 'base64' });
            $scope.showFileContent = 1;

            // workbook.SheetNames.forEach(function (sheetName) {
            //     var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                switch ($scope.viewMode) {
                    case 7:
                        //FLIGHTS;
                        var flightsXlsRows = [];

                        // var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
                        // angular.forEach(XL_row_object, function (r) {

                        //     console.log('flightsXlsRows.length = ' + flightsXlsRows.length);
                        //     console.log(r);

                        //     r.imatrikulace = r['Imatrikulace'];
                        //     if (r.imatrikulace != undefined){
                        //         r.datum = r['Datum'];
                        //         r.posadka = r['Posádka'];
                        //         r.Instruktor = '';
                        //         r.flightType = r['Typ letu'];   
                        //         if ((r.flightType.indexOf('výcvik') > -1)||(r.flightType.indexOf('kondiční') > -1)||(r.flightType.indexOf('pře') > -1)){
                        //             if (r.posadka.indexOf('Svárovský') > -1){
                        //                 r.Instruktor = 'x';
                        //             }
                        //             if (r.posadka.indexOf('Dráždil') > -1){
                        //                 r.Instruktor = 'x';
                        //             }
                        //         }
                        //         r.takeoff = r['Vzlet'];
                        //         r.landing = r['Přistání'];   
                                
                        //         r.DL_MM = 1 * r['Čas letu MIN'].split(':')[1] + 60 * r['Čas letu MIN'].split(':')[0];
                        //         r.casOrig = r['Čas letu MIN'];
    
                        //         r.starty = r['Počet startů'];
    
                        //         r.poznamka = r['Poznámka'];
                                
                        //         r.CZK = r['Cena'].replace('.','').replace(',','');
                        //         r.sazba = r['Sazba'];
                        
                        //         r.changed = false;
                        //         r.OK = 0;
                        //         r.ERR = 0;
                        //         r.errSave = '';
                        //         r.jsonSRC = JSON.stringify(r, null, 4);
    
                        //         flightsXlsRows.push(r);    
                        //     }
                        // });
                        // console.log('flightsXlsRows.length = ' + flightsXlsRows.length);

                        var aircraftList = workbook.SheetNames;
                        let columnHeaders = [];
                        for (var sheetIndex = 0; sheetIndex < aircraftList.length; sheetIndex++) {
                            var worksheet = workbook.Sheets[aircraftList[sheetIndex]];
                            for (let key in worksheet) {
                                let regEx = new RegExp("^\(\\w\)\(1\){1}$");
                                if (regEx.test(key) == true) {
                                    columnHeaders.push(worksheet[key].v);
                                }
                            }
                        }
                        aircraftList.forEach(function (imatrikulace) {
                            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[imatrikulace]);
                            // var XL_row_test = XLSX.utils.sheet_to_json(workbook.Sheets[imatrikulace]);
                            // console.log('XL_row_test');
                            // console.log(XL_row_test);
                            //upravit nazvy sloupcu
                            angular.forEach(XL_row_object, function (r) {
                                // r.prijmeni = r['Přijmení'] + ',' + r['Jméno'];
                                // if (r['Datum'] == undefined) {
                                //     r.prijmeni = r['Jméno pracovníka'];
                                // }
                                if ((r['__EMPTY'] != undefined) && (Object.keys(r).indexOf('__EMPTY')) == (Object.keys(r).indexOf('Doba letu') + 1)) {
                                    r.DL_MM = r['__EMPTY'] + 60 * r["Doba letu"];
                                }
                                // if ((r['DL_MM'] != undefined)) {
                                //     r.DL_MM = r['DL_MM'] + 60 * r["DL_HH"];
                                // }
                                r.imatrikulace = imatrikulace;

                                r.posadka = r['Posádka'];

                                r.trasa = r['Vzlet a přistání'];
                                if (r.trasa != undefined){
                                    r.takeoff = r.trasa.split('-')[0];
                                    r.landing = r.trasa.split('-')[1];    
                                } else {
                                    r.takeoff = r['Vzlet'];
                                    if (r.takeoff == undefined){
                                        r.takeoff = r['VZLET'];
                                    }
                                    r.landing = r['Přistání'];
                                    r.trasa = r.takeoff + ' - ' + r.landing;
                                }

                                r.starty = r['Starty'];
                                r.poznamka = r['Poznámka'];
                                r.flightType = r['Typ letu'];   
                                
                                r.CZK = r[' Platba CZK '];
                                if (r.CZK == undefined){
                                    r.CZK = r['Platba CZK'];
                                }
                                r.sazba = r[' Sazba\r\n za MIN '];
                                if (r.sazba == undefined){
                                    r.sazba = r['Sazba\r\n za MIN'];
                                }
                        
                                r.changed = false;
                                r.OK = 0;
                                r.ERR = 0;
                                r.errSave = '';
                                if ((r['Datum'] != undefined)&&(r['DL_MM'] != undefined)) {
                                    var d = new Date(1900, 0, 1);
                                    d = d.addDays(r['Datum']);
                                    d = d.addDays(-2);
                                    r.datum = d.ddmmyyyy();
                                    if (r.datum == undefined){
                                        r.datum = r['Datum'];
                                    }
                                    r.jsonSRC = JSON.stringify(r, null, 4);
    
                                    flightsXlsRows.push(r);
                                }
                            })
                        }); //aircraftList.forEach


                        $scope.xlsJSON.push({ "list": 'sheetName', "rows": flightsXlsRows });
                        $scope.subSection = 1;
                        break;
                    default:
                        break;
                }
        }
        catch (err) {
            $scope.error = err.message;
        }

        // $scope.$apply();
        $scope.loadingFile = false;
    };

    $scope.exportToExcel = function (tableId, name) {
        var elem = $(tableId);
        var elemClone = elem.clone();
        elemClone = elemClone.find('.noxls').remove().end();

        angular.forEach(elemClone.find('.tableHeader1'), function (el) {
            el.setAttribute('style', 'background-color:#880000 !important;color:white;font-weight: bold;');
        });
        angular.forEach(elemClone.find('.tableHeader2'), function (el) {
            el.setAttribute('style', 'background-color:#444444 !important;color:white;');
        });
        angular.forEach(elemClone.find('.green-text'), function (el) {
            el.setAttribute('style', 'color:green;');
        });
        angular.forEach(elemClone.find('.red-text'), function (el) {
            el.setAttribute('style', 'color:red;');
        });

        // tableId = tableId.replace('#','');
        // var testElem1 = document.getElementById(tableId);
        // console.log(testElem1);
        // var wb = XLSX.utils.table_to_book(document.getElementById(tableId));
        var wb = XLSX.utils.table_to_book(elemClone[0], {raw:true});
        XLSX.writeFile(wb, name + ".xlsx");
    }

    // Copies a string to the clipboard. Must be called from within an 
    // event handler such as click. May return false if it failed, but
    // this is not always possible. Browser support for Chrome 43+, 
    // Firefox 42+, Safari 10+, Edge and IE 10+.
    // IE: The clipboard feature may be disabled by an administrator. By
    // default a prompt is shown the first time the clipboard is 
    // used (per session).
    $scope.copyToClipboard = function(text, showAlert, elementId) {
        if (elementId == undefined) {
            copyToClipboard(text, showAlert);
        } else {
            copyToClipboardModal(text, showAlert, elementId);
        }
    }
    copyToClipboard = function(text, showAlert) {
        var ret = false;
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            // return clipboardData.setData("Text", text); 
            ret = clipboardData.setData("Text", text); 
            // alert("OK");
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                // return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                ret = document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                ret = false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
        if (ret){
            if (showAlert == true){
                alert("OK");
            }
        } else {
            alert("Sh*t happened!");
        }
    }

    copyToClipboardModal = function(text, showAlert, elementId) {
        var ret = false;
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            // return clipboardData.setData("Text", text); 
            ret = clipboardData.setData("Text", text); 
            // alert("OK");
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.

            var modalForm = $(elementId);
            modalForm[0].appendChild(textarea);
            textarea.select();
            try {
                // return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                ret = document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                ret = false;
            } finally {
                modalForm[0].removeChild(textarea);
            }
        }
        if (ret){
            if (showAlert == true){
                alert("OK");
            }
        } else {
            alert("Sh*t happened!");
        }
    }

    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear();
        var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
        var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
        return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd);
    };
    Date.prototype.yyyymmddhhmm = function () {
        var yyyy = this.getFullYear();
        var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
        var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
        var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
        var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
        return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min);
    };
    Date.prototype.ddmmyyyyhhmm = function () {
        var yyyy = this.getFullYear();
        var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
        var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
        var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
        var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
        return "".concat(dd).concat(".").concat(mm).concat(".").concat(yyyy).concat(" ").concat(hh).concat(":").concat(min);
    };
    Date.prototype.ddmmyyyy = function () {
        var yyyy = this.getFullYear();
        var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
        var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
        return "".concat(dd).concat(".").concat(mm).concat(".").concat(yyyy);
    };
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    $scope.processingMeteo = false;
    $scope.meteoInfoActual = {};
    $scope.RWY = "";
    $scope.lastWindDir = [];
    $scope.lastWindDirAVG = -1;
    var lastWindDirCounter = 99;

    computeWindDirAVG = function(){
        var total = 0;
        $scope.lastWindDir.forEach(function(x){
            total += x;
        });
        return Math.round(total / $scope.lastWindDir.length);
    }

    // $scope.meteoActual = function (stationId, autoReftresh) {
    //     //https://api.weather.com/v2/pws/observations/current?stationId=IMLADB8&format=json&units=m&apiKey=e0c2374024e3494682374024e31946ec
    //     $scope.processingMeteo = true;
    //     $http({
    //         // url: "https://api.weather.com/v2/pws/observations/current?stationId=" + stationId + "&format=json&units=m&apiKey=e0c2374024e3494682374024e31946ec",
    //         url: "https://api.cw-portal.eu/LKMB/mb01/meteoAct?password=4B60C16F&station=" + stationId,
    //         method: 'POST',
    //         contentType: "text/plain; charset=utf-8",
    //         dataType: 'json',
    //         // data: {
    //         //     eai: $scope.usr.eai, usr: $scope.usr.n, token: $scope.usr.t
    //         // },
    //         headers: { 'Content-Type': 'application/json' }
    //     }).success(function (data, status, headers, config) {
    //         $scope.processingMeteo = false;
    //         $scope.meteoInfoActual = data.observations[0];

    //         $scope.meteoInfoActual.obsTimeLocal_hhmm = $scope.meteoInfoActual.obsTimeLocal.substring(0,16);

    //         // $scope.meteoInfoActual.metric.windSpeed_MS = Math.round($scope.meteoInfoActual.metric.windSpeed / 1.944012 * 100) / 100;
    //         // $scope.meteoInfoActual.metric.windGust_MS = Math.round($scope.meteoInfoActual.metric.windGust / 1.944012 * 100) / 100;
    //         $scope.meteoInfoActual.temp = $scope.meteoInfoActual.metric.temp;
    //         $scope.meteoInfoActual.dewpt = $scope.meteoInfoActual.metric.dewpt;
    //         $scope.meteoInfoActual.windSpeed = $scope.meteoInfoActual.metric.windSpeed;
    //         $scope.meteoInfoActual.windSpeed_MS = Math.round($scope.meteoInfoActual.metric.windSpeed / 3.6);
    //         $scope.meteoInfoActual.windGust_MS = Math.round($scope.meteoInfoActual.metric.windGust / 3.6);

    //         $scope.meteoInfoActual.pressure_Round = Math.round($scope.meteoInfoActual.metric.pressure);

    //         if (lastWindDirCounter < 15){
    //             lastWindDirCounter += 1;
    //         } else {
    //             lastWindDirCounter = 0;
    //         }
    //         $scope.lastWindDir[lastWindDirCounter] = $scope.meteoInfoActual.winddir;
    //         $scope.lastWindDirAVG = computeWindDirAVG();
    //         // console.log('$scope.lastWindDirAVG: ' + $scope.lastWindDirAVG);
    //         // console.log($scope.lastWindDir);

    //         if (($scope.meteoInfoActual.windSpeed_MS<1.1)&&($scope.meteoInfoActual.windSpeed_MS<1.1)){
    //             $scope.meteoInfoActual.winddir = 'VRB';
    //             $scope.RWY = '00';
    //         } else {
    //             $scope.RWY = '34';
    //             // 04 – směr větru  008 až 097
    //             // 16 – směr větru  098 až 189
    //             // 22 – směr větru  190 až 278
    //             // 34 – směr větru  279 až 359 a 000 až 007
    //             if (($scope.lastWindDirAVG > 7) && ($scope.lastWindDirAVG < 98)){
    //                 $scope.RWY = '04';
    //             }
    //             if (($scope.lastWindDirAVG > 97) && ($scope.lastWindDirAVG < 190)){
    //                 $scope.RWY = '16';
    //             }
    //             if (($scope.lastWindDirAVG > 189) && ($scope.lastWindDirAVG < 279)){
    //                 $scope.RWY = '22';
    //             }
    //         }

    //     }).error(function (data, status, headers, config) {
    //         $scope.handleERR("meteoActual", data, status);
    //     });

    //     if (autoReftresh == 1){
    //         $timeout(function () { 
    //             $scope.meteoActual('IMLADB8', 1); 
    //         }, 60000);
    //     }
    // }

    $scope.LKMB_getMeteoActual = function (stationId, autoReftresh) {
        var usrName = ($scope.usr.e == '')?'xxx':$scope.usr.e;
        $scope.processingMeteo = true;
        $http({
            url: "JSON/api.asmx/LKMB_getMeteoActual",
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            data: {
                stationId: stationId, usr: usrName, token: $scope.usr.t
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.processingMeteo = false;
            $scope.meteoInfoActual = JSON.parse(data.d)[0];

            $scope.meteoInfoActual.obsTimeLocal_hhmm = $scope.meteoInfoActual.obsTimeLocal;
            $scope.meteoInfoActual.windSpeed_MS = Math.round($scope.meteoInfoActual.windSpeed / 3.6);
            $scope.meteoInfoActual.windGust_MS = Math.round($scope.meteoInfoActual.windGust / 3.6);
            $scope.meteoInfoActual.pressure_Round = Math.round($scope.meteoInfoActual.pressure);

            if (lastWindDirCounter < 40){
                lastWindDirCounter += 1;
            } else {
                lastWindDirCounter = 0;
            }
            $scope.lastWindDir[lastWindDirCounter] = $scope.meteoInfoActual.winddir;
            $scope.lastWindDirAVG = computeWindDirAVG();

            if (($scope.meteoInfoActual.windSpeed_MS<1.1)&&($scope.meteoInfoActual.windSpeed_MS<1.1)){
                $scope.meteoInfoActual.winddir = 'VRB';
                $scope.RWY = '00';
            } else {
                $scope.RWY = '34';
                // 04 – směr větru  008 až 097
                // 16 – směr větru  098 až 189
                // 22 – směr větru  190 až 278
                // 34 – směr větru  279 až 359 a 000 až 007
                if (($scope.lastWindDirAVG > 7) && ($scope.lastWindDirAVG < 98)){
                    $scope.RWY = '04';
                }
                if (($scope.lastWindDirAVG > 97) && ($scope.lastWindDirAVG < 190)){
                    $scope.RWY = '16';
                }
                if (($scope.lastWindDirAVG > 189) && ($scope.lastWindDirAVG < 279)){
                    $scope.RWY = '22';
                }
            }


        }).error(function (data, status, headers, config) {
            $scope.handleERR("LKMB_getMeteoActual", data, status);
        });

        if (autoReftresh == 1){
            $timeout(function () { 
                $scope.LKMB_getMeteoActual('IMLADB8', 1); 
            }, 30000);
        }
    }

    $scope.meteoRecent = function (stationId) {
        if (window.location.href.indexOf('carrierweb.eu') > -1){
            console.log('Skipping meteo ...');
            return;
        }

        $http({
            url: "https://api.cw-portal.eu/LKMB/mb01/meteoRecent?password=4B60C16F&station=" + stationId,
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            lastWindDirCounter = 0;
            var sortedArray = [];
            sortedArray = data.sort(function(a,b){
                // return a.obsTimeUtc > b.obsTimeUtc?1:-1;
                return a.obsTimeLocal > b.obsTimeLocal?-1:1;
            });
            sortedArray.forEach(
                function(observation){
                    if (lastWindDirCounter < 5){
                        lastWindDirCounter += 1;
                        $scope.lastWindDir[lastWindDirCounter] = observation.winddirAvg;
                        console.log('$scope.lastWindDir init time: ' + observation.obsTimeLocal);
                    }
                }
            );

            $scope.lastWindDirAVG = computeWindDirAVG();
            console.log('$scope.lastWindDirAVG: ' + $scope.lastWindDirAVG);
            console.log($scope.lastWindDir);

            // $scope.meteoActual('IMLADB8', 1);
            $scope.LKMB_getMeteoActual('IMLADB8', 1);
        }).error(function (data, status, headers, config) {
            // $scope.meteoActual('IMLADB8', 1);
            $scope.LKMB_getMeteoActual('IMLADB8', 1);
            $scope.handleERR("meteoRecent", data, status);
        });
    }

    $scope.meteoRecent('IMLADB8');

    $scope.testAlert = function (msg) {
        alert(msg);
    };

    $scope.closeModal = function (selector) {
        $(selector).modal('hide');
    };

    $scope.handleERR = function(src, data, status) {
        console.log("ERR: " + src);
        console.log(data);
    }

    $scope.writeToConsole = function(x){
        console.log(x);
    }
    // $scope.testView1 = 0;
    $scope.testView1 = {};
    $scope.testView1.ctrl = 0;
    $scope.testView1.shift = 0;
    $scope.testKey = function (evt) {
        if (evt.keyCode == 17) { //CTRL
            $timeout(function () { $scope.testView1.ctrl = 1});
        }
        if (evt.keyCode == 16) { //SHIFT
            $timeout(function () { $scope.testView1.shift = 1});
        }
        if ($scope.search.email != undefined){
            if (evt.keyCode === 27){
                $scope.search.email = '';
            } else {
                if (evt.keyCode === 8){
                    $scope.search.email = $scope.search.email.substring(0, $scope.search.email.length - 1);
                } else {
                    $scope.search.email += evt.key;
                }
            }
        }
    };

    $scope.filterEmails = function(email) {
        var ret = true;
        try{
            if (($scope.search.email != undefined) && ($scope.search.email != '')){
                ret = false;
                if (email.e.toLowerCase().indexOf($scope.search.email.toLowerCase()) > -1){
                    ret=true;
                } else {
                    if (email.n.toLowerCase().indexOf($scope.search.email.toLowerCase()) > -1){
                        ret=true;
                    }
                }
            }
        } catch(e){
        }        
        return ret;
    }

    $.ajaxSetup({
        headers : {
        'X-Token' : '123' //$scope.sessionToken
        }
    });

    $scope.filterUsers = function(x){
        var ret = ($scope.search.act == x.act);
        if (($scope.search.e == '')&&($scope.search.act == 0)) {
            return ret;
        }
        if (
            (($scope.search.e != '')&&(x.e.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1))&&
            (($scope.search.e != '')&&(x.sn.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1))
        ){
            return false;
        }
        return ret;
    }

    $scope.filterPayments = function(x){
        if ($scope.search.e == '') {
            return true;
        }
        var ret = true;
        if (
                (x.USER_EMAIL.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1)
                &&(x.USER_N.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1)
        ){
            ret = false;
        }
        return ret;
    }

    $scope.updatePaymentsTotalsFiltered = function(){
        if ($scope.search.e == '') {
            $scope.paymentsTotal[0].AMOUNT_F_FILTERED = $scope.paymentsTotal[0].AMOUNT_F;
        } else {
            var totalAMOUNT = 0.0;
            $scope.payments.filter($scope.filterPayments).forEach(function(x){
                totalAMOUNT += x.AMOUNT;
            });
            $scope.paymentsTotal[0].AMOUNT_F_FILTERED = numberWithCommas(totalAMOUNT);
        }

    }

    $scope.filterFlights = function(x){
        // if (x.d == '000000'){
        //     return false;
        // }
        if ($scope.search.e == '') {
            return true;
        }
        var ret = true;
        if (
            (($scope.search.e != '')&&(x.USER_EMAIL.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1))&&
            (($scope.search.e != '')&&(x.POSADKA.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1))&&
            (($scope.search.e != '')&&(x.imatrikulace.toLowerCase().indexOf($scope.search.e.toLowerCase()) == -1))
        ){
            return false;
        }
        return ret;
    }

    function convertMinutesToHHMM(m){
        var mm = m % 60;
        var hh = (m - mm) / 60;
        return hh + ':' + ((mm < 10)?'0':'') + mm;
    }

    $scope.updateFlightsTotalsFiltered = function(){
        if ($scope.search.e == '') {
            $scope.flightsTotal[0].durationHHMM_FILTERED = $scope.flightsTotal[0].durationHHMM;
            $scope.flightsTotal[0].PRICE_F_FILTERED = $scope.flightsTotal[0].PRICE_F;
            $scope.flightsTotal[0].startsNumber_FILTERED = $scope.flightsTotal[0].startsNumber;
        } else {
            var totalDuration = 0;
            var totalPRICE = 0.0;
            var totalStartsNumber = 0;
            $scope.flights.filter($scope.filterFlights).forEach(function(x){
                totalDuration += x.duration;
                totalPRICE += x.PRICE;
                totalStartsNumber += x.startsNumber;
            });
            $scope.flightsTotal[0].durationHHMM_FILTERED = convertMinutesToHHMM(totalDuration);
            $scope.flightsTotal[0].PRICE_F_FILTERED = numberWithCommas(totalPRICE);
            $scope.flightsTotal[0].startsNumber_FILTERED = totalStartsNumber;
        }
        $scope.flightsTotal[0].durationHH_FILTERED = $scope.flightsTotal[0].durationHHMM_FILTERED.split(':')[0];
        $scope.flightsTotal[0].durationMM_FILTERED = $scope.flightsTotal[0].durationHHMM_FILTERED.split(':')[1];
    }

    $scope.dialogAction = { "kod": 0 };
    $scope.dialogHeader = "";
    $scope.dialogQuestion = "";
    $scope.akcePodleDialogu = function (akce) {
        switch (akce.kod) {
            case 1: //delete flight?
                $scope.LKMB_flight_delete($scope.selectedRecord);
                break;
            case 2: //delete reservation?
                $scope.LKMB_reservation_delete($scope.selectedRecord);
                break;
            default: 
                break;
        }
        $scope.closeModal_Over_Modal('#divDialogYesNo');
    }   
    $scope.showCustomAlert = function (msg) {
        $scope.dialogHeader = "";
        $scope.dialogQuestion = msg;
        $scope.$apply();
        $('#divDialogYesNo').modal('show');
    }

    $scope.closeModal_Over_Modal = function (selector) {
        $(selector).modal('hide');
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    $scope.logValue = function(val){
        console.log(val);
        // console.log(val.ddmmyyyy());
    }

    // $scope.$on('$viewContentLoaded', function(){ 
    //     //Here your view content is fully loaded !!   
    //     $scope.viewMode = 0;
    // });

    var weekpicker, start_date, end_date;

    function set_week_picker(date) {
        start_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
        end_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
        weekpicker.datepicker('update', start_date);
        weekpicker.val((start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' + start_date.getFullYear() + ' - ' + (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' + end_date.getFullYear());
    }
    $(document).ready(function() {
        weekpicker = $('.week-picker');
        console.log(weekpicker);
        weekpicker.datepicker({
            autoclose: true,
            forceParse: false,
            container: '#week-picker-wrapper',
        }).on("changeDate", function(e) {
            set_week_picker(e.date);
        });
        $('.week-prev').on('click', function() {
            var prev = new Date(start_date.getTime());
            prev.setDate(prev.getDate() - 1);
            set_week_picker(prev);
        });
        $('.week-next').on('click', function() {
            var next = new Date(end_date.getTime());
            next.setDate(next.getDate() + 1);
            set_week_picker(next);
        });
        set_week_picker(new Date);
    });
    


}]); //ctrl


