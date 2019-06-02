const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});

io.on('connection', socket => {
    socket.on('ferret', (name, word, fn) => {
        fn(name + ' says' + word);
    });
});
