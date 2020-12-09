import io from 'socket.io-client';

let socket;

export const connectSocket = (song) => {
  socket = io('http://192.168.1.17:5000', {
    transports: ['websocket'],
    jsonp: false,
  });
  socket.connect();
  console.log('Connecting socket...');
  if (socket && song) {
    socket.emit('join', song);
  }
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) {
    socket.disconnect();
  }
};

export const postComment = (song, comment) => {
  if (socket) {
    socket.emit('postComment', {comment, song});
  }
};

export const subscribeSong = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on('postComment', (comment) => {
    return cb(comment);
  });
};
