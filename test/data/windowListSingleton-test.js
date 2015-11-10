var winList = require('../../src/javascript/windowsListSingleton');

  var  item0 = {"value": "value zero"},
    item1 = {"value": "value one"},
    item2 = {"value": "value three"};


describe("windowsListSingleton", function(){
    it("Should return an instance of itself", function(){
        expect(winList.getInstance()).not.toBe(null)
    });

    it("winList.getInstance() should have a getWindows() function, returning an Array.", function(){
        expect(winList.getInstance().getWindows).toEqual(jasmine.any(Function));
        expect(winList.getInstance().getWindows()).toEqual(jasmine.any(Array))
    });

    it("addWindow() should add an item to the getWindows() Array", function(){
        expect(winList.getInstance().addWindow).toEqual(jasmine.any(Function));
    });
});

describe("The windowsListSingleton will allow items to be added.", function(){

        it("Should allow an item to be added to the array", function(){
            winList.getInstance().addWindow(item0);
            expect(winList.getInstance().getWindows().length).toEqual(1);
        });

    it("Should not allow an item to be added to the array if already in the array", function(){
        winList.getInstance().addWindow(item0);
        expect(winList.getInstance().getWindows().length).toEqual(1);
    });

    it("But it should not allow an unique item to be added to the array if not already in the array", function(){
        winList.getInstance().addWindow(item1);
        expect(winList.getInstance().getWindows().length).toEqual(2);

        winList.getInstance().addWindow(item2);
        expect(winList.getInstance().getWindows().length).toEqual(3);
    });
});

describe("The windowsListSingleton will allow items to be removed.", function(){

    it("Should allow an item to be added to the array", function(){
        winList.getInstance().removeWindow(item0);
        expect(winList.getInstance().getWindows().length).toEqual(2);
    });
});