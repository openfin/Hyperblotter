// Communication
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('./'));
app.get('/', (req, res) => res.sendFile('app.html', {root: __dirname}));
server.listen(5432, '0.0.0.0');

// Plugin
// const blpapi = require('blpapi');
const blpapi = require('./blpapi-emulator');
const sessionArgs = {serverHost: 'localhost', serverPort: 8194};
const requestTopic = 'plugin-request';
const responseTopic = 'plugin-response';
const errorTopic = 'plugin-error';
let sessions = [];

io.on('connection', socket => {
    socket.on(requestTopic, m => {
        if (m.functionName === 'newSession') {
            let session = new blpapi.Session(sessionArgs);
            session.id = m.id;
            sessions.push(session);
            return;
        }

        let session = sessions.find(s => s.id === m.id);

        if (m.functionName === 'on') {
            session[m.functionName](m.event, d => socket.emit(responseTopic, Object.assign(m, {payload: d})));
        } else {
            if (typeof session[m.functionName] === 'function') {
                try {
                    session[m.functionName].apply(session, m.args);
                } catch(err) {
                    socket.emit(errorTopic, Object.assign(m, {error: err.message}));
                }
            } else {
                socket.emit(errorTopic, Object.assign(m, {error: new Error(`Function <${m.functionName}> is not defined`)}));
            }
        }

    });
});