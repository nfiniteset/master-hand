import React, { Component } from 'react';
import cn from 'classnames';
import './style.css';

class BinChooserItem extends Component {
  constructor(props) {
    super(props);

    this.state = { imgPosition: {} };

    ['saveEl', 'binClicked'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  binClicked(series, bin) {
    this.props.binChosen(this.props.series, this.props.bin);
  }

  positionImage(el) {
    const clientRect = el.getBoundingClientRect();
    const itemStyle = {
      top: clientRect.top,
      left: clientRect.left,
      width: clientRect.width,
      height: clientRect.height,
    };
    this.props.setItemStyle(this.props.id, itemStyle)
  }

  saveEl(el) {
    this.positionImage(el);
    setInterval(() => { this.positionImage(el) }, 200);
  }

  render() {
    const { series, bin, chosenSeries, chosenBin } = this.props;
    const classNames = cn(
      'BinChooserItem__bin',
      `BinChooserItem__bin--${series}-${bin}`, {
        'BinChooserItem__bin--is-chosen': chosenBin === bin && chosenSeries === series,
      });

    return (
      <li ref={this.saveEl} className={classNames} onClick={this.binClicked}></li>
    );
  }
}

export default BinChooserItem;
