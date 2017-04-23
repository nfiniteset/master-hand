import React, { Component } from 'react';
import './style.css';

function format(name = '') {
  return name.replace(/_/g, ' ');
}

class BinChooserImg extends Component {
  constructor(props) {
    super(props);

    ['binClicked'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  binClicked() {
    this.props.binChosen(this.props.series, this.props.bin);
  }

  render() {
    const { series, bin } = this.props;
    const imgSrc = `/${series}/${bin}.png`;
    const imgAlt = `${format(series)} / ${format(bin)}`;

    return (
      <img onClick={this.binClicked} style={this.props.imgStyles} className="BinChooserImage" src={imgSrc} alt={imgAlt}></img>
    );
  }
}

export default BinChooserImg;
