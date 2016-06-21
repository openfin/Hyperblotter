var windowListSingleton = {
    _instance: null,
    createInstance:function createInstance(){
        this._instance = {
            _windows:[],
            getWindows:function getWindows() {
                return this._windows;
                },
            addWindow:function addWindow(value){
                if(this._windows.indexOf(value) === -1){
                    this._windows.push(value);
                }
            },
            removeWindow: function removeWindow(value){
                if(this._windows.indexOf(value) !== -1){
                    var _sp = this._windows.indexOf(value);
                    this._windows.splice(_sp, 1);
                }
            }
        };
    return this._instance;
    },


    getInstance:function(){
        return this._instance ? this._instance : this.createInstance() ;
    }
};

module.exports = windowListSingleton;