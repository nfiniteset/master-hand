const Amiibo = require('../models/amiibo');
const AmiiboBin = require('../models/amiibo-bin');

module.exports = function(socket) {
  socket.on('write-amiibo', function(data) {
    console.log('recieved event: write-amiibo', data);
    writeAmiibo(data);
  });

  socket.on('debug-blank-rfid-scanned', function(data) {
    console.log('recieved event: debug-blank-rfid-scanned');
    blankRfidScanned(socket, '0471622AE33E81', '0471629F2AE33E8176');
  });

  socket.on('debug-rfid-removed', function(data) {
    console.log('recieved event: debug-rfid-removed');
    rfidRemoved(socket);
  });
}

function blankRfidScanned(socket, shortUid, longUid) {
  let data = Amiibo.init({ shortUid, longUid });
  console.log('emitting event: blank-rfid-scanned', data);
  socket.emit('blank-rfid-scanned', data);
}

function rfidRemoved(socket) {
  console.log('emitting event: rfid-removed');
  socket.emit('rfid-removed', Amiibo.init());
}

function writeAmiibo(data) {
  let amiibo = Amiibo.getPassword(data.amiibo);
  amiibo.bin = AmiiboBin.read(data.series, data.bin);
  console.log('Bin before');
  console.log(AmiiboBin.format(amiibo.bin));
  amiibo = Amiibo.patch(amiibo);
  console.log('Bin after');
  console.log(AmiiboBin.format(amiibo.bin));
}
