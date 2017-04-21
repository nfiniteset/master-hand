export default function(uid) {
  socket.emit('blank-uid-scanned', { uid: uid });
}
