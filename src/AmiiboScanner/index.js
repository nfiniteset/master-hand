import React, { Component } from 'react';
import BinChooser from '../BinChooser';
import './style.css';

class AmiiboScanner extends Component {
  render() {
    const cardPresent = this.props.amiibo.shortUid;
    const binChosen = this.props.chosenBin;
    return (
      <div className="AmiiboScanner">
        <h1>{cardPresent ? 'Blank RFID scanned' : 'No RFID present' }</h1>
        {cardPresent ? (
          <div>
            <p>{this.props.amiibo.shortUid}</p>
            <p>{this.props.amiibo.longUid}</p>
            <BinChooser {...this.props}></BinChooser>
          </div>
        ) : null}
        {binChosen ? (
          <button onClick={this.props.writeAmiibo}>Write</button>
        ) : null}
      </div>
    );
  }
}

export default AmiiboScanner;
