import React, { Component } from 'react';
import BinChooser from '../BinChooser';
import './style.css';

class AmiiboScanner extends Component {
  render() {
    const cardPresent = this.props.amiibo.longUid !== undefined;
    return (
      <div className="AmiiboScanner">
        <h1>{cardPresent ? 'Blank RFID scanned' : 'No RFID present' }</h1>
        <BinChooser {...this.props} cardPresent={cardPresent}></BinChooser>
      </div>
    );
  }
}

export default AmiiboScanner;
