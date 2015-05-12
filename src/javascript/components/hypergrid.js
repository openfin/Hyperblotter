var React = require('react'),
		ticker = require('../components/ticker.js'),
        numeral = require('numeral'),
        moment = require('moment'),
        _ = require('underscore');

var typeAlignmentMap = {
    j: 'right',
    s: 'left',
    t: 'center',
    f: 'right',
    d: 'center'
};

var isInt = function(n){
        return Number(n)===n && n%1===0;
};

var isFloat = function(n){
        return   n===Number(n)  && n%1!==0
};

var format = function(data) {
    if (isInt(data)) {
        if (data > 1431446226436) { // this is a time
            return moment(data).format('HH:mm:ss.SSS');
        } else {
            return numeral(data).format('0,0');
        }
    } else if (isFloat(data)) {
        return numeral(data).format('0,0.00');
    } else {
        return data;
    }
};

var HyperGrid = React.createClass({
    componentDidMount: function(){

        window.addEventListener('polymer-ready',function(){
            var jsonGrid = document.querySelector('#stock-example')
            var jsonModel = jsonGrid.getBehavior()
            var cellProvider = jsonModel.getCellProvider();

            jsonModel.setData(ticker.stocks);
            jsonModel.setFixedColumnCount(1);
            jsonModel.setHeaders(['Symbol','High','Low','Last','Change','% Change','Volume','Bid','Ask','Spread','Bid Quantity','Ask Quantity','Country','ICB','Industry','Super Sector','Sector','Sub Sector','Date','Time','Open','Cls','Previous Cls','Previous Cls Dt','Name']);
            jsonModel.setFields(['TICKER','High','Low','Last','Change','PercentChange','Volume','Bid','Ask','Spread','BidQuantity','AskQuantity','COUNTRY','ICB','INDUS','SUP_SEC','SEC','SUB_SEC','Date','Time','Open','Close','PreviousClose','PreviousCloseDate','NAME']);
            
            var lnfOverrides = {
                // backgroundColor: '#2d2d2d',
                // topLeftBackgroundColor: '#2d2d2d',
                // fixedColumnBackgroundColor: '#2d2d2d',
                // fixedRowBackgroundColor: '#2d2d2d',
                // color: 'lightgrey',
                // topLeftColor: 'lightgrey',
                // fixedColumnColor: 'lightgrey',
                // fixedRowColor: 'lightgrey',
                // lineColor: 'lightgrey',
            };


            //to apply to a specific table
            jsonGrid.addProperties(lnfOverrides);
            setInterval(function() {
                ticker.randomize();
                jsonModel.dataModified();
            }, 100);

            jsonModel.fixedColumnClicked = (grid, cellData) => {
                    console.log(jsonModel.getRow(cellData.gridCell.y));
                    var row = jsonModel.getRow(cellData.gridCell.y)

                    require('./child-window.js').createChildWindow({
                        name: row.NAME,
                        url: 'row-view.html?row=' + cellData.gridCell.y,
                        autoShow: true,
                        width: 400,
                        height: 400,
                        maxHeight: 400,
                        maxWidth: 400,
                        frame: false
                    })

            };

            jsonModel.highlightCellOnHover= function(isColumnHovered, isRowHovered) {
                return isRowHovered;
            };

            cellProvider.getCell = function(config) {
                var renderer = cellProvider.cellCache.simpleCellRenderer;
                config.halign = 'right';
                var x = config.x;
                var y = config.y;
                renderer.config = config;
                config.value = format(config.value);
                return renderer;
            };

            var state = {  
               "columnIndexes":[  
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  19
               ],
               "fixedColumnIndexes":[  

               ],
               "hiddenColumns":[  
                  24,
                  23,
                  22,
                  17,
                  12,
                  14,
                  13,
                  15,
                  16,
                  21,
                  20,
                  18
               ],
               "columnWidths":[  
                  null,
                  66,
                  64,
                  55,
                  55,
                  65.306640625,
                  80,
                  58,
                  64,
                  69,
                  75.115234375,
                  77.1953125,
                  101.3935546875,
                  38.38671875,
                  126.8603515625,
                  175.521484375,
                  null,
                  null,
                  null,
                  null
               ],
               "fixedColumnWidths":[  
                  71
               ],
               "rowHeights":{  

               },
               "fixedRowHeights":{  

               },
               "sorted":[  
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
               ]
            };
            jsonModel.setState(state);
        });
            
    },
    render: function() {
        return <fin-hypergrid id="stock-example"><fin-hypergrid-behavior-json></fin-hypergrid-behavior-json></fin-hypergrid>
    }
});
// <fin-hypergrid id="q-example"></fin-hypergrid>

module.exports = HyperGrid;

