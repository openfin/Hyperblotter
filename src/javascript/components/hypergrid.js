var React = require('react'),
		ticker = require('../components/ticker.js'),
        numeral = require('numeral'),
        moment = require('moment'),
        _ = require('underscore');

var countries = ['GR','DK','ZA','RU','CO','IT','IN','BR','AE','AF','AG','AI','AM','AO','AS','AR','AT','AU','AX','BA','BB','BD','BE','BF','BH','BI','BJ','BM','BN','BS','BT','BV','BY','CA','CC','CD','CG','CH','CK','CL','CM','CN','CO','CR','CU','CV','CX','CY','CZ','DE','DM','DO','DZ','EE','EH','ES','FI','FJ','FK','FM','FR','GB','GE','GI','GL','GM','GN','GP','GQ','GS','GT','GU','GW','GY','HK','HM','HN','HR','HU','ID','IE','IL','IO','IQ','IR','JO','JP','KE','KG','KH','KM','KY','KZ','LC','LI','LK','LR','LS','LT','LU','LV','LY','MD','MH','MK','MM','MO','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PH','PK','PL','PM','PN','PR','PS','PW','PY','QA','RE','RO','RS','SA','SB','SD','SE','SG','SH','SJ','SM','SN','SO','SR','ST','SV','TC','TD','TH','TJ','TK','TL','TN','TO','TR','TT','TV','TW','UM','UY','UZ','VA','VE','VI','VN','WS','ZA','ZW','KR'];
var imageCache = {};

(function() {
    var each, img;
    for (var i = 0; i < countries.length; i++) {
        each = countries[i];
        img = new Image();
        img.src = 'images/famfamfam_flag_icons/png/' + each.toLowerCase() + '.png';
        imageCache[each] = img;
    }
})();

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
            jsonModel.setHeaders(['Symbol','High','Low','Last','Today', 'Change','% Change','Volume','Bid Qty','Bid','Spread','Ask','Ask Qty','Country Code','Country','ICB','Industry','Super Sector','Sector','Sub Sector','Date','Time','Open','Cls','Previous Cls','Previous Cls Dt','Name']);
            jsonModel.setFields(['TICKER','High','Low','Last','Today', 'Change','PercentChange','Volume','BidQuantity','Bid','Spread','Ask','AskQuantity','countryCode', 'COUNTRY','ICB','INDUS','SUP_SEC','SEC','SUB_SEC','Date','Time','Open','Close','PreviousClose','PreviousCloseDate','NAME']);
            
            var lnfOverrides = {
                font: '12px Avenir',
                topLeftFont: '12px Avenir',
                fixedRowFont: '12px Avenir',
                fixedColumnFont: '12px Avenir',
                backgroundColor2: '#0d0d0d',
                backgroundColor: '#0d0d0d',
                topLeftBackgroundColor: '#2d2d2d',
                fixedColumnBackgroundColor: '#2d2d2d',
                fixedRowBackgroundColor: '#2d2d2d',
                color: 'white',
                topLeftColor: 'white',
                fixedColumnColor: 'white',
                fixedRowColor: 'white',
                lineColor: 'pink',
                gridLinesV: false,
                gridLinesH: false
            };


            //to apply to a specific table
            jsonGrid.addProperties(lnfOverrides);
            setInterval(function() {
                ticker.randomize();
                jsonModel.dataModified();
            }, 10);

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
                var val = 128 + Math.floor((40-v)/40*128);
                var c = 'ff';//val.toString(16);
                var c1 = Math.floor(val*192/255).toString(16);
                var c2 = Math.floor(val*203/255).toString(16);
                if (c.length === 1) {
                  c = '0'+ c;
                }
                if (c1.length === 1) {
                  c1 = '0'+ c1;
                }
                if (c2.length === 1) {
                  c2 = '0'+ c2;
                }
                return '#' + c + c1 + c2;
              },
              green: function(v) {
                var c = (128 + Math.floor((40-v)/40*128)).toString(16);
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
                    config.font = '14px Avenir';
                } else if (x === 3) {
                  config.value = format(config.value);
                  if (row.flash > 0) {
                    config.bgColor = flashMap[row.flashColor](row.flash);
                    config.fgColor = 'white';
                    row.flash = row.flash - 1;
                    // if (y === 0) {
                    //   console.log('update flash = ' + row.flash + ' ' + Date.now());
                    // }
                  }
                } else if (x === 13) {
                  config.value = [imageCache[config.value],config.value,null];
                } else {
                  config.value = format(config.value);
                }

                row.lastViewedTime = Date.now();
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
      13,
      21,
      27,
      28
   ],
   "fixedColumnIndexes":[  

   ],
   "hiddenColumns":[  
      26,
      25,
      24,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      23,
      22
   ],
   "columnWidths":[  
      null,
      49.4189453125,
      49.4189453125,
      49.4189453125,
      80,
      49.837890625,
      65.306640625,
      56.515625,
      49.4189453125,
      49.4189453125,
      46.890625,
      49.4189453125,
      50.7578125,
      81.841796875,
      86.5908203125,
      38.38671875,
      118.5322265625,
      167.72021484375,
      213.3408203125,
      248.8876953125,
      266.775390625,
      86.9970703125,
      49.4189453125,
      25.3046875,
      73.591796875,
      269.416015625,
      217.42236328125,
      null,
      null
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
}

;
            jsonModel.setState(state);
        });
            
    },
    openBidOffer: ()=>{
        console.log('start buddy')
        require('./child-window.js').createChildWindow({
                        name: 'orders',
                        url: 'order.html',
                        autoShow: true,
                        width: 960,
                        maxWidth: 960,
                        minWidth: 960,
                        height: 400,
                        maxHeight: 400,
                        
                        frame: false
                    });
    },
    openOrders: ()=>{

    },
    render: function (){
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

