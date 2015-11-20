/**
 * Created by haseebriaz on 14/05/15.
 */

var __extends = function(d, b) {

    function Construct() {
        this.constructor = d;
    }
    Construct.prototype = b.prototype;
    d.prototype = new Construct();
};

fin.desktop.Excel = (function(){


    var messageId = 1;
    var callbacks = {};
    var workbooks = {};
    var worksheets = {};


    // EventDispatcher

     var EventDispatcher = (function(){


         function EventDispatcher(){

             this._callbacks = {};
         }

         EventDispatcher.prototype._callbacks = null;

         EventDispatcher.prototype.addEventListener = function(type, callback){

            if(this.hasEventListener(type, callback)){

                return;
            }

             if(!this._callbacks[type]) this._callbacks[type] = [];
             this._callbacks[type].push(callback);
         };

         EventDispatcher.prototype.removeEventListener = function(type, callback){

             if(!this.hasEventListener(type, callback)){

                 return;
             }

             var callbacks = this._callbacks[type];
             callbacks.splice(callbacks.indexOf(callback), 1);
         };

         EventDispatcher.prototype.hasEventListener = function(type, callback){

            if(!this._callbacks[type]) return false;
            if(!callback) return true;
            return (this._callbacks[type].indexOf(callback) >= 0)
         };

         EventDispatcher.prototype.dispatchEvent = function(event){

             if(!this._callbacks[event.type]) {

                 return;
             }

             var callbacks = this._callbacks[event.type];
             event.target = this;

             for(var i = 0; i < callbacks.length; i++){

                 callbacks[i](event);
             }
         };

         return EventDispatcher;
     })();
    // EventDispatcher


    /// workbook

    var ExcelWorkbook = (function(_super){

        function ExcelWorkbook(name){

            _super.apply(this);
            this.name = name;
        };

        __extends(ExcelWorkbook, _super);

        ExcelWorkbook.prototype.name = "";

        ExcelWorkbook.prototype.getWorksheets = function(callback){

            callbacks[messageId] = [callback, this];
            var obj = {"messageId": messageId++, action: "getWorksheets", workbook: this.name};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorkbook.prototype.getWorksheetByName = function(name){

            if(worksheets[this.name]) return worksheets[this.name][name]? worksheets[this.name][name]: null;
            return null;
        };

        ExcelWorkbook.prototype.addWorksheet = function(callback){

            callbacks[messageId] = callback;

            if(worksheets[this.name] && worksheets[this.name][name]){

                callback(worksheets[this.name][name]);
                return;
            }

            var obj = {"messageId": messageId++, action:"addSheet",workbook: this.name, worksheet: name};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);

        };

        ExcelWorkbook.prototype.activate = function(){

            var obj = {"messageId": messageId++, action: "activateWorkbook", workbook: this.name};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        return ExcelWorkbook;
    })(EventDispatcher);

    //// workbook


    //// worksheet

    var ExcelWorksheet = (function(_super){

        function ExcelWorksheet(name, workbook){

            _super.apply(this);
            this.name = name;
            this.workbook = workbook;
        };

        __extends(ExcelWorksheet, _super);

        ExcelWorksheet.prototype.name = "";
        ExcelWorksheet.prototype.workbook = null;

        //offset = "A1.. etc"
        ExcelWorksheet.prototype.setCells = function(values, offset){

            if(!offset) offset = "A1";
            var obj = {"messageId": messageId++, action: "setCells", workbook: this.workbook.name, worksheet: this.name, offset: offset, values: values};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorksheet.prototype.getCells = function(start, offsetWidth, offsetHeight, callback){

            callbacks[messageId] = callback;
            var obj = {"messageId": messageId++, action: "getCells", workbook: this.workbook.name, worksheet: this.name, start: start,  offsetWidth: offsetWidth, offsetHeight: offsetHeight};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorksheet.prototype.getRow = function(start, width, callback){

            callbacks[messageId] = callback;
            var obj = {"messageId": messageId++, action: "getCellsRow", workbook: this.workbook.name, worksheet: this.name, start: start,  offsetWidth: width};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorksheet.prototype.getColumn = function(start, height, callback){

            callbacks[messageId] = callback;
            var obj = {"messageId": messageId++, action: "getCellsColumn", workbook: this.workbook.name, worksheet: this.name, start: start,  offsetHeight: height};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorksheet.prototype.activate = function(){

            var obj = {"messageId": messageId++, action: "activateSheet", workbook: this.workbook.name, worksheet: this.name};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        ExcelWorksheet.prototype.activateCell = function(cellAddress){

            var obj = {"messageId": messageId++, action: "activateCell", workbook: this.workbook.name, worksheet: this.name, address: cellAddress};
            fin.desktop.InterApplicationBus.publish("excelCall", obj);
        };

        return ExcelWorksheet;
    })(EventDispatcher);
    //// worksheet

    function Excel(){

        EventDispatcher.apply(this);
    };

    __extends(Excel, EventDispatcher);

    Excel.prototype.init = function(){

        fin.desktop.InterApplicationBus.subscribe("*", "excelEvent", function(data) {

            console.log("excelEvent", JSON.stringify(data));

            switch(data.event){

                case "connected":
                    fin.desktop.Excel.dispatchEvent({type: data.event});
                    break;

                case "sheetChanged":
                    var sheets = worksheets[data.workbookName];
                    if(sheets[data.sheetName]){
                        sheets[data.sheetName].dispatchEvent({type:data.event, data: data});
                    }
                    break;

                case "selectionChanged":
                    var sheets = worksheets[data.workbookName];
                    if(sheets[data.sheetName]){
                        sheets[data.sheetName].dispatchEvent({type:data.event, data: data});
                    }
                    break;

                case "sheetActivated":
                    var sheets = worksheets[data.workbookName];

                    if(sheets[data.sheetName]){

                        sheets[data.sheetName].dispatchEvent({type:data.event});
                    }
                    break;

                case "sheetDeactivated":
                    var sheets = worksheets[data.workbookName];
                    if(sheets[data.sheetName]){
                        sheets[data.sheetName].dispatchEvent({type:data.event});
                    }
                    break;

                case "sheetAdded":

                    var workbook = fin.desktop.Excel.getWorkbookByName(data.workbookName);
                    if(!worksheets[data.workbookName]) worksheets[data.workbookName] = {};
                    var sheets = worksheets[data.workbookName];
                    var sheet = sheets[data.sheetName]? sheets[data.sheetName]: sheets[data.sheetName] = new ExcelWorksheet(data.sheetName, workbook);
                    workbook.dispatchEvent({type: data.event, worksheet: sheet});
                    break;

                case "sheetRemoved":

                    var workbook = fin.desktop.Excel.getWorkbookByName(data.workbookName);
                    var sheet = worksheets[data.workbookName][data.sheetName];
                    delete worksheets[data.workbookName][data.sheetName];
                    workbook.dispatchEvent({type: data.event, worksheet: sheet});
                    break;

                case "workbookAdded":

                    var workbook = new ExcelWorkbook(data.workbookName);
                    workbooks[data.workbookName] = workbook;
                    fin.desktop.Excel.dispatchEvent({type: data.event, workbook: workbook});
                    break;

                case "workbookDeactivated":
                case "workbookActivated":

                    var workbook = fin.desktop.Excel.getWorkbookByName(data.workbookName);
                    if(workbook)workbook.dispatchEvent({type: data.event});
                    break;

                case "workbookClosed":

                    var workbook = fin.desktop.Excel.getWorkbookByName(data.workbookName);
                    delete workbooks[data.workbookName];
                    delete worksheets[data.workbookName];
                    workbook.dispatchEvent({type: data.event});
                    fin.desktop.Excel.dispatchEvent({type: data.event, workbook: workbook});
                    break;
            }

        });

        fin.desktop.InterApplicationBus.subscribe("*", "excelResult", function(data) {

            console.log(JSON.stringify(data));

            switch(data.action){

                case "getWorkbooks":

                    var workbookNames = data.data;
                    var _workbooks = [];

                    for(var i = 0; i < workbookNames.length; i++){

                        var name = workbookNames[i];

                        if(!workbooks[name]) {

                            workbooks[name] = new ExcelWorkbook(name);
                        }

                        _workbooks.push(workbooks[name]);
                    }

                    if(callbacks[data.messageId]){

                        callbacks[data.messageId](_workbooks);
                        delete callbacks[messageId];
                    }


                    break;

                case "getWorksheets":

                    var worksheetNames = data.data;
                    var _worksheets = [];
                    var worksheet = null;

                    for(var i = 0; i < worksheetNames.length; i++){

                        if(!worksheets[data.workbook]) {

                            worksheets[data.workbook] = {};
                        }

                         worksheet = worksheets[data.workbook][worksheetNames[i]]? worksheets[data.workbook][worksheetNames[i]] : worksheets[data.workbook][worksheetNames[i]] = new ExcelWorksheet(worksheetNames[i], workbooks[data.workbook]);
                        _worksheets.push(worksheet);
                    }

                    if(callbacks[data.messageId]){

                        callbacks[data.messageId][0](_worksheets);
                        delete callbacks[messageId];
                    }

                    break;

                case "getCells":
                case "getCellsColumn":
                case "getCellsRow":

                    if(callbacks[data.messageId]) callbacks[data.messageId](data.data);
                    break;


                case "addSheet":

                    if(!worksheets[data.workbookName]) worksheets[data.workbookName] = {};
                    var sheets = worksheets[data.workbookName][data.sheetName];
                    var worksheet = sheets[data.sheetName]? sheets[data.sheetName] : sheets[data.sheetName] = new ExcelWorksheet(data.sheetName, workbooks[data.workbookName]);

                    if(callbacks[data.messageId]) {

                        callbacks[data.messageId](worksheet);
                        delete callbacks[messageId];
                    }

                    break;

                case "getStatus":
                    if(callbacks[data.messageId]) callbacks[data.messageId](data.status);
                    break;

            }

        });

        fin.desktop.InterApplicationBus.subscribe("*", "excelCustomFunction", function(data) {

            if(!window[data.functionName]){

                console.error("function ", data.functionName, "is not defined.");
                return;
            }

            var args = data.arguments.split(",");
            for(var i = 0; i < args.length; i++){

                var num = Number(args[i]);
                if(!isNaN(num))args[i] = num;
            }

            window[data.functionName].apply(null, args);
        });
    };


    Excel.prototype.getWorkbooks = function(callback){

        callbacks[messageId] = callback;

        var obj = {"messageId": messageId++, action: "getWorkbooks"};
        fin.desktop.InterApplicationBus.publish("excelCall",obj);
    };


    // this currently will only work after Excel.getWorkbooks has been used once.
    Excel.prototype.getWorkbookByName = function(name){

        return workbooks[name];
    };

    Excel.prototype.addWorkbook = function(){

        var obj = {"messageId": messageId++, action: "addWorkbook"};
        fin.desktop.InterApplicationBus.publish("excelCall",obj);

    };

    Excel.prototype.getConnectionStatus = function(callback){

        callbacks[messageId] = callback;

        var obj = {"messageId": messageId++, action: "getStatus"};
        fin.desktop.InterApplicationBus.publish("excelCall",obj);
    };


    return new Excel();
})();

