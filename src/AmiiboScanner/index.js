import React, { Component } from 'react';
import './style.css';

class AmiiboScanner extends Component {
  render() {
    return (
      <div className="AmiiboScanner">
        <h1>{this.props.amiibo.shortUid ? 'Blank RFID scanned' : 'No RFID present' }</h1>
        <p>{this.props.amiibo.shortUid}</p>
        <p>{this.props.amiibo.longUid}</p>
      </div>
    );
  }
}

export default AmiiboScanner;
