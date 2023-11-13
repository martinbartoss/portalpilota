function fileReader ($q, $log) {
 
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };

        var readAsText = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsText(file);

            return deferred.promise;
        };

        var readAsArrayBuffer = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);

            reader.readAsArrayBuffer(file);

            return deferred.promise;
        };

        var readAsByteArray = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsByteArray(file);

            return deferred.promise;
        };

        var readAsBase64 = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;

        };

        var parseXlsToJSON = function (data, scope) {
            var deferred = $q.defer();

            //var reader = getReader(deferred, scope);
            //var data = reader.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);
            })

            json_object;
            return deferred.promise;
        };

        var byteArrayToBase64 = function (byteArr) {
            var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var encOut = "";
            var bits;
            var i = 0;

            while (byteArr.length >= i + 3) {
                bits = (byteArr[i++] & 0xff) << 16 | (byteArr[i++] & 0xff) << 8 | byteArr[i++] & 0xff;
                encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
            }
            if (byteArr.length - i > 0 && byteArr.length - i < 3) {
                var dual = Boolean(byteArr.length - i - 1);
                bits = ((byteArr[i++] & 0xff) << 16) | (dual ? (byteArr[i] & 0xff) << 8 : 0);
                encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + (dual ? base64s.charAt((bits & 0x00000fc0) >> 6) : '=') + '=';
            }

            return encOut;
        };

        var base64ToByteArray = function (encStr) {
            var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var decOut = new air.ByteArray();
            var bits;

            for (var i = 0, j = 0; i < encStr.length; i += 4, j += 3) {
                bits = (base64s.indexOf(encStr.charAt(i)) & 0xff) << 18 | (base64s.indexOf(encStr.charAt(i + 1)) & 0xff) << 12 | (base64s.indexOf(encStr.charAt(i + 2)) & 0xff) << 6 | base64s.indexOf(encStr.charAt(i + 3)) & 0xff;
                decOut[j + 0] = ((bits & 0xff0000) >> 16);
                if (i + 4 != encStr.length || encStr.charCodeAt(encStr.length - 2) != 61) {
                    decOut[j + 1] = ((bits & 0xff00) >> 8);
                }
                if (i + 4 != encStr.length || encStr.charCodeAt(encStr.length - 1) != 61) {
                    decOut[j + 2] = (bits & 0xff);
                }
            }

            return decOut;
        };

        return {
            parseXlsToJSON: parseXlsToJSON,
            readAsDataUrl: readAsDataURL,
            readAsBase64: readAsBase64,
            readAsByteArray: readAsByteArray,
            readAsText: readAsText,
            readAsArrayBuffer: readAsArrayBuffer,
            byteArrayToBase64: byteArrayToBase64
        };
    };
 