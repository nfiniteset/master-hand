import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var socket = require('socket.io-client')('http://localhost:9001');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
