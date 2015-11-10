/**
 * Created by grahamclapham on 16/10/15.
 */
var dataTicker = require('./data_ticker');
var _testArr, _arrayGen, _array;
var _init = function(){
    var _testArr = dataTicker.arrayGenerator();
    _arrayGen = dataTicker.arrayGenerator();
    _array = _arrayGen.getRandomArray();
    //console.log(JSON.stringify(_array));
    var _timer = dataTicker.timerGenerator();
    _timer.start();
};

_init();
