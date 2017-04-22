import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import DebugTools from '../DebugTools';
import AmiiboScanner from '../AmiiboScanner';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { amiibo: {}, bins: [], chosenSeries: undefined, chosenBin: undefined }

    props.socket.on('blank-rfid-scanned', (amiibo) => {
      console.log('recieved blank-rfid-scanned', amiibo)
      this.setState({ amiibo: amiibo });
    });

    props.socket.on('rfid-removed', (amiibo) => {
      console.log('recieved rfid-removed', amiibo)
      this.setState({ amiibo: amiibo, chosenSeries: undefined, chosenBin: undefined });
    });

    ['setChosenBin', 'writeAmiibo'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  componentDidMount() {
    fetch('/bins')
      .then((response) => { return response.json() })
      .then((data) => { return this.setState({ bins: data }); });
  }

  setChosenBin(chosenSeries, chosenBin) {
    this.setState({ chosenSeries, chosenBin });
  }

  writeAmiibo() {
    this.props.socket.emit('write-amiibo', {
      amiibo: this.state.amiibo,
      series: this.state.chosenSeries,
      bin: this.state.chosenBin
    });
  }

  render() {
    return (
      <div className="App">
        <AmiiboScanner {...this.state} binChosen={this.setChosenBin} writeAmiibo={this.writeAmiibo}></AmiiboScanner>
        <DebugTools socket={this.props.socket}></DebugTools>
      </div>
    );
  }
}

export default socketConnect(App);
