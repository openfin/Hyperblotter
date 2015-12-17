/**
 * Created by grahamclapham on 16/10/15.
 */

var staticData = require('../../src/javascript/griddata/staticData');
var dataTicker = require('../../src/javascript/griddata/data_ticker');

describe("Expect the data to be available to use", function(){

    it("The staticData will exist", function(){
        expect(staticData).toBe.ok;
    });

    it("staticData.data.NAME.length will equal 921", function(){
        expect(staticData.data.NAME.length).toEqual(921);
    });

    it("staticData.data.NAME[0] == 'Exxon Mobil Corp.' ", function(){
        expect(staticData.data.NAME[0]).toBe("Exxon Mobil Corp.");
    });

    it("staticData.data.NAME[1] == 'International Business Machines Corp.' ", function(){
        expect(staticData.data.NAME[1]).toBe("International Business Machines Corp.");
    });

});

describe("arrayGenerator.createDataCell.", function(){
    var _cell, _arrayCellGen;
    beforeEach(function(){
        _arrayCellGen = dataTicker.arrayGenerator();
        _cell = _arrayCellGen.createDataCell(0);
    });
    it("arrayGenerator.createDataCell returns an Object with expected properties ", function(){
        expect(_cell.NAME).toBe("Exxon Mobil Corp.");
        expect(_cell.TICKER).toBe("XOM");
        expect(_cell.COUNTRY).toBe("United States");
    });
});

describe("arrayGenerator.createDataArray returns an Array with the correct properties", function(){
    var _array, _arrayGen;
    beforeEach(function(){
        _arrayGen = dataTicker.arrayGenerator();
    });
    it("arrayGenerator.createDataArray returns an Array with the correct properties", function(){
        expect(_arrayGen).not.toBe(null);
        _arrayGen.setArrayLength(10);
        expect(_arrayGen.getArrayLength()).toEqual(10);
        expect(_arrayGen.getRandomArray().length).toEqual(10);

        _arrayGen.setArrayLength(20);
        expect(_arrayGen.getArrayLength()).toEqual(20);
        expect(_arrayGen.getRandomArray().length).toEqual(20);
    })
});

describe("_generateRandomNumberArray", function(){
    var _numberArrayGen, _numArray;
    beforeEach(function(){
        _numberArrayGen = dataTicker.arrayGenerator();
        _numArray = _numberArrayGen._generateRandomNumberArray(10,1000);
    });
    afterEach(function(){
        _numberArrayGen = null;
    });

    it("_generateRandomNumberArray should generate a random Array of the correct length.",
        function(){
            expect(_numberArrayGen).toBe.ok;
            expect(_numArray.length).toEqual(10);
        }
    );

    it("_generateRandomNumberArray should generate a random Array of the correct length and be able to be called repeatedly",
        function(){
            var _numArray2 = _numberArrayGen._generateRandomNumberArray(20,1000);
            expect(_numArray2.length).toEqual(20);
            var _numArray3 = _numberArrayGen._generateRandomNumberArray(20,1000);
            expect(_numArray3.length).toEqual(20);
            var _numArray4 = _numberArrayGen._generateRandomNumberArray(40,4000);
            expect(_numArray4.length).toEqual(40);
        }
    );
});

