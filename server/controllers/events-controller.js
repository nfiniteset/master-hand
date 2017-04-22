const Amiibo = require('../models/amiibo');
const AmiiboBin = require('../models/amiibo-bin');

module.exports = function(socket) {
  socket.on('write-amiibo', function(data) {
    console.log('recieved event: write-amiibo', data);
    writeAmiibo(data);
  });

  socket.on('debug-blank-rfid-scanned', function(data) {
    console.log('recieved event: debug-blank-rfid-scanned');
    blankRfidScanned(socket, '123456789ABCDE');
  });

  socket.on('debug-rfid-removed', function(data) {
    console.log('recieved event: debug-rfid-removed');
    rfidRemoved(socket);
  });
}

function blankRfidScanned(socket, shortUid) {
  let data = Amiibo.init({ shortUid: shortUid });
  console.log('emitting event: blank-rfid-scanned', data);
  socket.emit('blank-rfid-scanned', data);
}

function rfidRemoved(socket) {
  console.log('emitting event: rfid-removed');
  socket.emit('rfid-removed', Amiibo.init());
}

function writeAmiibo(data) {
  const bin = AmiiboBin.read(data.series, data.bin);
  const amiibo = Amiibo.patch({
    bin: bin,
    shortUid: data.shortUid,
    longUid: data.longUid
  });
  console.log(bin);
}
