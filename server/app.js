const express = require('express');
const morgan = require('morgan');
const path = require('path');

const blankRfidScanned = require('actions/blank-rfid-scanned');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9001);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('debug-blank-rfid-scanned', function(socket) {
    blankRfidScanned(socket, '1234567890ABCDEF');
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
