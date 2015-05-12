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