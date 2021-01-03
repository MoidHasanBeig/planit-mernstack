import * as socket from 'socket.io';

const socketInit = (server) => {
  const io = socket(server);
  let clients ={};

  io.on('connection', (socket) => {
    console.log('User connected',socket.id);

    socket.on('userinfo', (uid) => {
      clients[uid] = socket;
      console.log(clients);
    });

    //on user disconnect
    socket.on('disconnect', () => {
      for (let uid in clients) {
        clients[uid].id === socket.id && delete clients[uid];
      }
      console.log('user disconnected');
      console.log(clients);
    });
  });

  return io;
}

export default socketInit;
