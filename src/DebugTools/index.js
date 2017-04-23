import React, { Component } from 'react';
import './style.css';

class DebugTools extends Component {
  constructor(props) {
    super(props);

    this.state = { longUid: '0471629F2AE33E8176' };

    ['simulateScanFakeRfid', 'simulateRemoveRfid', 'setLongUid'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  simulateScanFakeRfid() {
    console.log('emitting event: debug-blank-rfid-scanned');
    this.props.socket.emit('debug-blank-rfid-scanned', { longUid: this.state.longUid });
  }

  simulateRemoveRfid() {
    console.log('emitting event: debug-rfid-removed');
    this.props.socket.emit('debug-rfid-removed');
  }

  setLongUid(event) {
    this.setState({ longUid: event.target.value });
  }

  render() {
    return (
      <div className="DebugTools">
        <div>
          <label>Long UID</label>
          <input onChange={this.setLongUid} value={this.state.longUid}></input>
        </div>
        <button onClick={this.simulateScanFakeRfid}>Scan blank RFID</button>
        <button onClick={this.simulateRemoveRfid}>Remove RFID</button>
      </div>
    );
  }
}

export default DebugTools;
