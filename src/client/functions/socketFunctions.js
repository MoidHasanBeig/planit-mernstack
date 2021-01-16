import projectFunctions from './projectFunctions';

const socketFunctions = (socket,setState) => {
  //socket connected
  socket.on('connect', async () => {
    let userDetails = await fetch('/user').then(res => res.json());
    setState(userDetails);
    socket.emit('userinfo',userDetails._id);
  });

  //notifications
  socket.on('notification', (msg) => {
    projectFunctions.onNotification(msg,setState);
  });
}

export default socketFunctions;
