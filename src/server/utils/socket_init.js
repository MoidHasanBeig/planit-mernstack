import * as socket from 'socket.io';

const socketInit = (server) => {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

export default socketInit;
