var React = require('react'),
		ticker = require('../components/ticker.js'),
        _ = require('underscore');

var HyperGrid = React.createClass({
	componentDidMount: function(){

        window.addEventListener('polymer-ready',function(){
            var jsonGrid = document.querySelector('#stock-example')
            jsonModel = jsonGrid.getBehavior()
            
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

            jsonModel.fixedColumnClicked = (grid, cellData)=>{
                console.log(jsonModel.getRow( cellData.gridCell.y));
                var row = jsonModel.getRow( cellData.gridCell.y)
                
                require('./child-window.js').createChildWindow({
            name: row.NAME,
            url: 'row-view.html',
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
        });
            
    },
  render: function() {
    return <fin-hypergrid id="stock-example"><fin-hypergrid-behavior-json></fin-hypergrid-behavior-json></fin-hypergrid>
  }
});
// <fin-hypergrid id="q-example"></fin-hypergrid>

module.exports = HyperGrid;