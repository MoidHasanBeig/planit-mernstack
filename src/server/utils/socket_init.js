import * as socket from 'socket.io';

let clients ={};
let io;

const socketInit = (server) => {
  io = socket(server);

  io.on('connection', (socket) => {
    console.log('User connected',socket.id);

    socket.on('userinfo', (uid) => {
      clients[uid] = socket;
      console.log(uid,clients[uid].id);
    });

    //on user disconnect
    socket.on('disconnect', () => {
      for (let uid in clients) {
        clients[uid].id === socket.id && delete clients[uid];
      }
      console.log('user disconnected');
    });
  });

  return io;
}

export default socketInit;
export { io,clients };
