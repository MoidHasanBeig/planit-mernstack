import * as socket from 'socket.io';

const socketInit = (server) => {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('User connected');

    //on user disconnect
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
}

export default socketInit;
