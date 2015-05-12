var React = require('react'),
		ticker = require('../components/ticker.js'),
        ticker = require('numeral'),
        _ = require('underscore');

var HyperGrid = React.createClass({
    componentDidMount: function(){

        window.addEventListener('polymer-ready',function(){
            var jsonGrid = document.querySelector('#stock-example')
            var jsonModel = jsonGrid.getBehavior()
            var cellProvider = jsonModel.getCellProvider();

            jsonModel.setData(ticker.stocks);
            jsonModel.setFixedColumnCount(1);
            jsonModel.setFields(['TICKER','High','Low','Last','Change','PercentChange','Volume','Bid','Ask','Spread','BidQuantity','AskQuantity','COUNTRY','ICB','INDUS','SUP_SEC','SEC','SUB_SEC','Date','Time','Open','Close','PreviousClose','PreviousCloseDate','NAME']);
            
            var lnfOverrides = {
                backgroundColor: '#2d2d2d',
                topLeftBackgroundColor: '#2d2d2d',
                fixedColumnBackgroundColor: '#2d2d2d',
                fixedRowBackgroundColor: '#2d2d2d',
                color: 'lightgrey',
                topLeftColor: 'lightgrey',
                fixedColumnColor: 'lightgrey',
                fixedRowColor: 'lightgrey',
                lineColor: 'lightgrey',
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

/*

Ask: 13.155027193983155AskQuantity: 1100Bid: 13.14517905506539BidQuantity: 300COUNTRY: "United States"Change: -0.19082777142769913Close: 0Date: Mon May 11 2015 23:10:20 GMT-0400 (Eastern Daylight Time)High: 27.485ICB: "2727"INDUS: "Industrials"Last: 13.14517905506539Low: 13.14517905506539NAME: "General Electric Co."Open: 27.21PercentChange: -1.4309213688208668PreviousClose: 27.04PreviousCloseDate: Sun May 10 2015 23:10:20 GMT-0400 (Eastern Daylight Time)SEC: "General Industrials"SUB_SEC: "Diversified Industrials"SUP_SEC: "Industrial Goods & Services"Spread: 0.009848138917766392TICKER: "GE"Time: 1431400220319Volume: 1869883


                 */
            };

            jsonModel.highlightCellOnHover= function(isColumnHovered, isRowHovered) {
                return isRowHovered;
            };

            cellProvider.getCell = function(config) {
                var renderer = cellProvider.cellCache.simpleCellRenderer;
                config.halign = 'left';
                var x = config.x;
                var y = config.y;

                if ((y % 3) === 0 && x < 7){
                    config.bgColor = '#00ff00';
                    config.font = 'italic 15px Arial';
                } else if (((y - 1) % 3) === 0 && x < 7){
                    config.bgColor = '#0000ff';
                    config.fgColor = '#ffffff';
                }
                if (x === 1) {
                    renderer = cellProvider.cellCache.linkCellRenderer;
                } else if (x === 2) {
                    config.halign = 'center';
                } else if (x === 3) {
                    config.halign = 'center';
                } else if (x === 6) {
                    config.halign = 'center';
                } else if (x === 7) {
                    var travel = 60 + Math.round(config.value*150/100000);
                    var bcolor = travel.toString(16);
                    config.halign = 'right';
                    config.bgColor = '#00' + bcolor + '00';
                    config.fgColor = '#FFFFFF';
                    config.value = accounting.formatMoney(config.value);
                } else if (x === 8) {
                    var travel = 105 + Math.round(config.value*150/1000);
                    var bcolor = travel.toString(16);
                    config.halign = 'right';
                    config.bgColor = '#' + bcolor+ '0000';
                    config.fgColor = '#FFFFFF';
                    config.value = accounting.formatMoney(config.value, "€", 2, ".", ",");
                }

                renderer.config = config;
                return renderer;
            };

        });
            
    },
    render: function() {
        return <fin-hypergrid id="stock-example"><fin-hypergrid-behavior-json></fin-hypergrid-behavior-json></fin-hypergrid>
    }
});
// <fin-hypergrid id="q-example"></fin-hypergrid>

module.exports = HyperGrid;

