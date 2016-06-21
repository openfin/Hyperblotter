"use strict";
// 1
var $ = require('jquery');

var EikonLink = (function (config) {
    //-- callbacks

    var onContextReceived = function (context) {
        console.log("WE ON MESSAGE: onContextReceived ");
    };
    var onUpdateLinkStatus = function (bool, instanceId, targetEntityId) {
        console.log("WE ON MESSAGE: onUpdateLinkStatus ");
    };
    var onUpdateLinkStatus = function (bool, instanceId, targetEntityId) {
        console.log("WE ON MESSAGE: onUpdateLinkStatus ");
    };
    var onShowFeedbackForLinking = function (bool) {
        console.log("WE ON MESSAGE: onShowFeedbackForLinking ");
    };
    //-----------------------
    var websocketCallbacks = {
        onWsOpen: function () {
            console.log("The websocket has opened ... ");
        },
        onWsClose: function (evt) {
            // refer to http://tools.ietf.org/html/rfc6455#section-7.4.1
            var txt = 'WebSocket closed. (Code = ' + evt.code + ')';
        },
        onWsError: function (evt) {
            //showResult('Websocket error.', Mode.ERROR, true);
        }
    };
    //---
    var requestSxS = function (url, token, post) {
        //console.log(" requestSxS url: ", url,  "token:", token, "post: ",post)
        var setting = {
            url: url,
            type: 'GET'
        };

        if (post != null) {
            post.sessionToken = token;
            setting.type = 'POST';
            setting.data = JSON.stringify(post);
            setting.contentType = 'application/json';
        }
        return $.ajax(setting);
    };
    //----
    var _scope = function (config) {
        this.config = { port: 9000, appId: "AppId#DEMO", instanceId: "AppInstanceId#DEMO" }
        for (var prop in config) {
            this.config[prop] = config[prop];
        }
        this.port = this.config.port;
        this.appId = this.config.appId;
        this.instanceId = this.config.instanceId;
        this.g_token = null;
        this.g_activePort = null;
        this.g_appid = null;
    };
    //--
    _scope.prototype = {
        connect: function () {
            return new Promise((resolve, reject) => {
                this.checkPort().then((v) => {
                    console.log("CONNECT v: ", v);
                    console.log("CONNECT activePort", v.activePort);
                    this.g_activePort = v.activePort;
                    this.handshake().then((d) => {
                        resolve(this);
                    }).catch((err) => {
                        console.log("ERROR: ", err);
                    });
                }).catch((err) => { console.log("ERROR IN CONNECT : ", err) })
            })
        },
        //--
        getAppId: function () {
            return this.appId;
        },
        getInstanceId: function () {
            return this.instanceId;
        },
        getSessionToken: function () {
            return this.g_token;
        },
        getActivePort: function () {
            return this.g_activePort;
        },
        getUrl: function () {
            //console.log("Active Port in getURL: ", this.g_activePort)
            return 'http://localhost:' + this.getActivePort() + '/sxs/v1/';
        },
        //--
        checkPort: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var url = 'http://localhost:' + _this.port + '/ping';
                EikonLink.FetchHttpRequest(url).then(function (r) {
                    _this.g_activePort = r
                    resolve({ portDiscovered: true, activePort: _this.g_activePort })
                }).catch((e) => {
                    console.log("There was an Error checking the port");
                    reject({ portDiscovered: false, activePort: null })
                });
            });
        },
        //---
        handshake: function () {
            var _this = this;
            return new Promise((resolve, reject) => {
                var url = 'http://localhost:' + this.g_activePort + '/sxs/v1/';
                var post = { command: 'handshake', appKey: this.appId, appInstanceId: this.appInstanceId };

                var setting = {
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(post),
                    contentType: 'application/json'
                };

                $.ajax(setting).done(function (data) {
                    _this.g_token = data.sessionToken;
                    _this.mclConnect().then((d) => {
                        resolve(data);
                    }).catch((err) => {
                        console.log("CONNECTION ERROR ", err);
                    });
                });
            });
        },
        //-----
        mclConnect: function () {
            console.log("_________________ mclConnect called")
            return new Promise((resolve, reject) => {
                var url = 'ws://localhost:' + this.g_activePort + '/sxs/v1/notifications?sessionToken=' + this.g_token;
                var ws = new WebSocket(url);
                ws.onmessage = function (evt) {

                    console.log("----- ON MESSAGE == ", evt);
                    // showResult(evt.data, Mode.SUCCESS, true);
                    try {
                        var msg = JSON.parse(evt.data);
                        var cmd = msg.command;
                        if (cmd == 'contextReceived') onContextReceived(msg.context);
                        if (cmd == 'linked') onUpdateLinkStatus(true, msg.instanceId, msg.targetEntityId);
                        if (cmd == 'unlinked') onUpdateLinkStatus(false, msg.instanceId, msg.targetEntityId);
                        if (cmd == 'showFeedbackForLinking') onShowFeedbackForLinking(true);
                        if (cmd == 'hideFeedbackForLinking') onShowFeedbackForLinking(false);
                    }
                    catch (error) {
                        console.log('WS Error: ' + error);
                        reject('WS Error: ' + error)
                    }
                };
                ws.onerror = ()=> {
                    websocketCallbacks.onWsError.call(this);
                    reject();
                };
                ws.onclose = ()=> {
                    websocketCallbacks.onWsClose.call(this);
                };
                ws.onopen = ()=> {
                    websocketCallbacks.onWsOpen.call(this);
                    resolve();
                };
            })
        },
        //------ POST CONNECTION METHODS ------
        mclGetAppList: function () {
            return new Promise((resolve, reject) => {
                var url = this.getUrl();
                var post = { command: 'getAppList' };
                requestSxS(url, this.g_token, post).done(function (data) {
                    var text = JSON.stringify(data);
                    if (!data.isSuccess) return;
                    if (data.apps) {
                        resolve(data.apps);
                    }

                }).fail(function (jqXHR) {
                    var text = 'Error ' + jqXHR.status + ': ' + jqXHR.statusText;
                    reject(text);
                });
            });
        },
        //--- linking apps
        mclLinkApp: function (targetId) {
            console.log("mclLinkApp -- instanceId === ", targetId)
            var url = this.getUrl();
            var post = { command: 'link', targetInstanceId: targetId };
            requestSxS(url, this.g_token, post).done(function (data) {
                var text = JSON.stringify(data);
                //console.log("CONNECTED : targetId = ", targetId, " - ", text);
                if (!data.isSuccess) return;
            }).fail(function (jqXHR) {
                var text = 'Error ' + jqXHR.status + ': ' + jqXHR.statusText;
                console.log("NOT CONNECTED :", text);
            });
        },
        mclUnlinkApp: function (targetId) {
            var url = getUrl();
            var post = { command: 'unlink', targetInstanceId: targetId };
            requestSxS(url, this.g_token, post).done(function (data) {
                var text = JSON.stringify(data);
                if (!data.isSuccess) return;
            }).fail(function (jqXHR) {
                var text = 'Error ' + jqXHR.status + ': ' + jqXHR.statusText;
            });
        },
        showFeedbackForLinking: function ( targetId ) {
            var post = { command: 'showFeedbackForLinking', instanceId: targetId };
            requestSxS(this.getUrl(), this.g_token, post);
        },
        hideFeedbackForLinking: function ( targetId ) {
            var post = { command: 'hideFeedbackForLinking', instanceId: targetId };
            requestSxS(this.getUrl(), this.g_token, post);
        },
        mcLaunchApp: function (appId, RIC ) {
            var appId = appId || "News";
            var RIC = RIC || "GOOG.O";

            var url = this.getUrl();
            var post = { command: 'launch', appId: appId, context: { entities: [{ RIC: RIC }] } };
            requestSxS(url, this.g_token, post).done(function (data) {
                var text = JSON.stringify(data);
            }).fail(function (jqXHR) {
                var text = 'Error ' + jqXHR.status + ': ' + jqXHR.statusText;
            });
        },
        mclSendContext: function (context) {
            console.log("mclSendContext  --- ",context);
            var url = this.getUrl();
            var post = { command: 'contextChanged', context: context };
            requestSxS(url, this.g_token, post).done(function (data) {
                var text = JSON.stringify(data);
                console.log(context, " context -- SEND CONTEXT : ", text);
            }).fail(function (jqXHR) {
                var text = 'Error ' + jqXHR.status + ': ' + jqXHR.statusText;
            });
        }

    };
    //--- Prototype ends -----
    return _scope
})();

/// Static functions
EikonLink.FetchHttpRequest = function (url, responseType) {
    var responseType = responseType || 'json'
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = responseType;
        xhr.onload = function () {
            resolve(xhr.response)
        };
        xhr.onerror = function (err) {
            reject("Error getting http request.", err);
        };
        xhr.send();
    })
};
//----------
EikonLink.requestSxS = function (url, token, post) {
    var setting = {
        url: url,
        type: 'GET'
    };
    if (post != null) {
        post.sessionToken = token;
        setting.type = 'POST';
        setting.data = JSON.stringify(post);
        setting.contentType = 'application/json';
    }
    return $.ajax(setting);
};

module.exports = EikonLink;