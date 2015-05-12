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
            jsonModel = jsonGrid.getBehavior()
            var cellProvider = jsonModel.getCellProvider();

            jsonModel.setData(ticker.stocks);
            jsonModel.setFixedColumnCount(1);
            jsonModel.setHeaders(['Symbol','High','Low','Last','Today', 'Change','% Change','Volume','Bid Qty','Bid','Spread','Ask','Ask Qty','Country','ICB','Industry','Super Sector','Sector','Sub Sector','Date','Time','Open','Cls','Previous Cls','Previous Cls Dt','Name']);
            jsonModel.setFields(['TICKER','High','Low','Last','Today', 'Change','PercentChange','Volume','BidQuantity','Bid','Spread','Ask','AskQuantity','COUNTRY','ICB','INDUS','SUP_SEC','SEC','SUB_SEC','Date','Time','Open','Close','PreviousClose','PreviousCloseDate','NAME']);
            
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

                        width: 350,
                        height: 450,
                        maxHeight: 450,
                        maxWidth: 350,
                        frame: false,
                        maximizable: false
                    })

            };

            jsonModel.highlightCellOnHover= function(isColumnHovered, isRowHovered) {
                return isRowHovered;
            };
            var flashMap = {
              red: function(v) {
                var c = (128 + Math.floor((20-v)/20*128)).toString(16);
                if (c.length === 1) {
                  c = '0'+ c;
                }
                return '#' + c + '0000';
              },
              green: function(v) {
                var c = (128 + Math.floor((20-v)/20*128)).toString(16);
                if (c.length === 1) {
                  c = '0'+ c;
                }
                return '#00' + c + '00';
              }
            };
            cellProvider.getCell = function(config) {
                var renderer = cellProvider.cellCache.simpleCellRenderer;
                config.halign = 'right';
                var x = config.x;
                var y = config.y;
                var row = jsonModel.getRow(y) || {
                  flash: 0,
                  flashColor: 'green'
                };
                if (x === 4) {
                    renderer = cellProvider.cellCache.sparklineCellRenderer;
                } else if (x === 5 || x === 6) {
                    config.value = format(config.value);
                    if (config.value.indexOf('-') === 0) {
                      config.value = '(' + config.value.substring(1) + ')';
                      config.fgColor = 'red';
                    } else {
                      config.fgColor = 'green';
                    }
                } else if (x === 3) {
                  config.value = format(config.value);
                  if (row.flash > 0) {
                    config.bgColor = flashMap[row.flashColor](row.flash);
                    config.fgColor = 'white';
                    row.flash = row.flash - 1;
                  }
                } else {
                  config.value = format(config.value);
                }


                // if (row.flash > 15) {
                //   config.bgColor = 'yellow';
                // }

                renderer.config = config;
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
                  12,
                  20
               ],
               "fixedColumnIndexes":[  

               ],
               "hiddenColumns":[  
                  25,
                  24,
                  23,
                  22,
                  13,
                  15,
                  14,
                  17,
                  16,
                  18,
                  21,
                  19
               ],
               "columnWidths":[  
                  null,
                  74.64453125,
                  74.64453125,
                  74.64453125,
                  80,
                  65.173828125,
                  65.306640625,
                  67.5478515625,
                  49.4189453125,
                  74.64453125,
                  46.890625,
                  74.64453125,
                  50.7578125,
                  101.3935546875,
                  38.38671875,
                  126.8603515625,
                  175.521484375,
                  236.408203125,
                  193.7392578125,
                  266.775390625,
                  86.9970703125,
                  49.4189453125,
                  25.3046875,
                  73.591796875,
                  269.416015625,
                  228.65771484375
               ],
               "fixedColumnWidths":[  
                  48.630859375
               ],
               "rowHeights":{  

               },
               "fixedRowHeights":{  

               },
               "sorted":[  

               ]
            };
            jsonModel.setState(state);
        });
            
    },
    openBidOffer: ()=>{
        require('./child-window.js').createChildWindow({
                        name: 'trade-' + displayData.NAME,
                        url: 'trade.html?row=' + location.search.split('=')[1],
                        autoShow: true,
                        width: 400,
                        height: 400,
                        maxHeight: 400,
                        maxWidth: 400,
                        frame: false
                    });
    },
    openOrders: ()=>{

    },
    render: ()=>{
        return <div className="grid-contain">
        <fin-hypergrid id="stock-example"><fin-hypergrid-behavior-json></fin-hypergrid-behavior-json></fin-hypergrid>
        <div className="actions">
            <i onClick={this.openBidOffer} className="fa fa-diamond"></i>
            <i onClick={this.openOrders} className="fa fa-bars"></i>
        </div>
        </div>
    }
});
// <fin-hypergrid id="q-example"></fin-hypergrid>

module.exports = HyperGrid;

