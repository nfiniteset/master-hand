const express = require('express');
const morgan = require('morgan');
const path = require('path');

const initEventsController = require('./controllers/events-controller');
const BinsController = require('./controllers/bins-controller');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9001);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static('bins'));

io.on('connection', function (socket) {
  initEventsController(socket);
});

app.get('/bins', (req, res) => {
  BinsController.index(req, res);
});

module.exports = app;
