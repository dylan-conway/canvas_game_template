const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('../..')(server);
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    console.log('\n\nWaiting for another connection\n\n');
    res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
    console.log('Listening on port 5000');
});
