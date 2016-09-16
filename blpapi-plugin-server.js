// Communication
const server = require('http').Server();
const io = require('socket.io')(server);
server.listen(5432, '0.0.0.0');

// Plugin
// const blpapi = require('blpapi');
const blpapi = require('./blpapi-emulator');
const sessionArgs = {serverHost: 'localhost', serverPort: 8194};
const requestTopic = 'plugin-request';
const errorTopic = 'plugin-error';

io.on('connection', socket => {
    let session = new blpapi.Session(sessionArgs);

    socket.on(requestTopic, m => {
        if (m.functionName === 'on') {
            session.on(m.event, d => socket.emit(m.event, Object.assign(m, {payload: d})));
        } else {
            try {
                session[m.functionName].apply(session, m.args);
            } catch(err) {
                socket.emit(errorTopic, Object.assign(m, {error: err.message}));
            }
        }

    });
});