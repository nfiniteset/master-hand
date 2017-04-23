import React, { Component } from 'react';
import BinChooserItem from '../BinChooserItem';
import BinChooserImg from '../BinChooserImg';
import './style.css';

function format(name = '') {
  return name.replace(/_/g, ' ');
}

class BinChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { itemStyles: {} };
    ['setItemStyle'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  setItemStyle(id, itemStyles) {
    const updatedItemStyles = Object.assign({}, this.state.itemStyles);
    updatedItemStyles[id] = itemStyles;
    this.setState({ itemStyles: updatedItemStyles });
  }

  render() {
    if (!this.props.cardPresent) {
      return (
        <ul className="BinChooser"></ul>
      );
    }

    const binChosen = this.props.chosenBin;

    const bins = Object.entries(this.props.bins).map(([series, bins]) => {
      return bins.map((bin) => {
          const props = {
            id: `${series}-${bin}`,
            bin: bin,
            series: series,
            chosenBin: this.props.chosenBin,
            chosenSeries: this.props.chosenSeries,
            setItemStyle: this.setItemStyle
          }
          return <BinChooserItem {...props} key={series + bin}></BinChooserItem>
        });
      });

    const images = Object.entries(this.props.bins).map(([series, bins]) => {
      return bins.map((bin) => {
        const id = `${series}-${bin}`;
        const props = {
          bin: bin,
          series: series,
          imgStyles: this.state.itemStyles[id],
          binChosen: this.props.binChosen,
        }
        return <BinChooserImg {...props} key={series + bin}></BinChooserImg>
      });
    });

    return (
      <div className="BinChooser">
        <ul className="BinChooser__items">
          { binChosen ? (
            <li className={'BinChooser__info'}>
              <h2>{format(this.props.chosenBin)}</h2>
              <h3>{format(this.props.chosenSeries)}</h3>
              <button className="AmiiboScanner__write-button" disabled={!binChosen} onClick={this.props.writeAmiibo}>Write</button>
            </li>
          ) : null }
          { bins }
        </ul>
        <ul className="BinChooser__images">{images}</ul>
      </div>
    );
  }
}

export default BinChooser;
