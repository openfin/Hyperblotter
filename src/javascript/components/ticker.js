import staticData from '../griddata/staticData';
const data = staticData.data;
const countryMap = staticData.countryMap;
let stocks = staticData.stocks;

stocks.sort((a,b) => {
  return a.TICKER < b.TICKER ? -1 : 1;
});

let seed = 1;

const rnd = function() {
  let x = Math.sin(seed++)*10000;
  let r = x - Math.floor(x);
  return r;
};

const shuffle = (arr) => {
  getRandomSelection(arr);
};

const getRandomSelection = function(arr, length){
  let _length = length || 100
  let _arr = [];
  for(let i=0; i<length; i++){
    _arr.push( arr[Math.round(Math.random() * arr.length)] );
  }
  return _arr
}

let toPickFrom = stocks.slice(0);

shuffle(toPickFrom);

const randomizeTick = (stock) => {
  stock.Bid = (stock.Bid * 0.99) + (stock.Bid * 0.017 * rnd())
  stock.Spread = rnd()/10;
  stock.Ask = stock.Bid + stock.Spread;
  //trades don't always happen
  if (stock.Spread < 0.03) {
    stock.BidQuantity = Math.floor(12 * rnd()) * 100;
    stock.AskQuantity = Math.floor(12 * rnd()) * 100;
    stock.Volume = Math.floor(stock.Volume + stock.BidQuantity);
    stock.Change = stock.Bid - stock.Last
    stock.PercentChange = (stock.Change)/stock.Last*100;
    stock.Today.push(5 + Math.floor(90 * rnd()));
    if (stock.Today.length === 17) {
      stock.Today.shift();
    }
    stock.Last = stock.Bid;
    stock.flashColor = stock.Change > 0 ? 'green' : 'red';
    stock.High = Math.max(stock.High, stock.Last);
    stock.Low = Math.min(stock.Low, stock.Last);
    stock.Time = Date.now();

    if (stock.Time - stock.lastViewedTime < 100) {
      stock.flash = 40;
    }
  }
}

const randomizeTicks = () => {
  if (toPickFrom.length < 200) {
    toPickFrom = stocks.slice(0);
    shuffle(toPickFrom);
  }
  for (let i = 0; i < 200; i++) {
    let each = toPickFrom.shift();
    randomizeTick(each);
  }
};


export default {
	stocks,
	randomize: randomizeTicks
};
