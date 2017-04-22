const Amiibo = require('../models/amiibo');

module.exports = function(socket) {
  socket.on('debug-blank-rfid-scanned', function(data) {
    console.log('recieved event: debug-blank-rfid-scanned')
    blankRfidScanned(socket, '123456789ABCDE');
  });

  socket.on('debug-rfid-removed', function(data) {
    console.log('recieved event: debug-rfid-removed')
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
