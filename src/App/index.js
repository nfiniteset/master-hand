import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import DebugTools from '../DebugTools';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App marching-ants">
        <DebugTools socket={this.props.socket}></DebugTools>
      </div>
    );
  }
}

export default socketConnect(App);
