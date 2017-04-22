const Amiibo = require('../models/amiibo');

function blankRfidScanned(socket, shortUid) {
  console.log('emitting event: blank-uid-scanned');
  socket.emit('blank-uid-scanned', Amiibo.init({ shortUid: shortUid }));
}

module.exports = function(socket) {
  socket.on('debug-blank-rfid-scanned', function(data) {
    console.log('recieved event: debug-blank-uid-scanned')
    blankRfidScanned(socket, '123456789ABCDE');
  });
}
