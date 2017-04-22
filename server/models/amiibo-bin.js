const fs = require('fs');

const DEFAULTS = {
  hex: undefined,
}

module.exports = {
  read(seriesName, binName) {
    const path = `./bins/${seriesName}/${binName}.bin`;
    const hex = fs.readFileSync(path, { encoding: 'hex' });
    return Object.assign({}, DEFAULTS, { hex });
  }
}
