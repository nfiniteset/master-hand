import React, { Component } from 'react';
import './style.css';

class DebugTools extends Component {
  constructor(props) {
    super(props);
    ['simulateScanFakeRfid', 'simulateRemoveRfid'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  simulateScanFakeRfid() {
    console.log('emitting event: debug-blank-rfid-scanned');
    this.props.socket.emit('debug-blank-rfid-scanned');
  }

  simulateRemoveRfid() {
    console.log('emitting event: debug-rfid-removed');
    this.props.socket.emit('debug-rfid-removed');
  }

  render() {
    return (
      <div className="">
        <button onClick={this.simulateScanFakeRfid}>Scan blank RFID</button>
        <button onClick={this.simulateRemoveRfid}>Remove RFID</button>
      </div>
    );
  }
}

export default DebugTools;
