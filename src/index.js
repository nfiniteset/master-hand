import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { SocketProvider } from 'socket.io-react';

var socket = require('socket.io-client')('http://localhost:9001');

ReactDOM.render(
  <SocketProvider socket={socket}>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);
