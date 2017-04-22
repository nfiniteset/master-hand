import React, { Component } from 'react';
import cn from 'classnames';
import './style.css';

function format(name) {
  return name.replace(/_/g, ' ');
}

class BinChooser extends Component {
  binClicked(series, bin) {
    this.props.binChosen(series, bin);
  }

  render() {
    const bins = Object.entries(this.props.bins).map(([series, bins]) => {
      return (
        <div key={series}>
          <div className="BinChooser__series">{format(series)}</div>
          {bins.map((bin) => {
            const classNames = cn('BinChooser__bin', {
              'BinChooser__bin--is-chosen': this.props.chosenBin === bin
            });

            return (
              <div className={classNames} key={bin} onClick={this.binClicked.bind(this, series, bin)}>{format(bin)}</div>
            );
          })}
        </div>
      );
    });

    return (
      <div className="BinChooser">
        {bins}
      </div>
    );
  }
}

export default BinChooser;
