import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import DebugTools from '../DebugTools';
import AmiiboScanner from '../AmiiboScanner';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { amiibo: {} }

    props.socket.on('blank-rfid-scanned', (amiibo) => {
      console.log('recieved blank-rfid-scanned', amiibo)
      this.setState({ amiibo: amiibo });
    });

    props.socket.on('rfid-removed', (amiibo) => {
      console.log('recieved rfid-removed', amiibo)
      this.setState({ amiibo: amiibo });
    });
  }

  render() {
    return (
      <div className="App marching-ants">
        <AmiiboScanner amiibo={this.state.amiibo}></AmiiboScanner>
        <DebugTools socket={this.props.socket}></DebugTools>
      </div>
    );
  }
}

export default socketConnect(App);
