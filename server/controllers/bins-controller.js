const fs = require('fs');

function validSeries(dirNames) {
  return dirNames
            .filter((dn) => { return !dn.startsWith('.') });
}

function validBins(fileNames) {
  return fileNames
            .filter((fn) => { return fn.endsWith('.bin') })
            .map((fn) => { return fn.replace('.bin', '') });
}

module.exports = {
  index(req, res) {
    const series = validSeries(fs.readdirSync('./bins'))
                     .reduce((acc, series) => {
                       acc[series] = validBins(fs.readdirSync(`./bins/${series}`));
                       return acc;
                     }, {});
    res.json(series);
  }
}
