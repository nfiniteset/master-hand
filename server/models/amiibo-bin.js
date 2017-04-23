const fs = require('fs');

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

function replace(str, replacement, start) {
	return [
    str.substr(0, start),
    replacement,
    str.substr(start + replacement.length, str.length)
  ].join('');;
}

module.exports = {
  read(seriesName, binName) {
    const path = `./bins/${seriesName}/${binName}.bin`;
    return fs.readFileSync(path, { encoding: 'hex' });
  },

  writeLocks(model) {
    return [
      { location: 4, value: '0000' },
      { location: 1040, value: '000000' },
      { location: 1072, value: '8080' },
    ].reduce((model, { location, value }) => {
      return replace(model, value, location);
    }, model);
  },

  writePassword(model, password) {
    return replace(model, password, 1064);
  },

  writeUid(model, longUid) {
    return [
      { location: 0, value: longUid.substr(longUid.length - 2, 2) },
      { location: 936, value: longUid.substr(0, 16) },
    ].reduce((model, { location, value }) => {
      return replace(model, value, location);
    }, model);
  },

  format(model) {
    return structure(model).reduce(function(memo, row) {
      return memo += `${row.join(' ')}\n`;
    }, '');
  },

  formatHex(model) {
    return model.match(/.{1,2}/g).reduce(function(memo, byte) {
      return memo += `0x${byte}, `
    }, '');
  }
}
