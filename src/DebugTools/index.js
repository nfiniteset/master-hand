import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.simulateScanFakeRfid = this.simulateScanFakeRfid.bind(this);
  }

  simulateScanFakeRfid() {
    console.log('emitting event: debug-blank-uid-scanned');
    this.props.socket.emit('debug-blank-rfid-scanned');
  }

  render() {
    return (
      <div className="">
        <button onClick={this.simulateScanFakeRfid}>Scan blank RFID</button>
      </div>
    );
  }
}

export default App;
