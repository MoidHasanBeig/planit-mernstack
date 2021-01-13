import projectFunctions from './projectFunctions';

const socketFunctions = (socket,setState) => {
  socket.on('connect', async () => {
    let userDetails = await fetch('/user').then(res => res.json());
    console.log(socket.id,userDetails);
    setState(userDetails);
    socket.emit('userinfo',userDetails._id);

    socket.on('notification', (msg) => {
      console.log(msg);
      projectFunctions.onNotification(msg,setState);
    });
  });
}

export default socketFunctions;
