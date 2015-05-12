var React = require('react'),
		ticker = require('../components/ticker.js'),
        _ = require('underscore');

var HyperGrid = React.createClass({
    componentDidMount: function(){

        window.addEventListener('polymer-ready',function(){
            var jsonGrid = document.querySelector('#stock-example')
            jsonModel = jsonGrid.getBehavior()
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
                        width: 350,
                        height: 450,
                        maxHeight: 450,
                        maxWidth: 350,
                        frame: false,
                        maximizable: false
                    });
            };

            jsonModel.highlightCellOnHover= function(isColumnHovered, isRowHovered) {
                return isRowHovered;
            };

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

