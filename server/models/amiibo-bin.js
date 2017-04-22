const fs = require('fs');

const DEFAULTS = {
  hex: undefined,
}

const PASSWORD_START = 0;
const PASSWORD_LENGTH = 8;

function chunk (arr, len) {
  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

function structure(data) {
  return chunk(chunk(data, 8), 7);
}

module.exports = {
  read(seriesName, binName) {
    const path = `./bins/${seriesName}/${binName}.bin`;
    const hex = fs.readFileSync(path, { encoding: 'hex' });
    return Object.assign({}, DEFAULTS, { hex });
  },

  writeStatic(model) {
    return model;
  },

  writePassword(model, password) {
    return model;
  },

  writeUid(model, shortUid, longUid) {
    return model;
  },

  format(model) {
    return structure(model.hex).reduce(function(memo, row) {
      return memo += `${row.join(' ')}\n`;
    }, '');
  }
}
