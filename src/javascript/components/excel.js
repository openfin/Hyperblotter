/**
 * Created by haseebriaz on 14/05/15.
 */
fin.desktop.main(function(e) {
    fin.desktop.System.launchExternalProcess('excel', '', function(e) {
        var mainWindow = fin.desktop.Window.getCurrent();
        mainWindow.addEventListener('close-requested', function() {
            fin.desktop.System.terminateExternalProcess(e.uuid, 4000,
                function (info) {
                        console.log("Termination result " + info.result);
                }, function (reason) {
                        console.log("failure: " + reason);
                });
            mainWindow.close(true);
        });
    }, function(e) {
        console.log('external process excel launch failed');
    });

    fin.desktop.Excel.init();
    setTimeout(function(){
        fin.desktop.Excel.getWorkbooks(function(workbooks){
            var book, sheet;
            var c = 1;
            while (!book) {
                book = fin.desktop.Excel.getWorkbookByName('Book' + c++);
                if (c > 10) {
                    break;
                }
            }
            fin.desktop.Excel.book = book;
            book.getWorksheets(function(ws) {
                c = 1;
                while (!sheet) {
                    sheet = book.getWorksheetByName('Sheet' + c++);
                    if (c > 10) {
                        break;
                    }
                }
                sheet.activate();
                fin.desktop.Excel.sheet = sheet;
            });
        });
       
    }, 3000);

});
    // workbooksSelect = document.getElementById("workbooks");
    // workbooksSelect.onchange = function(event){

    //     var workbook = currentWorkbook = fin.desktop.Excel.getWorkbookByName(event.target.value);

    //     workbook.getWorksheets(function(sheets){

    //         for(var i = 0; i < sheets.length; i++) {

    //             worksheetsSelect.options[worksheetsSelect.options.length] = new Option(sheets[i].name, sheets[i].name);
    //         }
    //     });

    // };

    // worksheetsSelect = document.getElementById("sheets");
    // worksheetsSelect.onchange = function(event){

    //     currentWorkbook.getWorksheetByName(event.target.value).activate();
    // };

    // fin.desktop.Excel.init();
    // fin.desktop.Excel.getWorkbooks(function(workbooks){

    //     console.log(workbooks);

    //     for(var i = 0; i < workbooks.length; i++){

    //         workbooksSelect.options[workbooksSelect.options.length] = new Option(workbooks[i].name, workbooks[i].name);
    //     }

    //     currentWorkbook = workbooks[0];

    // });


// function addSheet(){

//     currentWorkbook.addWorksheet(document.getElementById("sheetName").value, function(value){

//         console.log(value);
//     });
// };
