import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import DebugTools from '../DebugTools';
import AmiiboScanner from '../AmiiboScanner';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { amiibo: {}, bins: [], chosenBin: undefined }

    props.socket.on('blank-rfid-scanned', (amiibo) => {
      console.log('recieved blank-rfid-scanned', amiibo)
      this.setState({ amiibo: amiibo });
    });

    props.socket.on('rfid-removed', (amiibo) => {
      console.log('recieved rfid-removed', amiibo)
      this.setState({ amiibo: amiibo });
    });

    ['setChosenBin'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  componentDidMount() {
    fetch('/bins')
      .then((response) => { return response.json() })
      .then((data) => { return this.setState({ bins: data }); });
  }

  setChosenBin(bin) {
    this.setState({ chosenBin: bin });
  }

  render() {
    return (
      <div className="App">
        <AmiiboScanner amiibo={this.state.amiibo} bins={this.state.bins} chosenBin={this.state.chosenBin} binChosen={this.setChosenBin}></AmiiboScanner>
        <DebugTools socket={this.props.socket}></DebugTools>
      </div>
    );
  }
}

export default socketConnect(App);
